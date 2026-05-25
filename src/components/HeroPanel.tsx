import { Link } from 'react-router-dom';

export default function HeroPanel() {
  return (
    <section className="glass-card hero-panel">
      <div className="hero-intro">
        <p className="eyebrow">Secure social network</p>
        <h1>Fl3xPrivateSecurity: your crew, your feed, your secure space.</h1>
        <p>Connect with team members, share action videos, and chat in a private modern social environment built for mobile and desktop.</p>
        <div className="hero-actions">
          <Link className="button-primary" to="/signup">Start Free</Link>
          <Link className="button-secondary" to="/feed">Explore Feed</Link>
        </div>
      </div>
      <div className="hero-preview">
        <div className="preview-card">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" alt="Cyber ops" />
          <div className="preview-text">
            <h3>Live updates</h3>
            <p>Upload patrol photos, share training videos, and keep your squad coordinated in one sleek app.</p>
          </div>
        </div>
        <div className="preview-card">
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls muted loop />
          <div className="preview-text">
            <h3>Secure chats</h3>
            <p>Fast messaging with a clean interface so teams can communicate clearly while on the move.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
