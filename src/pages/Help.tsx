import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <section className="glass-card info-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Help</p>
          <h2>Need support? We’ve got you covered.</h2>
        </div>
        <div className="pill-badge">Support center</div>
      </div>
      <p>Find quick answers, access guidance for using the feed and chat, or reach out for help with account and mission setup.</p>

      <div className="support-grid">
        <div className="support-card">
          <h3>Login & account</h3>
          <p>If you experience login issues, use the email/password form or reset your details from the login page.</p>
        </div>
        <div className="support-card">
          <h3>Posting & chat</h3>
          <p>Use the Feed page to post updates, then switch to Chat for private team conversations.</p>
        </div>
        <div className="support-card">
          <h3>Mobile install</h3>
          <p>Add the app to your home screen for Android and iOS using the install prompt or browser menu.</p>
        </div>
      </div>

      <div className="page-actions">
        <Link className="button-primary" to="/login">Login for help</Link>
        <Link className="button-secondary" to="/donate">Support the app</Link>
      </div>
    </section>
  );
}
