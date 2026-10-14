# @front/icons

React-библиотека SVG-иконок через CSS mask с стабильными URL без lazy-загрузки.

## Что экспортирует пакет

```ts
import { Icon, IconContext, useIconContext, hasIcon, getIconUrl, iconPaths } from "@front/icons";
import type { IconName, IconProps, IconContextValue } from "@front/icons";
```

- `Icon` — основной компонент для рендера иконок.
- `IconContext` — контекст и провайдер общих настроек для всех `Icon` внутри дерева.
- `useIconContext()` — хук для чтения текущих значений контекста.
- `hasIcon(name)` — проверка существования иконки по имени.
- `getIconUrl(name)` — стабильный URL SVG для mask/CSS.
- `iconPaths` — реестр `IconName → относительный путь SVG`.

## Подключение у потребителя

```bash
pnpm add @front/icons
```

```ts
// vite.config.ts
import { frontIconsPlugin } from "@front/icons/vite";

export default defineConfig({
  plugins: [
    frontIconsPlugin(),
    // ...остальные плагины
  ],
});
```

Плагин сам:

- находит SVG в `node_modules/@front/icons/icons/`;
- в dev раздаёт их по `/@front-icons/...`;
- в prod копирует в `assets/icons-{hash}/...`.

CSS иконок подключается приложением явно. Для Vite/CSR entry:

```ts
import "@front/icons/style.css";
```

Для React Router SSR подключайте CSS через `links()`:

```ts
import iconStyles from "@front/icons/style.css?url";

export const links = () => [
  { rel: "preload", href: iconStyles, as: "style" },
  { rel: "stylesheet", href: iconStyles },
];
```

При установке через `file:`/`workspace:` пакет собирается автоматически (`prepare`).

### Дизайн-система и SSR

Если иконки используются **через другой npm-пакет** (дизайн-система, UI-kit), а не напрямую из приложения:

1. В пакете с компонентами `@front/icons` должен быть **peerDependency**, а не обычная dependency.
2. Сборка библиотеки (tsdown, rollup и т.п.) **не должна** бандлить `@front/icons` — в dist остаётся `import { Icon } from "@front/icons"`.
3. В **конечном приложении** обязательны `frontIconsPlugin()` и прямая зависимость `@front/icons`.

При **SSR** (Nuxt, Remix, custom Vite SSR) плагин сам добавляет `@front/icons` в `noExternal`, чтобы пакет проходил через Vite-сборку и получал production URL иконок вместо dev fallback `/@front-icons/...`.

В Vite 8+ плагин использует Environment API (`configEnvironment`), а для старых конфигураций сохраняет совместимость через `ssr.noExternal`.

```ts
// vite.config.ts конечного приложения
export default defineConfig({
  plugins: [frontIconsPlugin()],
});
```

## Использование

Имена иконок совпадают с путём SVG без расширения: `категория/имя-иконки`.  
Например `icons/arrows/arrow-block-down.svg` → `arrows/arrow-block-down`.

```tsx
import { Icon } from "@front/icons";

<Icon name="general/search-lg" size={24} color="blue" />;
<Icon name="arrows/arrow-left" size={20} />;
<Icon name="flags/ru" size={16} color="#d52b1e" />;
```

### Общие настройки через контекст

```tsx
import { Icon, IconContext } from "@front/icons";

<IconContext value={{ size: 20, color: "gray", mirrored: true }}>
  <Icon name="arrows/arrow-right" />
  <Icon name="general/search-lg" color="blue" /> {/* только color переопределён */}
</IconContext>;
```

Пропсы конкретного `Icon` переопределяют значения из контекста. `className` и `style` объединяются.

### Неизвестная иконка

```tsx
<Icon name={"unknown" as IconName} missing={<span>Иконка не найдена</span>} />
```

## Скрипты

- `pnpm build` — генерация манифеста и сборка библиотеки (`dist`, ESM + d.ts).
- `pnpm storybook` — запуск Storybook.
- `pnpm typecheck` — проверка TypeScript.
- `pnpm generate:icons` — генерация `src/paths.ts` и `icons/manifest.json`.

## Структура

```text
icons/
├── src/
│   ├── Icon.tsx            # Icon через CSS mask
│   ├── IconContext.tsx     # IconContext и useIconContext
│   ├── paths.ts            # сгенерированный реестр IconName
│   ├── types.ts            # IconProps
│   ├── index.ts            # публичные экспорты
│   └── vite-plugin/        # Vite-плагин для потребителей
├── icons/                  # SVG по группам + manifest.json
└── generate-icons/         # генератор paths и манифеста
```

## Контрибьютинг

### Добавление новых иконок

1. Добавьте SVG в нужную группу в `icons/` (например `icons/general/my-icon.svg`).
2. Запустите генерацию `pnpm generate:icons`.
3. Добавьте все изменённые и новые файлы в git.
4. Поднимите версию в `package.json` через `pnpm version patch|minor|major`.

Скрипт `pnpm generate:icons`:

- сканирует `icons/` рекурсивно;
- генерирует `src/paths.ts` и `icons/manifest.json`.

### Версионирование (SemVer)

- `patch` — добавление новых иконок и другие обратносовместимые изменения.
- `minor` — неломающие изменения в API или плагине.
- `major` — breaking changes в API, плагине или структуре пакета.
