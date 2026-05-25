import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import NotificationBell from './components/NotificationBell';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './contexts/AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-shell">Authenticating...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-group">
          <div className="brand-mark">FPS</div>
          <div>
            <div className="brand-logo">Fl3xPrivateSecurity</div>
            <div className="brand-tagline">Secure team network for modern operations.</div>
          </div>
        </div>

        <div className="header-actions">
          <ThemeToggle />
          {user && <div className="user-chip">Welcome back, {user.name.split(' ')[0]}</div>}
        </div>

        <nav className="top-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/feed" className={({ isActive }) => (isActive ? 'active' : '')}>
            Feed
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
            Chat
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                Profile
              </NavLink>
              <button className="nav-action-button" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sign Up
              </NavLink>
            </>
          )}
          {user && <NotificationBell />}
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
