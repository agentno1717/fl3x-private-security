import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loading, error } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch {
      // error state is handled by auth context
    }
  };

  return (
    <section className="glass-card form-panel">
      <div>
        <p className="eyebrow">Welcome back</p>
        <h2>Log in to Fl3xPrivateSecurity</h2>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-field">
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  );
}
