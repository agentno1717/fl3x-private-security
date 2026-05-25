import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import AgentGallery from '../components/AgentGallery';

export default function Admin() {
  const { theme, toggleTheme, preset, setPreset } = useTheme();

  return (
    <div className="page-shell">
      <div className="glass-card">
        <h2>Admin — Theme Presets</h2>
        <p>Current mode: <strong>{theme}</strong>, preset: <strong>{preset}</strong></p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button className="button-primary" onClick={toggleTheme}>Toggle Light/Dark</button>
          <button className="button-secondary" onClick={() => setPreset('delta')}>Delta</button>
          <button className="button-secondary" onClick={() => setPreset('red')}>Red Team</button>
          <button className="button-secondary" onClick={() => setPreset('blue')}>Blue Team</button>
        </div>
      </div>

      <div style={{ height: 18 }} />

      <AgentGallery />
    </div>
  );
}
