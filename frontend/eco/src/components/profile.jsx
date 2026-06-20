
import '../styles/profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="dashboard-header">
        <h1>User Profile</h1>
      </header>

      <div className="profile-card">
        <div className="profile-header-info">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <div className="profile-details">
            <h2>Jane Doe</h2>
            <p>jane.doe@example.com</p>
            <span className="badge badge-success" style={{ marginTop: '8px', display: 'inline-block' }}>Pro Plan</span>
          </div>
        </div>

        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" defaultValue="Jane" />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" defaultValue="Doe" />
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" defaultValue="jane.doe@example.com" readOnly />
          </div>
          <button type="submit" className="btn-cta" style={{ marginTop: '16px' }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
