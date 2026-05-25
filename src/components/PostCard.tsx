import { Post } from '../types';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="post-card glass-card">
      <header>
        <img className="avatar" src={post.avatar} alt={`${post.author} avatar`} />
        <div>
          <h3>{post.author}</h3>
          <div className="meta">{post.time}</div>
        </div>
      </header>
      <div className="post-body">
        <p>{post.text}</p>
      </div>
      {post.media && (
        <div>
          {post.media.type === 'image' ? (
            <img src={post.media.src} alt="Post media" />
          ) : (
            <video src={post.media.src} controls muted playsInline />
          )}
        </div>
      )}
      <div className="post-actions">
        <span>❤️ {post.likes} Likes</span>
        <span>💬 {post.comments} Comments</span>
      </div>
    </article>
  );
}
