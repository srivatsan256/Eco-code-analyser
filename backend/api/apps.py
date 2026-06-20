import os
import sys
import json
import re
import time
import threading
import hashlib

# =========================================================
# GLOBAL REGISTRY + LOADING LOCK
# =========================================================
if not hasattr(sys, "_GLOBAL_GRANITE_REGISTRY"):
    sys._GLOBAL_GRANITE_REGISTRY = {
        "tokenizer": None,
        "model": None,
        "is_loading": False,
        "backend": None,
        "load_lock": threading.Lock()
    }

os.environ["HF_HOME"] = os.path.expanduser("~/.cache/huggingface")
CACHE_DIR = os.path.expanduser("~/.cache/huggingface")

MODEL_ID = "ibm-granite/granite-3.3-8b-instruct"
MLX_MODEL_ID = "mlx-community/granite-3.3-8b-instruct-8bit"

# =========================================================
# DEPENDENCIES
# =========================================================
try:
    import torch # type: ignore
    from transformers import AutoTokenizer, AutoModelForCausalLM # type: ignore
    TRANSFORMERS_AVAILABLE = True
except Exception:
    torch = None
    TRANSFORMERS_AVAILABLE = False

try:
    from airllm import AutoModel as AirLLMModel # type: ignore
    AIRLLM_AVAILABLE = True
except ImportError:
    AIRLLM_AVAILABLE = False

try:
    from mlx_lm import load, generate # type: ignore
    MLX_AVAILABLE = True
except ImportError:
    MLX_AVAILABLE = False
    print("[INFO] Install MLX: pip install mlx-lm")

def get_device():
    if torch is None:
        return "cpu"
    if torch.backends.mps.is_available():
        return "mps"
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"

DEVICE = get_device()

# =========================================================
# BACKGROUND + SINGLETON LOADER
# =========================================================
def is_model_downloaded():
    """Simple check to avoid repeated download attempts"""
    expected_path = os.path.expanduser("~/.cache/huggingface/hub/models--mlx-community--granite-3.3-8b-instruct-8bit")
    return os.path.exists(expected_path) and len(os.listdir(expected_path)) > 5

def load_model_in_background(preferred_backend="auto"):
    cache = sys._GLOBAL_GRANITE_REGISTRY
    with cache["load_lock"]:  # Prevent duplicate loading
        if cache["is_loading"] or cache["model"] is not None:
            return

        def _load():
            cache["is_loading"] = True
            try:
                if (preferred_backend in ("mlx", "auto")) and MLX_AVAILABLE and DEVICE == "mps":
                    print(f"[INFO] Loading {MLX_MODEL_ID} with MLX...")
                    if not is_model_downloaded():
                        print("[INFO] Downloading model (~8.7 GB). This may take a while on first run...")
                    
                    cache["model"], cache["tokenizer"] = load(MLX_MODEL_ID)
                    cache["backend"] = "mlx"
                    print(f"[INFO] ✅ MLX backend loaded successfully on M4")
                    return

                # ... (AirLLM and Transformers fallback code remains the same as previous version)
                elif preferred_backend == "airllm" and AIRLLM_AVAILABLE:
                    print("[INFO] Loading with AirLLM (low memory)...")
                    cache["model"] = AirLLMModel.from_pretrained(MODEL_ID, cache_dir=CACHE_DIR, device=DEVICE)
                    cache["tokenizer"] = cache["model"].tokenizer
                    cache["backend"] = "airllm"
                    return
                else:
                    if TRANSFORMERS_AVAILABLE:
                        print(f"[INFO] Loading with Transformers on {DEVICE}...")
                        cache["tokenizer"] = AutoTokenizer.from_pretrained(MODEL_ID, cache_dir=CACHE_DIR, trust_remote_code=True)
                        dtype = torch.bfloat16 if DEVICE == "mps" else torch.float16
                        cache["model"] = AutoModelForCausalLM.from_pretrained(
                            MODEL_ID, cache_dir=CACHE_DIR, trust_remote_code=True, torch_dtype=dtype
                        )
                        if DEVICE == "mps":
                            cache["model"] = cache["model"].to(DEVICE)
                        cache["backend"] = "transformers"
                        print(f"[INFO] ✅ Transformers backend ready")
                        return
            except Exception as e:
                print(f"[ERROR] Model loading failed: {e}")
            finally:
                cache["is_loading"] = False

        thread = threading.Thread(target=_load, daemon=True)
        thread.start()

# Auto-load once
load_model_in_background(preferred_backend="auto")

# (Keep the rest of the file: parse_llm_json and generate_sustainability_report unchanged from previous version)