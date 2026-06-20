import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import '../styles/analysis.css';

const NewAnalysis = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('Python');
  const [sourceCode, setSourceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sourceCode.trim()) {
      setError('Please enter some code to analyze.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const result = await api.analyze({ language, source_code: sourceCode });
      // The user wants to see the result. Let's redirect to result page with result state,
      // or directly to the created report page. Let's redirect to `/analysis/result` with the state
      // so it goes to Analysis Result Page, or `/history/${result.analysis_id}`.
      // Wait, there is a route path "/analysis/result" element={<AnalysisResult />} and also "/history/:id" element={<ReportDetail />}.
      // Let's redirect to "/analysis/result" with the result as state, since that represents the "Analysis Result Page" (Page 7).
      navigate(`/analysis/result`, { state: { result } });
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="processing-container">
        <div className="spinner"></div>
        <h2>Analyzing Codebase...</h2>
        <p>Our AI is evaluating your code for carbon efficiency using IBM Granite AI.</p>
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <header className="dashboard-header">
        <h1>Analyze Your Code</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Paste your source code and receive an AI-generated sustainability report.
        </p>
      </header>

      <div className="analysis-card" style={{ marginTop: '24px' }}>
        {error && <div className="error-message" style={{ color: '#f87171', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="analysis-form">
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Programming Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-input)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
          </div>

          <div className="input-group" style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Source Code</label>
            <textarea
              placeholder="Paste your code here..."
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              required
              rows={12}
              style={{ fontFamily: 'monospace', padding: '16px', width: '100%', borderRadius: '8px', background: 'var(--bg-input)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn-cta large" style={{ marginTop: '24px', width: '100%' }}>
            Analyze Sustainability
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAnalysis;

