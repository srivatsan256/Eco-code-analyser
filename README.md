# EcoCode Analyzer

**AI-Powered Green Software Engineering Platform using IBM Granite, Blockchain, and MongoDB**

An intelligent tool that analyzes source code for sustainability, energy efficiency, and carbon footprint — with blockchain-backed integrity verification.

---

## ✨ Features

- **AI Code Analysis** powered by IBM Granite 3.3 8B (local inference on M4)
- **Green Score & Sustainability Metrics** (Energy Impact, Carbon Footprint)
- **Actionable Optimization Suggestions**
- **Blockchain Integrity Verification** – Tamper-proof analysis records
- **Analysis History & Dashboard**
- **Secure Authentication** (JWT)
- **Multi-language Support**

---

## Problem Statement

Modern software development significantly contributes to carbon emissions through inefficient code running in data centers. Data centers consume 1–4% of global electricity, with nearly 99% of that energy eventually converted into waste heat. However, developers lack practical tools to measure and reduce the environmental impact of their code. Traditional analysis tools ignore sustainability metrics entirely.

---

## Proposed Solution

**EcoCode Analyzer** combines **Artificial Intelligence**, **Blockchain**, and **modern web technologies** to evaluate code sustainability in real time. It provides developers with Green Scores, energy impact ratings, carbon footprint estimates, and optimization recommendations while ensuring complete transparency through immutable blockchain records.

---

## Tech Stack

| Layer           | Technology |
|-----------------|----------|
| Frontend        | React.js + Vite + Tailwind CSS |
| Backend         | Django + Django REST Framework |
| Database        | MongoDB Atlas |
| AI Engine       | IBM Granite 3.3 8B (MLX + Transformers) |
| Blockchain      | Ethereum/Private Blockchain (hash storage) |
| Authentication  | JWT |

---

## Key Features

- Local AI inference (privacy-first)
- Green Score + Carbon Footprint estimation
- Blockchain-based tamper-proof analysis history
- Dashboard with performance trends
- Secure user authentication

---

## How It Works

1. User logs in and submits code
2. IBM Granite analyzes code for sustainability & quality
3. Blockchain stores immutable hash of the report
4. Results displayed with detailed insights and recommendations

---

## Setup & Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd eco-analyser

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py runserver --noreload

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
