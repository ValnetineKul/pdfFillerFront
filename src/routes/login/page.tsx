import { Button, TextField } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router';
import { z } from 'zod';

import { loginWithPassword } from '@/api/billing';
import { getSession, saveSession } from '@/api/session';
import {
  cardClass,
  errorClass,
  formClass,
  linkClass,
  pageClass,
  shellClass,
  subtitleClass,
  titleClass,
} from '@/ui/styles';

const loginSchema = z.object({
  login: z.string().trim().min(1, { message: 'Укажите логин.' }),
  password: z.string().min(1, { message: 'Укажите пароль.' }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const session = getSession();
  const [formError, setFormError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onTouched',
  });

  if (session) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: LoginValues) => {
    setFormError('');

    try {
      const account = await loginWithPassword(values.login, values.password);
      saveSession({ id: account.id, login: account.login, token: 'cookie' });
      navigate('/');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Не удалось войти.');
    }
  };

  return (
    <main className={pageClass}>
      <div className={shellClass}>
        <header>
          <h1 className={titleClass}>Вход</h1>
          <p className={subtitleClass}>
            Войдите, чтобы заполнять визовые анкеты по фото паспорта и
            документам.
          </p>
        </header>
        <section className={cardClass}>
          <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  autoComplete="current-password"
                  validationBehavior="aria"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            {formError ? <p className={errorClass}>{formError}</p> : null}
            <Button type="submit" variant="solid" isPending={isSubmitting}>
              Войти
            </Button>
            <p className={subtitleClass}>
              Нет аккаунта?{' '}
              <Link className={linkClass} to="/registration">
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
