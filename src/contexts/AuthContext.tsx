import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fetchProfile, login as loginRequest, signup as signupRequest, updateProfile as updateProfileRequest } from '../api/auth';
import type { Notification, User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (changes: Partial<User>) => Promise<void>;
  logout: () => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  hasUnread: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_TOKEN_KEY = 'fl3xAuthToken';
const AUTH_USER_KEY = 'fl3xAuthUser';

const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New team update',
    description: 'A new post was shared in the operations channel.',
    time: '2m ago',
    seen: false
  },
  {
    id: 'notif-2',
    title: 'Security alert cleared',
    description: 'The alert from the west perimeter has been resolved.',
    time: '18m ago',
    seen: false
  },
  {
    id: 'notif-3',
    title: 'Message received',
    description: 'Alex sent a message in the mission briefing chat.',
    time: '45m ago',
    seen: true
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  useEffect(() => {
    if (!token || user) {
      return;
    }

    setLoading(true);
    fetchProfile(token)
      .then((profile) => {
        setUser(profile);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, [token, user]);

  const saveAuth = (tokenValue: string, profile: User) => {
    setToken(tokenValue);
    setUser(profile);
    localStorage.setItem(AUTH_TOKEN_KEY, tokenValue);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
  };

  const updateProfile = async (changes: Partial<User>) => {
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    setLoading(true);
    setError(null);

    try {
      const updated = await updateProfileRequest(token, changes);
      setUser(updated);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginRequest({ email, password });
      saveAuth(response.token, response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signupRequest({ name, email, password });
      saveAuth(response.token, response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const markAsRead = (id: string) => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, seen: true } : item))
    );
  };

  const markAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, seen: true })));
  };

  const hasUnread = useMemo(() => notifications.some((item) => !item.seen), [notifications]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        updateProfile,
        logout,
        notifications,
        markAsRead,
        markAllRead,
        hasUnread
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
