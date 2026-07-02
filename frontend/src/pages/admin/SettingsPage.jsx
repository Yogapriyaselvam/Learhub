import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'LearnHub Academy',
    supportEmail: 'adminlms20266@gmail.com',
    passingScore: 70,
    allowSelfEnrollment: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_settings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fieldStyle = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' };
  const labelStyle = { fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6, display: 'block' };

  return (
    <div style={{ maxWidth: 620 }}>
      <h1 style={{ marginBottom: 30 }}>Platform Settings</h1>

      <div style={{ background: '#fff', padding: '24px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Site Name</label>
          <input style={fieldStyle} value={settings.siteName} onChange={(e) => handleChange('siteName', e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Support Email</label>
          <input style={fieldStyle} value={settings.supportEmail} onChange={(e) => handleChange('supportEmail', e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Exam Passing Score (%)</label>
          <input
            type="number" min={0} max={100} style={fieldStyle}
            value={settings.passingScore}
            onChange={(e) => handleChange('passingScore', Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox" id="selfEnroll"
            checked={settings.allowSelfEnrollment}
            onChange={(e) => handleChange('allowSelfEnrollment', e.target.checked)}
            style={{ width: 16, height: 16, accentColor: '#4f46e5' }}
          />
          <label htmlFor="selfEnroll" style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>Allow students to self-enroll in free courses</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <button
            onClick={handleSave}
            style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
          >
            Save Settings
          </button>
          {saved && <span style={{ fontSize: 13, color: '#059669', fontWeight: 700 }}>✓ Saved</span>}
        </div>
      </div>
    </div>
  );
}