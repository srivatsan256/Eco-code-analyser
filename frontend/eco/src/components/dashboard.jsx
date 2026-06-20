import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await api.getDashboard();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Loading dashboard...</div>;
  if (error) return <div style={{ color: '#f87171', padding: '40px' }}>{error}</div>;

  // Determine efficiency rating based on average green score
  const getEfficiencyRating = (score) => {
    if (score >= 85) return 'A+';
    if (score >= 75) return 'A';
    if (score >= 60) return 'B';
    if (score >= 45) return 'C';
    return 'D';
  };

  const downloadReports = () => {
    if (!stats || !stats.recent_reports) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(stats.recent_reports, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'sustainability_reports.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Welcome Back</h1>
          <p className="dashboard-subtitle" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Track your sustainability performance.</p>
        </div>
      </header>

      {/* Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card">
          <h3>Total Analyses</h3>
          <p className="stat-value">{stats.total_analyses}</p>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Number of reports generated</span>
        </div>
        <div className="stat-card">
          <h3>Average Green Score</h3>
          <p className="stat-value text-green">{stats.average_green_score}</p>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Average sustainability score</span>
        </div>
        <div className="stat-card">
          <h3>Best Green Score</h3>
          <p className="stat-value text-green">{stats.best_score}</p>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Highest sustainability score achieved</span>
        </div>
        <div className="stat-card">
          <h3>Energy Efficiency Rating</h3>
          <p className="stat-value text-green" style={{ color: '#86efac' }}>{getEfficiencyRating(stats.average_green_score)}</p>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Overall coding efficiency level</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {/* Recent Reports */}
        <div className="recent-activity">
          <h2>Recent Reports</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>View your latest sustainability analyses and recommendations.</p>
          <div className="activity-list">
            {stats.recent_reports.length === 0 ? (
              <div style={{ padding: '20px', color: 'var(--text-muted)' }}>No analyses yet. Start one!</div>
            ) : (
              stats.recent_reports.map((report) => (
                <div key={report.id} className="activity-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="activity-info">
                    <Link to={`/history/${report.id}`} className="activity-title" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
                      {report.language} Code Analysis
                    </Link>
                    <span className="activity-date" style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {new Date(report.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="activity-status">
                    <span className={`badge ${report.green_score > 70 ? 'badge-success' : ''}`} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: report.green_score > 70 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: report.green_score > 70 ? '#22c55e' : '#eab308' }}>
                      Score: {report.green_score}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '500' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/analysis/new" className="btn-cta" style={{ textAlign: 'center', display: 'block', textDecoration: 'none', padding: '12px', borderRadius: '8px' }}>
              New Analysis
            </Link>
            <Link to="/history" className="btn-secondary" style={{ textAlign: 'center', display: 'block', textDecoration: 'none', padding: '12px', borderRadius: '8px' }}>
              View History
            </Link>
            <button onClick={downloadReports} className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
              Download Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

