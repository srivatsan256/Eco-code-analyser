import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/auth');
  };

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Overview' },
    { path: '/analysis/new', icon: '⚡', label: 'New Analysis' },
    { path: '/history', icon: '🕰️', label: 'History' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">EcoCode</Link>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
