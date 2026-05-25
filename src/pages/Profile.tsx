import { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { requestNotificationPermission, sendLocalNotification } from '../utils/notifications';

export default function Profile() {
  const { user, logout, updateProfile, loading, error } = useAuth();
  const [form, setForm] = useState({ name: '', role: '', bio: '', avatar: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, role: user.role, bio: user.bio, avatar: user.avatar });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateProfile(form);
      setMessage('Profile saved successfully.');
    } catch {
      setMessage('Failed to save profile.');
    }
  };

  const handleGrantNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      sendLocalNotification('Fl3xPrivateSecurity', {
        body: 'Push notifications are enabled. Stay connected with your team.',
        icon: '/favicon.svg'
      });
      setMessage('Notifications enabled for browser alerts.');
    } else {
      setMessage('Notification permission denied or unsupported.');
    }
  };

  return (
    <section className="glass-card form-panel profile-panel">
      <div className="profile-header">
        <div className="avatar-large" style={{ backgroundImage: `url(${form.avatar})` }} />
        <div>
          <p className="eyebrow">Account profile</p>
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="profile-form">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" value={form.name} onChange={(event) => handleChange('name', event.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <input id="role" value={form.role} onChange={(event) => handleChange('role', event.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="avatar">Avatar URL</label>
          <input id="avatar" value={form.avatar} onChange={(event) => handleChange('avatar', event.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" rows={4} value={form.bio} onChange={(event) => handleChange('bio', event.target.value)} />
        </div>

        <div className="profile-actions action-row">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save profile'}
          </button>
          <button type="button" className="link-button" onClick={handleGrantNotifications}>
            Enable browser alerts
          </button>
        </div>
      </form>

      {message && <div className="form-note">{message}</div>}
      {error && <div className="form-error">{error}</div>}

      <div className="profile-details">
        <div>
          <h3>Professional summary</h3>
          <p>{form.bio}</p>
        </div>
        <div>
          <h3>Backend integration</h3>
          <p>Authentication is wired for backend APIs and stores a bearer token for secure API calls.</p>
        </div>
      </div>

      <div className="form-field profile-actions">
        <button type="button" onClick={logout}>
          Sign out
        </button>
      </div>
    </section>
  );
}
