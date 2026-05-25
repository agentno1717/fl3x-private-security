import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fl3x-welcome-shown';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = window.localStorage.getItem(STORAGE_KEY);
    if (!shown) {
      setVisible(true);
    }
  }, []);

  const closeModal = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Welcome mission briefing">
      <div className="welcome-modal glass-card">
        <div className="modal-header">
          <p className="eyebrow">Mission briefing</p>
          <h2>Welcome to Fl3xPrivateSecurity</h2>
        </div>
        <p>Get ready to coordinate your team with secure feeds, fast chat, and real-time alerts. Tap the quick ops controls and theme toggle to personalize your command center.</p>
        <div className="modal-actions">
          <button type="button" className="button-primary" onClick={closeModal}>
            Start mission
          </button>
          <button type="button" className="button-secondary" onClick={closeModal}>
            Dismiss briefing
          </button>
        </div>
      </div>
    </div>
  );
}
