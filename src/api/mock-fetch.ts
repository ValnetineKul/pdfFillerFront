import {
  loginAccount,
  registerAccount,
  requestConfirmationCode,
} from './accounts';
import { extractApplicantFields } from './extract-profile';

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function readBody(request: Request): Promise<Record<string, string>> {
  const text = await request.text();
  if (!text) {
    return {};
  }

  const parsed = JSON.parse(text) as Record<string, string>;
  return parsed;
}

function isAccountError(
  result: { status: number; message: string } | { id?: string; code?: string },
): result is { status: 400 | 401; message: string } {
  return 'status' in result && 'message' in result;
}

export const mockFetch: typeof fetch = async (input, init) => {
  const request = new Request(input, init);
  const url = new URL(request.url, 'http://localhost');
  await new Promise((resolve) => {
    setTimeout(resolve, 280);
  });

  if (
    request.method === 'POST' &&
    url.pathname === '/api/v1/registration/request-code'
  ) {
    const body = await readBody(request);
    const result = requestConfirmationCode(body.login ?? '');
    if (isAccountError(result)) {
      return json({ message: result.message }, result.status);
    }

    return json(result, 200);
  }

  if (request.method === 'POST' && url.pathname === '/api/v1/registration') {
    const body = await readBody(request);
    const result = registerAccount({
      login: body.login ?? '',
      password: body.password ?? '',
      confirmationCode: body.confirmationCode ?? '',
    });
    if (isAccountError(result)) {
      return json({ message: result.message }, result.status);
    }

    return json(
      {
        id: result.id,
        login: result.login,
        token: crypto.randomUUID(),
      },
      201,
    );
  }

  if (request.method === 'POST' && url.pathname === '/api/v1/login') {
    const body = await readBody(request);
    const result = loginAccount({
      login: body.login ?? '',
      password: body.password ?? '',
    });
    if (isAccountError(result)) {
      return json({ message: result.message }, result.status);
    }

    return json(
      {
        id: result.id,
        login: result.login,
        token: crypto.randomUUID(),
      },
      200,
    );
  }

  if (request.method === 'POST' && url.pathname === '/api/v1/documents/extract') {
    const body = await readBody(request);
    if (!body.country) {
      return json({ message: 'Укажите страну.' }, 400);
    }

    const extracted = extractApplicantFields({
      passportText: body.passportText ?? '',
      formText: body.formText ?? '',
      bookingText: body.bookingText ?? '',
      russianPassportText: body.russianPassportText ?? '',
      russianRegistrationText: body.russianRegistrationText ?? '',
    });

    return json(
      {
        country: body.country,
        fields: extracted.fields,
        agreement: extracted.agreement,
        warnings: extracted.warnings,
      },
      200,
    );
  }

  return json({ message: 'Не найдено' }, 404);
};
