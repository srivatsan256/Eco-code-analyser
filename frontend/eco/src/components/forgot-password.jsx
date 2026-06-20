
import { Link } from 'react-router-dom';
import '../styles/signup.css'; // Reuse auth aesthetic
import heat1 from '../assets/heat1.webp';

const ForgotPassword = () => {
  return (
    <div className="auth-page-wrapper">
      <div
        className="blurred-bg-underlay"
        style={{ backgroundImage: `url(${heat1})` }}
      />
      <div className="auth-card" style={{ maxWidth: '600px', minHeight: 'auto', padding: '40px' }}>
        <div className="form-wrapper" style={{ margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '16px' }}>Reset Password</h2>
          <p className="toggle-redirect" style={{ marginBottom: '32px' }}>
            Enter your email to receive a reset link.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); console.log('Reset link sent'); }}>
            <div className="input-group">
              <input type="email" placeholder="Email address" required />
            </div>
            <button type="submit" className="btn-submit" style={{ marginTop: '16px' }}>
              Send Reset Link
            </button>
          </form>
          <div style={{ marginTop: '32px' }}>
            <Link to="/auth" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
