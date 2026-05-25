import { useMemo, useState } from 'react';

export default function ShareAppButton() {
  const [status, setStatus] = useState('');
  const url = useMemo(() => window.location.href, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Invite link copied!');
    } catch {
      setStatus('Copy failed. Try again.');
    }
  };

  const shareLink = async () => {
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: 'Fl3xPrivateSecurity',
          text: 'Join my secure team network and start sharing updates.',
          url
        });
        setStatus('Shared successfully!');
      } catch {
        setStatus('Sharing was canceled or failed.');
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="share-panel">
      <div className="share-copy-card">
        <p>Invite your team with a secure access link.</p>
        <div className="share-actions">
          <button type="button" className="share-button" onClick={shareLink}>
            Share app
          </button>
          <button type="button" className="share-button secondary" onClick={copyLink}>
            Copy link
          </button>
        </div>
      </div>
      {status && <div className="share-status">{status}</div>}
    </div>
  );
}
