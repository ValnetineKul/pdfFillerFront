import type { ReactElement } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { Link as AriaLink } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { ButtonRecipeVariantProps } from '#styled-system/recipes';
import { buttonRecipe } from '#styled-system/recipes';

export type ButtonLinkProps = AriaLinkProps &
  ButtonRecipeVariantProps &
  DataAttributes;

/**
 * ButtonLink позволяет пользователю перейти на другую страницу или ресурс
 * внутри веб-страницы или приложения.
 *
 * ButtonLink имеет стили идентичные компоненту Button.
 *
 *   Ссылка представляет собой нажимаемую область, которая обычно содержит текстовую метку или значок,
 * на которые пользователи могут нажать или коснуться, чтобы перейти на другую страницу или ресурс.
 * Кроме того, пользователи клавиатуры могут активировать ссылки с помощью клавиши Enter.
 * Если Label не предоставлен (например, ссылка состоит только из значка или изображения),
 * то необходимо передать проп aria-label или aria-labelledby, чтобы идентифицировать ссылку для технологий экранного доступа.
 *
 * Ссылка на документацию: https://react-spectrum.adobe.com/react-aria/Link.html
 */

export function ButtonLink(props: ButtonLinkProps): ReactElement {
  const [variantProps, otherProps] = buttonRecipe.splitVariantProps(props);
  const className = buttonRecipe(variantProps);

  return <AriaLink {...otherProps} className={className} />;
}
