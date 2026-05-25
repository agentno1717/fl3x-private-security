import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signup, loading, error } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/profile');
    } catch {
      // error state is handled by auth context
    }
  };

  return (
    <section className="glass-card form-panel">
      <div>
        <p className="eyebrow">Join the network</p>
        <h2>Create your Fl3xPrivateSecurity account</h2>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a secure password"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-field">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </div>
      </form>
    </section>
  );
}
