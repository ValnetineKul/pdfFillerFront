const SESSION_KEY = 'pdffiller.session';

export type Session = {
  id: string;
  login: string;
  token: string;
};

export function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Session;
    if (!parsed.token || !parsed.login) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
