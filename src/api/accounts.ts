const USERS_KEY = 'pdffiller.users';
const CODES_KEY = 'pdffiller.codes';
const CODE_TTL_SECONDS = 60;

type StoredUser = {
  id: string;
  login: string;
  password: string;
};

type StoredCode = {
  code: string;
  expiresAt: number;
};

export type AccountError = {
  status: 400 | 401;
  message: string;
};

function readUsers(): Array<StoredUser> {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Array<StoredUser>;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: Array<StoredUser>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCodes(): Record<string, StoredCode> {
  const raw = localStorage.getItem(CODES_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, StoredCode>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeCodes(codes: Record<string, StoredCode>): void {
  localStorage.setItem(CODES_KEY, JSON.stringify(codes));
}

function findUser(login: string): StoredUser | undefined {
  return readUsers().find((user) => user.login === login);
}

export function requestConfirmationCode(
  login: string,
): { code: string; codeExpire: number } | AccountError {
  const normalized = login.trim();
  if (!normalized) {
    return { status: 400, message: 'Укажите логин.' };
  }

  if (findUser(normalized)) {
    return { status: 400, message: 'Этот логин уже занят.' };
  }

  const codes = readCodes();
  const current = codes[normalized];
  const now = Math.floor(Date.now() / 1000);
  if (current && current.expiresAt > now) {
    return { code: current.code, codeExpire: current.expiresAt };
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = now + CODE_TTL_SECONDS;
  codes[normalized] = { code, expiresAt };
  writeCodes(codes);
  return { code, codeExpire: expiresAt };
}

export function registerAccount(input: {
  login: string;
  password: string;
  confirmationCode: string;
}): { id: string; login: string } | AccountError {
  const login = input.login.trim();
  const password = input.password;
  const confirmationCode = input.confirmationCode.trim();

  if (!login || password.length < 8) {
    return {
      status: 400,
      message: 'Укажите логин и пароль не короче 8 символов.',
    };
  }

  if (findUser(login)) {
    return { status: 400, message: 'Этот логин уже занят.' };
  }

  const codes = readCodes();
  const issued = codes[login];
  const now = Math.floor(Date.now() / 1000);

  if (!issued) {
    return { status: 400, message: 'Сначала запросите код подтверждения.' };
  }

  if (issued.expiresAt <= now) {
    delete codes[login];
    writeCodes(codes);
    return { status: 400, message: 'Код истёк. Запросите новый.' };
  }

  if (issued.code !== confirmationCode) {
    return { status: 400, message: 'Неверный код подтверждения.' };
  }

  const user = { id: crypto.randomUUID(), login, password };
  writeUsers([...readUsers(), user]);
  delete codes[login];
  writeCodes(codes);
  return { id: user.id, login: user.login };
}

export function loginAccount(input: {
  login: string;
  password: string;
}): { id: string; login: string } | AccountError {
  const login = input.login.trim();
  const password = input.password;

  if (!login || !password) {
    return { status: 400, message: 'Укажите логин и пароль.' };
  }

  const user = findUser(login);
  if (!user || user.password !== password) {
    return { status: 401, message: 'Неверный логин или пароль.' };
  }

  return { id: user.id, login: user.login };
}
