import { Button, OtpField, TextField } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router';
import { z } from 'zod';

import { getApiClient } from '@/api/client';
import { getSession, saveSession } from '@/api/session';
import {
  cardClass,
  errorClass,
  formClass,
  linkClass,
  noticeClass,
  pageClass,
  shellClass,
  subtitleClass,
  titleClass,
} from '@/ui/styles';

const registrationSchema = z.object({
  login: z.string().trim().min(1, { message: 'Укажите логин.' }),
  password: z.string().min(8, { message: 'Пароль не короче 8 символов.' }),
  confirmationCode: z
    .string()
    .regex(/^\d{6}$/, { message: 'Введите 6 цифр кода подтверждения.' }),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const navigate = useNavigate();
  const session = getSession();
  const [issuedCode, setIssuedCode] = useState('');
  const [issuedFor, setIssuedFor] = useState('');
  const [codeExpire, setCodeExpire] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [formError, setFormError] = useState('');
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    setError,
    watch,
    formState: { isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { login: '', password: '', confirmationCode: '' },
    mode: 'onTouched',
  });
  const login = watch('login');
  const secondsLeft = codeExpire
    ? Math.max(0, codeExpire - Math.floor(now / 1000))
    : 0;

  useEffect(() => {
    if (!codeExpire || secondsLeft === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [codeExpire, secondsLeft]);

  useEffect(() => {
    if (issuedFor && login.trim() !== issuedFor) {
      setIssuedCode('');
      setIssuedFor('');
      setCodeExpire(null);
      setValue('confirmationCode', '');
    }
  }, [issuedFor, login, setValue]);

  if (session) {
    return <Navigate to="/" replace />;
  }

  const onRequestCode = async () => {
    const loginIsValid = await trigger('login');
    if (!loginIsValid) {
      return;
    }

    setFormError('');
    setIsSendingCode(true);
    const loginValue = getValues('login');
    const result = await getApiClient().POST(
      '/api/v1/registration/request-code',
      {
        params: {
          header: {
            'Platform-Locale': 'ru',
          },
        },
        body: { login: loginValue },
      },
    );
    setIsSendingCode(false);

    if (result.error || !result.data) {
      setError('login', {
        message: result.error?.message ?? 'Не удалось отправить код.',
      });
      return;
    }

    setIssuedCode(result.data.code);
    setIssuedFor(loginValue);
    setCodeExpire(result.data.codeExpire);
    setNow(Date.now());
  };

  const onSubmit = async (values: RegistrationValues) => {
    setFormError('');

    if (!issuedCode || issuedFor !== values.login) {
      setError('confirmationCode', {
        message: 'Сначала запросите код подтверждения.',
      });
      return;
    }

    const result = await getApiClient().POST('/api/v1/registration', {
      params: {
        header: {
          'Platform-Locale': 'ru',
        },
      },
      body: values,
    });

    if (result.error || !result.data) {
      const message = result.error?.message ?? 'Не удалось зарегистрироваться.';
      if (message.toLowerCase().includes('код')) {
        setError('confirmationCode', { message });
        return;
      }
      if (message.toLowerCase().includes('логин')) {
        setError('login', { message });
        return;
      }
      if (message.toLowerCase().includes('парол')) {
        setError('password', { message });
        return;
      }
      setFormError(message);
      return;
    }

    saveSession(result.data);
    navigate('/');
  };

  const codeButtonLabel =
    secondsLeft > 0
      ? `Новый код через ${secondsLeft} с`
      : issuedCode
        ? 'Получить новый код'
        : 'Получить код';

  return (
    <main className={pageClass}>
      <div className={shellClass}>
        <header>
          <h1 className={titleClass}>Регистрация</h1>
          <p className={subtitleClass}>
            Создайте аккаунт, чтобы заполнять визовые анкеты по фото паспорта и
            документам.
          </p>
        </header>
        <section className={cardClass}>
          <form
            className={formClass}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              control={control}
              name="login"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  label="Логин"
                  isRequired
                  autoComplete="username"
                  validationBehavior="aria"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  label="Пароль"
                  type="password"
                  isRequired
                  autoComplete="new-password"
                  description="Не короче 8 символов."
                  validationBehavior="aria"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            <Button
              type="button"
              variant="outline"
              isPending={isSendingCode}
              isDisabled={secondsLeft > 0}
              onPress={onRequestCode}
            >
              {codeButtonLabel}
            </Button>
            {issuedCode ? (
              <p className={noticeClass}>
                Моковый код: {issuedCode}. Введите его, пока он действует.
              </p>
            ) : null}
            <Controller
              control={control}
              name="confirmationCode"
              render={({ field, fieldState: { invalid, error } }) => (
                <OtpField
                  label="Код подтверждения"
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  maxLength={6}
                  isRequired
                  inputMode="numeric"
                  validationBehavior="aria"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            {formError ? <p className={errorClass}>{formError}</p> : null}
            <Button type="submit" variant="solid" isPending={isSubmitting}>
              Зарегистрироваться
            </Button>
            <p className={subtitleClass}>
              Уже есть аккаунт?{' '}
              <Link className={linkClass} to="/login">
                Войти
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
