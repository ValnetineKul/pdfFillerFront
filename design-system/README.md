# Design System

Дизайн-система UPlatform — 68+ React-компонентов с дизайн-токенами, мультитемностью и доступностью из коробки.

**PandaCSS** · **React Aria** · **TypeScript** · **Storybook**

---

## 📦 Установка

```bash
# Установить дизайн-систему
pnpm add @front/design-system

# Установить PandaCSS как dev-зависимость
pnpm add -D @pandacss/dev
```

Peer-зависимости: `react` ^19, `react-dom` ^19.

---

## 🚀 Быстрый старт

### 1. Настройте PostCSS

Создайте (или обновите) файл `postcss.config.cjs` в корне вашего проекта:

```js
// postcss.config.cjs
module.exports = {
  plugins: [require('@pandacss/dev/postcss')()],
};
```

### 2. Настройте PandaCSS

Создайте (или обновите) файл `panda.config.ts` в корне вашего проекта и подключите `defaultPreset` из дизайн-системы:

```ts
// panda.config.ts
import { defineConfig } from '@pandacss/dev';
import { defaultPreset } from '@front/design-system/preset';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [defaultPreset],
  outdir: 'styled-system',
});
```

> `@front/design-system/preset` — build-time entrypoint. Не реэкспортируйте preset из корня пакета: корневой entrypoint используется в SSR/runtime, а preset зависит от `@pandacss/dev` и должен загружаться только PandaCSS во время сборки.

### 3. Сгенерируйте styled-system

```bash
pnpm panda codegen
```

Эта команда создаст директорию `styled-system/` с токенами, рецептами и утилитами, определёнными в пресете дизайн-системы.

### 4. Используйте компоненты

```tsx
import { Button, TextField, Select } from '@front/design-system';

function App() {
  return (
    <div>
      <Button onPress={() => console.log('Clicked!')}>Нажми меня</Button>
      <TextField label="Имя" placeholder="Введите имя" />
    </div>
  );
}
```

---

## 🛠 Стек

- **[PandaCSS](https://panda-css.com/)** — атомарный CSS, дизайн-токены, рецепты
- **[React Aria](https://react-spectrum.adobe.com/react-aria/)** — доступные UI-компоненты от Adobe
- **[Storybook](https://storybook.js.org/)** — документация и демо
- **[tsdown](https://github.com/nicolo-ribaudo/tsdown)** + **[Vite](https://vitejs.dev/)** — сборка
- **[oxlint + oxfmt](https://oxc.rs/)** — линтинг и форматирование

---

## 💻 Разработка

```bash
pnpm install          # Установка зависимостей
pnpm panda:prepare    # Генерация styled-system (токены, рецепты)
pnpm dev              # Storybook → http://localhost:6006
```

### Сборка

```bash
pnpm build            # Полная сборка (JS + CSS)
pnpm build:lib        # Только JS/TS бандл
pnpm build:css        # Только CSS
```

### Качество кода

```bash
pnpm typecheck        # Проверка типов
pnpm lint             # Линтинг
pnpm fmt              # Форматирование
```

> При `git push` автоматически запускаются `typecheck`, `lint` и `fmt:check` через [Lefthook](https://github.com/evilmartians/lefthook).

---

## 🎨 Темы

5 встроенных тем: `defaultPreset` (базовая), `yellowLight`, `navyDark`, `tealDark`, `yellowDark`.

Каждая тема наследует базовый пресет и переопределяет нужные токены (цвета, тени, отступы).

---

## 📦 Публикация

Публикация пакета выполняется вручную в приватный GitLab Package Registry.

**Порядок действий:**

1. Создать `.npmrc` из шаблона:

```bash
cp .npmrc.example .npmrc
```

1. Вставить свой GitLab-токен (Personal Access Token с правами `api` или `write_package_registry`) в файл `.npmrc` после `_authToken=`
2. Убедиться, что зависимости установлены и проект собран:

```bash
pnpm install
pnpm run panda:prepare
pnpm run build
```

1. Поднять версию в `package.json` (см. правила версионирования ниже)
2. Опубликовать пакет:

```bash
pnpm publish --no-git-checks
```

> ⚠️ Файл `.npmrc` содержит приватный токен и **не должен** попадать в git (он уже в `.gitignore`).

### 📐 Версионирование (SemVer)

Проект следует [Semantic Versioning](https://semver.org/lang/ru/):

`MAJOR.MINOR.PATCH` (например `1.2.3`)

| Тип изменения                 | Когда поднимать                                                                                                                        | Примеры                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **PATCH** (`1.0.0` → `1.0.1`) | Баг-фиксы, исправления стилей, мелкие правки, которые не ломают API                                                                    | Исправлен цвет hover-состояния кнопки, поправлен padding в Modal                      |
| **MINOR** (`1.0.0` → `1.1.0`) | Новая функциональность, новые компоненты, новые варианты/пропсы у существующих компонентов — **обратно совместимые**                   | Добавлен компонент Stepper, добавлен проп `size="xl"` в Button, новая тема            |
| **MAJOR** (`1.0.0` → `2.0.0`) | Ломающие изменения (breaking changes) — удаление/переименование компонентов, изменение API, удаление пропсов, изменение дизайн-токенов | Переименован `TextField` → `Input`, удалён проп `variant`, изменена структура токенов |

**Правила:**

- Перед публикацией **всегда** поднимайте версию — npm registry не позволяет перезаписать уже опубликованную версию
- При сомнениях между PATCH и MINOR — выбирайте MINOR
- MAJOR-версии требуют обсуждения с командой и миграционного гайда

---

## 🔗 Ссылки

- **Storybook** — `pnpm dev` → [localhost:6006](http://localhost:6006)
- **Figma** — [Design System UPlatform](https://www.figma.com/design/M2aUMU5VEQEEYRyoEig9gE/%F0%9F%92%A5-Design-system-UPlatform)
