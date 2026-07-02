export default function AdminSettings() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage admin profile and system preferences.</p>
      </div>

      <div className="feature-box">
        <button className="primary-btn">Edit Profile</button>
        <button className="primary-btn" style={{ marginLeft: 10 }}>Change Password</button>
      </div>
    </div>
  );
}