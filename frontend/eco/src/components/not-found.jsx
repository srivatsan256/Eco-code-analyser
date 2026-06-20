
import { Link } from 'react-router-dom';
import '../styles/not-found.css';

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-cta">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
