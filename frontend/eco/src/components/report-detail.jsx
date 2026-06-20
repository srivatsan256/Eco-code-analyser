import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import '../styles/analysis.css';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await api.getReport(id);
        setReport(data);
      } catch (err) {
        setError(err.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    setDeleting(true);
    try {
      await api.deleteReport(id);
      navigate('/history');
    } catch (err) {
      alert(err.message || 'Failed to delete report');
      setDeleting(false);
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Loading report...</div>;
  if (error) return <div style={{ color: '#f87171', padding: '40px' }}>{error}</div>;
  if (!report) return <div style={{ color: 'white', padding: '40px' }}>Report not found.</div>;

  return (
    <div className="analysis-container" style={{ maxWidth: '1000px' }}>
      <div className="result-header">
        <div>
          <Link to="/history" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to History
          </Link>
          <h1>Analysis Report</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>Language: {report.language || 'Unknown'}</p>
        </div>
        <div>
          <button 
            onClick={handleDelete} 
            className="btn-secondary" 
            style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.5)', marginRight: '16px' }}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Report'}
          </button>
          <Link to="/analysis/new" className="btn-cta">New Scan</Link>
        </div>
      </div>

      <div className="score-card">
        <div className="score-value">{report.green_score}</div>
        <div className="score-label">Green Score</div>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>
          Quality Score: {report.quality_score} • Energy Impact: {report.energy_impact}
        </p>
      </div>

      <div className="analysis-card">
        <h2>Summary Report</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '16px', marginBottom: '32px' }}>
          {report.report}
        </p>

        {report.recommendations && report.recommendations.length > 0 && (
          <>
            <h2>Recommendations</h2>
            <div className="activity-list" style={{ marginTop: '20px', marginBottom: '32px' }}>
              {report.recommendations.map((rec, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-info">
                    <span className="activity-title">{typeof rec === 'string' ? rec : rec.title}</span>
                    {rec.description && <span className="activity-date">{rec.description}</span>}
                  </div>
                  {rec.impact && <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.2)' }}>{rec.impact}</span>}
                </div>
              ))}
            </div>
          </>
        )}

        <h2>Source Code Analyzed</h2>
        <pre style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '16px', 
          borderRadius: '8px', 
          overflowX: 'auto', 
          color: '#e2e8f0',
          marginTop: '16px'
        }}>
          <code>{report.source_code}</code>
        </pre>
      </div>
    </div>
  );
};

export default ReportDetail;
