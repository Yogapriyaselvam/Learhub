export default function AdminReports() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Reports</h1>
        <p>View analytics and downloadable reports.</p>
      </div>

      <div className="feature-box">
        <div className="report-card">Monthly Revenue Report</div>
        <div className="report-card">Student Growth Report</div>
        <div className="report-card">Course Performance Report</div>
      </div>
    </div>
  );
}