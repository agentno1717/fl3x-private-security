import HeroPanel from '../components/HeroPanel';
import FeatureCard from '../components/FeatureCard';
import LivePulse from '../components/LivePulse';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
import QuickOpsPanel from '../components/QuickOpsPanel';
import WelcomeModal from '../components/WelcomeModal';
import AgentGallery from '../components/AgentGallery';

export default function Home() {
  return (
    <div className="dashboard-panel">
      <WelcomeModal />
      <HeroPanel />
      <PwaInstallPrompt />
      <QuickOpsPanel />
      <LivePulse />
      <AgentGallery />

      <section className="glass-card primary-panel info-grid">
        <div>
          <p className="eyebrow">Enterprise ready</p>
          <h2>Secure social operations for modern teams</h2>
          <p>Fl3xPrivateSecurity blends a sleek digital experience with secure team workflows. Post updates, share mission-critical media, and keep communication tight across every patrol.</p>
        </div>
        <div className="feature-grid">
          <FeatureCard title="Operational feed" description="Keep every team member aligned with mission updates, images, and video reports." />
          <FeatureCard title="Command chat" description="A secure chat channel built for rapid team coordination and status updates." />
          <FeatureCard title="Mobile first" description="Designed to feel polished on iPhone, Android, and desktop with responsive layout." />
        </div>
      </section>

      <section className="glass-card secondary-panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2>Built for trust, speed, and clarity</h2>
          </div>
        </div>
        <div className="info-panel">
          <p>Enjoy a premium interface with a professional dark theme, clear hierarchy, and fast interactions. This prototype is optimized for mission-oriented teams who need a clean, trustworthy social experience.</p>
          <p>The feed, chat, and media layout were created to help users get the signal quickly and keep attention on the most important team updates.</p>
        </div>
      </section>
    </div>
  );
}
