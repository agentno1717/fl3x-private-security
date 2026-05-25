import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!promptEvent) {
      return;
    }

    promptEvent.prompt();

    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setStatus('App install accepted. You can launch it from your home screen.');
    } else {
      setStatus('install dismissed. You can still install it anytime from the browser menu.');
    }

    setPromptEvent(null);
  };

  if (!promptEvent) {
    return null;
  }

  return (
    <section className="glass-card install-panel">
      <div>
        <p className="eyebrow">Progressive install</p>
        <h2>Install Fl3xPrivateSecurity as an app</h2>
        <p>Save a secure entry point for your team on mobile or desktop with one tap.</p>
      </div>
      <div className="install-actions">
        <button type="button" className="button-primary" onClick={installApp}>
          Install app
        </button>
        {status && <p className="install-status">{status}</p>}
      </div>
    </section>
  );
}
