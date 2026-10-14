import { apiUrl } from './config';

export type BillingAccount = {
  id: string;
  login: string;
  credits: number;
  chatplacePayments: number;
};

export async function loginWithPassword(
  login: string,
  password: string,
): Promise<BillingAccount> {
  const response = await fetch(apiUrl('/api/v1/login'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  const payload = (await response.json().catch(() => null)) as
    | (BillingAccount & { message?: string })
    | null;
  if (!response.ok) {
    throw new Error(payload?.message ?? 'Не удалось войти.');
  }
  if (!payload?.id || !payload.login) {
    throw new Error('Не удалось войти.');
  }
  return payload;
}

export async function logoutBilling(): Promise<void> {
  await fetch(apiUrl('/api/v1/logout'), {
    method: 'POST',
    credentials: 'include',
  }).catch(() => undefined);
}

export async function consumeGeneration(): Promise<void> {
  const response = await fetch(apiUrl('/api/v1/documents/consume'), {
    method: 'POST',
    credentials: 'include',
  });
  const payload = (await response.json().catch(() => null)) as { message?: string } | null;
  if (response.status === 402) {
    throw new Error(
      payload?.message ?? 'Генерация недоступна. Оплатите следующую анкету в Instagram.',
    );
  }
  if (!response.ok) {
    throw new Error(payload?.message ?? 'Не удалось подтвердить оплату. Войдите ещё раз.');
  }
}
