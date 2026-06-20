
import '../styles/profile.css'; // Reuse profile card aesthetics

const Settings = () => {
  return (
    <div className="profile-container">
      <header className="dashboard-header">
        <h1>Account Settings</h1>
      </header>

      <div className="profile-card">
        <h2 style={{ fontSize: '20px', marginBottom: '24px', color: '#fff' }}>Preferences</h2>
        
        <div className="form-row" style={{ flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '4px' }}>Email Notifications</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Receive weekly reports on your codebase carbon footprint.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '4px' }}>Dark Mode</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Use dark theme across the application.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked disabled />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <h2 style={{ fontSize: '20px', marginTop: '40px', marginBottom: '24px', color: '#fff' }}>Danger Zone</h2>
        <div style={{ padding: '24px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', color: '#f87171', marginBottom: '8px' }}>Delete Account</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="btn-secondary" style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.5)' }}>
            Delete Account
          </button>
        </div>
      </div>
      
      {/* Simple toggle switch CSS inline for now */}
      <style>{`
        .toggle-switch { position: relative; display: inline-block; width: 50px; height: 26px; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--purple-accent); }
        input:checked + .slider:before { transform: translateX(24px); }
      `}</style>
    </div>
  );
};

export default Settings;
