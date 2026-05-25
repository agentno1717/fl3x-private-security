export default function Donate() {
  return (
    <section className="glass-card info-page donate-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Donate</p>
          <h2>Support the platform and future features</h2>
        </div>
        <div className="pill-badge">Mission support</div>
      </div>
      <p>Your support helps keep the experience polished and funding future enhancements like advanced chat, secure media, and pro team controls.</p>

      <div className="donate-callout">
        <h3>Share the vision</h3>
        <p>If you’d like to help grow the app, click below to sponsor the project or send feedback to improve the next release.</p>
      </div>
      <button
        type="button"
        className="button-primary"
        onClick={() => window.open('https://github.com/agentno1717/fl3x-private-security', '_blank')}
      >
        View project on GitHub
      </button>
    </section>
  );
}
