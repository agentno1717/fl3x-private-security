export default function LivePulse() {
  return (
    <section className="glass-card live-pulse">
      <div className="live-pulse-header">
        <div>
          <p className="eyebrow">Mission pulse</p>
          <h3>Realtime operational readiness</h3>
        </div>
        <span className="status-dot online">Online</span>
      </div>
      <div className="pulse-grid">
        <div className="pulse-metric">
          <span>98%</span>
          <p>Team availability</p>
        </div>
        <div className="pulse-metric">
          <span>14</span>
          <p>Active updates</p>
        </div>
        <div className="pulse-metric">
          <span>4</span>
          <p>Live chats</p>
        </div>
      </div>
    </section>
  );
}
