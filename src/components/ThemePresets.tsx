import { useTheme } from '../contexts/ThemeContext';

const presets = [
  { key: 'delta', label: 'Delta Force' },
  { key: 'blue', label: 'Blue Ops' },
  { key: 'red', label: 'Red Alert' }
] as const;

export default function ThemePresets() {
  const { preset, setPreset, theme } = useTheme();

  return (
    <section className="glass-card theme-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Theme gallery</p>
          <h2>Choose your color mood</h2>
        </div>
        <div className="pill-badge">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
      </div>
      <p>Select a preset theme to change the accent palette across the entire app instantly.</p>
      <div className="theme-options">
        {presets.map((option) => (
          <button
            key={option.key}
            className={`theme-option ${option.key} ${preset === option.key ? 'active' : ''}`}
            type="button"
            onClick={() => setPreset(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
