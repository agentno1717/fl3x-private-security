import { Link } from 'react-router-dom';

export default function Work() {
  return (
    <section className="glass-card info-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Work</p>
          <h2>Mission workflows for every team</h2>
        </div>
        <div className="pill-badge">Action ready</div>
      </div>
      <p>Use Fl3xPrivateSecurity for secure operations, real-time updates, mission briefs, and teamwork that stays protected across mobile and desktop.</p>

      <div className="feature-grid wide-grid">
        <div className="feature-card">
          <h3>Command center</h3>
          <p>Manage mission reports, task summaries, and briefings from one centralized feed.</p>
        </div>
        <div className="feature-card">
          <h3>Team coordination</h3>
          <p>Keep work discussions focused with chat, posts, and notification alerts.</p>
        </div>
        <div className="feature-card">
          <h3>Secure role access</h3>
          <p>Protect operations data while enabling the right people to stay informed.</p>
        </div>
      </div>

      <div className="page-actions">
        <Link className="button-primary" to="/signup">Create account</Link>
        <Link className="button-secondary" to="/feed">View feed</Link>
      </div>
    </section>
  );
}
