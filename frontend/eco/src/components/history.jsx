import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import '../styles/history.css';

const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setReports(data);
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await api.deleteReport(id);
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete report.');
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Loading history...</div>;
  if (error) return <div style={{ color: '#f87171', padding: '40px' }}>{error}</div>;

  return (
    <div className="history-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="dashboard-header" style={{ marginBottom: '24px' }}>
        <h1>Analysis History</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Review your previous sustainability reports.</p>
      </header>

      <div className="history-list" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
        <div className="history-header-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1.5fr', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', color: 'var(--text-muted)' }}>
          <span>Date</span>
          <span>Language</span>
          <span>Quality Score</span>
          <span>Green Score</span>
          <span>Energy Impact</span>
          <span style={{ textAlign: 'right' }}>Actions</span>
        </div>
        
        {reports.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No reports found.</div>
        ) : (
          reports.map(report => {
            // Note: Since energy impact is inside full_report which might not be fully fetched in history array,
            // we can display a default "Low" or check if it exists in report.energy_impact or full_report.
            const qualityScore = report.quality_score ?? 70;
            const greenScore = report.green_score ?? 65;
            const energyImpact = report.energy_impact || (greenScore >= 75 ? 'Low' : greenScore >= 60 ? 'Medium' : 'High');

            return (
              <div key={report.id} className="history-item" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1.5fr', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                <span className="history-text" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Unknown Date'}
                </span>
                <span className="history-repo" style={{ color: '#fff', fontWeight: '500' }}>{report.language}</span>
                <span className="history-score" style={{ color: '#b9adf0', fontWeight: '600' }}>{qualityScore}</span>
                <span className={`history-score ${greenScore >= 75 ? 'text-green' : 'text-warn'}`} style={{ fontWeight: '600', color: greenScore >= 75 ? '#22c55e' : '#eab308' }}>
                  {greenScore}
                </span>
                <span>
                  <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '12px', background: energyImpact === 'Low' ? 'rgba(34, 197, 94, 0.2)' : energyImpact === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: energyImpact === 'Low' ? '#22c55e' : energyImpact === 'Medium' ? '#eab308' : '#ef4444' }}>
                    {energyImpact}
                  </span>
                </span>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Link to={`/history/${report.id}`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', textDecoration: 'none' }}>
                    View Report
                  </Link>
                  <button onClick={() => handleDelete(report.id)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', borderRadius: '8px' }}>
                    Delete Report
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default History;

