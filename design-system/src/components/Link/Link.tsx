import type { ReactElement } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { Link as AriaLink } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { ButtonRecipeVariantProps } from '#styled-system/recipes';
import { linkRecipe } from '#styled-system/recipes';

export type LinkProps = AriaLinkProps &
  Omit<ButtonRecipeVariantProps, 'variant'> &
  DataAttributes;

/**
 * Ссылка позволяет пользователю переходить на другую
 * страницу или ресурс внутри веб-страницы или приложения.
 *
 * Ссылка состоит из нажимаемой области, обычно содержащей текстовую метку или иконку, на которую пользователи могут нажимать или тапать, чтобы перейти на другую страницу или ресурс. Кроме того, пользователи клавиатуры могут активировать ссылки, используя клавишу Enter.
 * Если визуальная метка не предоставлена (например, только иконка или изображение), то необходимо передать проп aria-label или aria-labelledby, чтобы идентифицировать ссылку для вспомогательных технологий.
 *
 * Ссылка: https://react-spectrum.adobe.com/react-aria/Link.html
 */

export function Link(props: LinkProps): ReactElement {
  const { colorScheme, size, ...otherProps } = props;

  const classNames = linkRecipe({
    size,
    colorScheme,
  });

  return <AriaLink {...otherProps} className={classNames} />;
}
