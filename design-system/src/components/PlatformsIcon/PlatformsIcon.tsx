import type { ReactElement } from 'react';
import { Link as AriaLink, type LinkProps } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { PlatformsIconRecipeVariantProps } from '#styled-system/recipes';
import { platformsIconRecipe } from '#styled-system/recipes';

/**
 * PlatformsIcon — это элемент, предназначенный для отображения иконок социальных сетей в виде ссылки. Он позволяет пользователю переходить на другую
 * страницу или ресурс внутри веб-страницы или приложения.
 *
 * ## Особенности
 *
 * - **Стилизация**: Позволяет задавать размеры обертки и стили для разных состояний (например, наведения), что упрощает кастомизацию.
 *
 * - **Доступность**: Использует нативный элемент `<a>`, поддерживающий клавиши Пробел и Enter, что улучшает доступность для пользователей с ограниченными возможностями.
 *
 * - **Кросс-браузерность**: Обеспечивает согласованное взаимодействие с мышью, касанием и клавиатурой, гарантируя, что поведение будет одинаковым во всех браузерах и на всех устройствах.
 *
 * - **Гибкость**: Компонент поддерживает различные варианты стилей, позволяя легко интегрировать его в существующий дизайн вашего приложения.
 *
 * - **Обработка событий**: PlatformsIcon состоит из нажимаемой области, на которую пользователи могут нажимать или тапать, чтобы перейти на другую страницу или ресурс.
 * Кроме того, пользователи клавиатуры могут активировать ссылки, используя клавишу Enter.
 *
 */

export type PlatformsIconProps = Partial<LinkProps> &
  PlatformsIconRecipeVariantProps &
  DataAttributes;

export function PlatformsIcon(props: PlatformsIconProps): ReactElement {
  const [variantProps, otherProps] =
    platformsIconRecipe.splitVariantProps(props);
  const className = platformsIconRecipe(variantProps);

  return (
    <AriaLink {...otherProps} className={className}>
      {otherProps.children}
    </AriaLink>
  );
}
