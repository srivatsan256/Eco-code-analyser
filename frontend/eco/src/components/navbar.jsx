import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="nav-logo">EcoCode</Link>

      {/* Centre Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/analysis/new">New Analysis</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Auth Actions */}
      <div className="nav-auth">
        {!isLoggedIn ? (
          <>
            <Link
              to="/auth"
              className="btn-login"
              state={{ mode: 'login' }}
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="btn-cta"
              state={{ mode: 'signup' }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="btn-login">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn-cta" style={{ background: 'var(--accent)', color: 'var(--bg-card)', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', fontWeight: '500' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

