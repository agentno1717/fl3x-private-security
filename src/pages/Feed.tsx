import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import QuickOpsPanel from '../components/QuickOpsPanel';
import ShareAppButton from '../components/ShareAppButton';
import { samplePosts } from '../data';
import { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';

export default function Feed() {
  const [feedText, setFeedText] = useState('');
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  const { hasUnread, notifications } = useAuth();

  const recentActivity = useMemo(
    () => posts.slice(0, 3).map((post) => post.author),
    [posts]
  );

  const onPost = () => {
    if (!feedText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: 'Fleet Commander',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      time: 'Just now',
      text: feedText.trim(),
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setFeedText('');
  };

  return (
    <div className="feed-panel">
      <section className="glass-card post-cta">
        <div className="section-title">
          <div>
            <p className="eyebrow">Feed</p>
            <h2>Broadcast updates to your crew</h2>
          </div>
          <div className="pill-badge">Live</div>
        </div>

        <textarea
          value={feedText}
          onChange={(event) => setFeedText(event.target.value)}
          placeholder="Share patrol notes, training highlights, or media updates..."
        />
        <button onClick={onPost}>Post Update</button>
      </section>

      <ShareAppButton />
      <QuickOpsPanel />

      {hasUnread && (
        <section className="glass-card alert-panel">
          <div>
            <p className="eyebrow">Operational alert</p>
            <h2>{notifications.filter((item) => !item.seen).length} unread notification(s)</h2>
            <p>Review your command feed from the notification bell or open the alerts page.</p>
          </div>
          <Link className="link-button" to="/notifications">
            View alerts
          </Link>
        </section>
      )}

      <section className="glass-card story-strip">
        <div className="story-pill">
          <strong>Secure</strong>
          <p>Encrypted group stories.</p>
        </div>
        <div className="story-pill">
          <strong>Command</strong>
          <p>Operations in one feed.</p>
        </div>
        <div className="story-pill">
          <strong>Alerts</strong>
          <p>Real-time status events.</p>
        </div>
      </section>

      <section className="glass-card secondary-panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Team pulse</h2>
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="metric-card">
            <span className="metric-value">{posts.length}</span>
            <p>Latest posts published</p>
          </div>
          <div className="metric-card">
            <span className="metric-value">{recentActivity.join(', ')}</span>
            <p>Active members in feed</p>
          </div>
          <div className="metric-card">
            <span className="metric-value">24/7</span>
            <p>Operations-ready network</p>
          </div>
        </div>
      </section>

      <div className="dashboard-panel">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
