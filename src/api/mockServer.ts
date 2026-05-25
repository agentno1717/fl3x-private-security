import type { User } from '../types';

const storedUsersKey = 'fl3xMockUsers';
const tokenMapKey = 'fl3xMockTokens';

function getStoredUsers(): User[] {
  const raw = localStorage.getItem(storedUsersKey);
  if (!raw) {
    const initial: User[] = [
      {
        id: 'user-1',
        name: 'Jordan Blake',
        email: 'jordan@fl3xsecurity.com',
        avatar: 'https://images.unsplash.com/photo-1542317854-0c6a9b5f3b85?auto=format&fit=crop&w=400&q=80',
        role: 'Operations Lead',
        bio: 'Building secure social workflows for front-line teams.'
      }
    ];
    localStorage.setItem(storedUsersKey, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw) as User[];
}

function saveStoredUsers(users: User[]) {
  localStorage.setItem(storedUsersKey, JSON.stringify(users));
}

function getTokens(): Record<string, string> {
  const raw = localStorage.getItem(tokenMapKey);
  return raw ? (JSON.parse(raw) as Record<string, string>) : {};
}

function saveTokens(map: Record<string, string>) {
  localStorage.setItem(tokenMapKey, JSON.stringify(map));
}

function createToken(email: string) {
  return btoa(`${email}:${Date.now()}`);
}

function parseJson(body: BodyInit | null | undefined) {
  if (!body) return {};
  try {
    return JSON.parse(body.toString());
  } catch {
    return {};
  }
}

function getAuthToken(init?: RequestInit) {
  const auth = init?.headers && (init.headers as Record<string, string>)['Authorization'];
  const match = auth?.match(/^Bearer\s+(.+)$/);
  return match?.[1] ?? null;
}

function buildResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function setupMockServer() {
  const originalFetch = window.fetch.bind(window);
  const users = getStoredUsers();
  const tokens = getTokens();

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    let url: string;
    if (typeof input === 'string') {
      url = input;
    } else if (input instanceof Request) {
      url = input.url;
    } else if (input instanceof URL) {
      url = input.toString();
    } else {
      url = String(input);
    }

    const parsed = new URL(url, window.location.origin);
    const { pathname } = parsed;
    const method = init?.method?.toUpperCase() ?? 'GET';

    if (!pathname.startsWith('/api/auth/')) {
      return originalFetch(input, init);
    }

    const body = parseJson(init?.body);

    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, password } = body as { email?: string; password?: string };
      if (!email || !password) {
        return buildResponse(400, { message: 'Email and password are required.' });
      }

      const stored = getStoredUsers();
      const user = stored.find((item) => item.email === email);
      if (!user) {
        return buildResponse(401, { message: 'Invalid email or password.' });
      }

      const token = createToken(email);
      const tokenMap = getTokens();
      tokenMap[token] = email;
      saveTokens(tokenMap);

      return buildResponse(200, { token, user });
    }

    if (pathname === '/api/auth/signup' && method === 'POST') {
      const { name, email, password } = body as { name?: string; email?: string; password?: string };
      if (!name || !email || !password) {
        return buildResponse(400, { message: 'Name, email and password are required.' });
      }

      const stored = getStoredUsers();
      if (stored.some((item) => item.email === email)) {
        return buildResponse(409, { message: 'Email already registered.' });
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80`,
        role: 'Security Operator',
        bio: 'Ready to secure the next mission.'
      };
      const updated = [...stored, newUser];
      saveStoredUsers(updated);

      const token = createToken(email);
      const tokenMap = getTokens();
      tokenMap[token] = email;
      saveTokens(tokenMap);

      return buildResponse(201, { token, user: newUser });
    }

    const token = getAuthToken(init);
    const tokenMap = getTokens();
    const email = token ? tokenMap[token] : null;
    const stored = getStoredUsers();
    const user = email ? stored.find((item) => item.email === email) : null;

    if (!token || !user) {
      return buildResponse(401, { message: 'Unauthorized' });
    }

    if (pathname === '/api/auth/me' && method === 'GET') {
      return buildResponse(200, { user });
    }

    if (pathname === '/api/auth/me' && method === 'PUT') {
      const updates = body as Partial<User>;
      const updatedUser = { ...user, ...updates };
      const nextUsers = stored.map((item) => (item.email === user.email ? updatedUser : item));
      saveStoredUsers(nextUsers);
      return buildResponse(200, { user: updatedUser });
    }

    return buildResponse(404, { message: 'Not found' });
  };
}
