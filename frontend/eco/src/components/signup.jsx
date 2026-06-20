import { useState, useEffect, useMemo } from 'react';
import '../styles/signup.css';
import heat from '../assets/heat.png';
import heat1 from '../assets/heat1.webp';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';

const AuthContainer = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const images = useMemo(() => [heat, heat1], []);

  useEffect(() => {
    // Set initial mode from navigation state if present
    if (location.state && location.state.mode) {
      setIsLogin(location.state.mode === 'login');
    }
  }, [location.state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Form States
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        const res = await api.login({ email: loginData.email, password: loginData.password });
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        navigate('/dashboard');
      } else {
        await api.register({
          username: signUpData.fullName,
          email: signUpData.email,
          password: signUpData.password
        });
        // Auto-login after register
        const res = await api.login({ email: signUpData.email, password: signUpData.password });
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="blurred-bg-underlay"
        style={{ backgroundImage: `url(${images[activeSlide]})` }}
      />

      <div className="auth-card">
        {/* Left Column: Hero/Carousel Image panel */}
        <div
          className="auth-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.4)), url(${images[activeSlide]})`
          }}
        >
          <div className="hero-header">
            <div className="logo">EcoCode</div>
            <Link to="/" className="btn-back">
              Back to website <span className="arrow">→</span>
            </Link>
          </div>

          <div className="hero-content">
            <h1>
              Write Smarter Code.
              <br />
              Build a Greener Future.
            </h1>

            <div className="carousel-indicators">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${activeSlide === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form interactive area */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              {isLogin ? 'Sign in to continue your sustainability journey.' : 'Join EcoCode Analyzer and start building greener software.'}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={signUpData.fullName}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={isLogin ? loginData.email : signUpData.email}
                  onChange={isLogin ? handleLoginChange : handleSignUpChange}
                  required
                />
              </div>

              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={isLogin ? loginData.password : signUpData.password}
                  onChange={isLogin ? handleLoginChange : handleSignUpChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>

              {!isLogin && (
                <div className="input-group password-group" style={{ marginTop: '16px' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              )}

              <div className="form-options-row">
                {isLogin ? (
                  <>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={loginData.rememberMe}
                        onChange={handleLoginChange}
                      />
                      <span className="custom-checkbox"></span>
                      Remember me
                    </label>
                    <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                  </>
                ) : (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signUpData.agreeTerms}
                      onChange={handleSignUpChange}
                      required
                    />
                    <span className="custom-checkbox"></span>
                    <span>I agree to the <Link to="/terms">Terms & Conditions</Link></span>
                  </label>
                )}
              </div>

              {error && <div className="error-message" style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <p className="toggle-redirect" style={{ marginTop: '24px', textAlign: 'center' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--purple-accent)', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                  setError('');
                }}
              >
                {isLogin ? 'Register Now' : 'Sign In'}
              </button>
            </p>

            <div className="divider">
              <span>Or {isLogin ? 'sign in' : 'register'} with</span>
            </div>

            <div className="social-login">
              <button type="button" className="btn-social">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="18" />
                Google
              </button>
              <button type="button" className="btn-social">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="16" style={{ filter: 'invert(1)' }} />
                Apple
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthContainer;