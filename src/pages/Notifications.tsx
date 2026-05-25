import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { requestNotificationPermission, sendLocalNotification } from '../utils/notifications';

export default function Notifications() {
  const { user, notifications, markAsRead, markAllRead } = useAuth();
  const [status, setStatus] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const requestAlerts = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      sendLocalNotification('Fl3xPrivateSecurity Alert', {
        body: 'New operational alert is now available.',
        icon: '/favicon.svg'
      });
      setStatus('Notifications enabled. You will receive browser alerts.');
    } else {
      setStatus('Notification permission was denied or unsupported.');
    }
  };

  return (
    <section className="glass-card form-panel notification-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Notifications</p>
          <h2>Team alerts and activity</h2>
        </div>
        <button className="link-button" type="button" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div className="notification-actions action-row">
        <button className="link-button" type="button" onClick={requestAlerts}>
          Enable push alerts
        </button>
        {status && <p className="notification-status">{status}</p>}
      </div>

      <div className="notification-list full-page">
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
    </section>
  );
}
