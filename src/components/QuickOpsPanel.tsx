import { useState } from 'react';
import { requestNotificationPermission, sendLocalNotification } from '../utils/notifications';
import { useAuth } from '../contexts/AuthContext';

const ops = [
  {
    id: 'status-check',
    label: 'Send status check',
    feedback: 'Status check dispatched to the squad.'
  },
  {
    id: 'green-light',
    label: 'Mark mission green',
    feedback: 'Mission status set to green.'
  },
  {
    id: 'alert-ping',
    label: 'Issue alert ping',
    feedback: 'Alert ping sent to command.'
  }
];

export default function QuickOpsPanel() {
  const { user } = useAuth();
  const [status, setStatus] = useState('Ready for the next operation.');
  const [lastAction, setLastAction] = useState('No action taken yet.');
  const commanderName = user?.name?.split(' ')[0] ?? 'Commander';

  const triggerAction = async (feedback: string) => {
    setStatus(`${feedback} Sending to your team...`);
    const permission = await requestNotificationPermission();

    if (permission === 'granted') {
      sendLocalNotification('Quick Ops', {
        body: `${feedback} ${commanderName} requested it.`,
        icon: '/favicon.svg'
      });
    }

    setLastAction(`${feedback} ${commanderName} is monitoring.`);
  };

  return (
    <section className="glass-card quick-ops-panel">
      <div>
        <p className="eyebrow">Quick ops</p>
        <h2>Fast mission controls</h2>
        <p>Dispatch a command, ping your crew, or mark the operation status without leaving the app.</p>
      </div>
      <div className="quick-ops-actions">
        {ops.map((item) => (
          <button
            key={item.id}
            type="button"
            className="quick-ops-button"
            onClick={() => triggerAction(item.feedback)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="quick-ops-status">{lastAction}</p>
    </section>
  );
}
