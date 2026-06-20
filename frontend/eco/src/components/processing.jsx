import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/analysis.css';

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/analysis/result');
    }, 3000); // Simulate 3 second processing time

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="processing-container">
      <div className="spinner"></div>
      <h2>Analyzing Codebase...</h2>
      <p>Our AI is evaluating your repository for carbon efficiency.</p>
    </div>
  );
};

export default Processing;
