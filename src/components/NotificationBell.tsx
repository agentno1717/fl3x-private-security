import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { requestNotificationPermission, sendLocalNotification } from '../utils/notifications';

export default function NotificationBell() {
  const { notifications, hasUnread, markAllRead, markAsRead } = useAuth();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      sendLocalNotification('Fl3xPrivateSecurity', {
        body: 'Push alerts are enabled. Stay in sync with your team.',
        icon: '/favicon.svg'
      });
      setStatus('Browser notification access granted.');
    } else {
      setStatus('Notifications are blocked or unsupported.');
    }
  };

  return (
    <div className="notification-shell">
      <button
        className={`notification-button ${open ? 'active' : ''}`}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open notifications"
      >
        <span className="bell-icon">🔔</span>
        {hasUnread && <span className="notification-badge">{notifications.filter((item) => !item.seen).length}</span>}
      </button>

      {open && (
        <div className="notification-popup glass-card">
          <div className="notification-head">
            <div>
              <h3>Notifications</h3>
              <p className="notification-summary">Latest alerts for your team</p>
            </div>
            <button className="link-button" type="button" onClick={markAllRead}>
              Mark all read
            </button>
          </div>

          <div className="notification-list">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                className={`notification-item ${notification.seen ? '' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.description}</p>
                </div>
                <span className="notification-time">{notification.time}</span>
              </button>
            ))}
          </div>

          <div className="notification-actions">
            <button className="link-button" type="button" onClick={handleEnableNotifications}>
              Enable browser alerts
            </button>
            {status && <p className="notification-status">{status}</p>}
          </div>

          <Link className="link-button view-all" to="/notifications" onClick={() => setOpen(false)}>
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
