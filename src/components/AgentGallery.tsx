import React from 'react';
import { samplePosts } from '../data';

export default function AgentGallery() {
  const images = samplePosts
    .map((p) => p.media?.type === 'image' ? p.media.src : null)
    .filter(Boolean) as string[];

  return (
    <section className="glass-card hero-preview agent-gallery">
      <div className="section-title">
        <h2>Agent Gallery</h2>
      </div>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <div key={i} className="agent-thumb">
            <img src={src} alt={`agent-${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
