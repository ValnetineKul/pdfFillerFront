import type { ReactElement, ReactNode } from 'react';
import type { TooltipProps as AriaToolTipProps } from 'react-aria-components';
import { OverlayArrow, Tooltip as AriaTooltip } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { tooltipRecipe } from '#styled-system/recipes';

export interface TooltipProps
  extends Omit<AriaToolTipProps, 'children'>, DataAttributes {
  children: ReactNode;
  useArrow?: boolean;
  title?: string;
  description?: string;
}
/**
 * Tooltip отображает описание элемента при наведении курсора или фокусировке.
 * Атрибут HTML title можно использовать для создания подсказки, но он не поддерживает стилизацию.
 * TooltipTrigger и Tooltip помогают создать доступные и стилизуемые всплывающие подсказки.
 *
 * ## Особенности
 * - **Стилизация**: Включает состояния для анимаций появления и исчезновения, можно добавить стрелку.
 * - **Доступность**: Триггер автоматически связан с подсказкой через aria-describedby. Подсказки отображаются при фокусировке элемента.
 * - **Поведение при наведении**: Первая подсказка появляется с задержкой при наведении, последующие — без задержки, чтобы избежать мерцания. Эмуляция hover-событий на сенсорных устройствах игнорируется.
 * - **Позиционирование**: Подсказка позиционируется относительно триггера и автоматически подстраивается, чтобы не пересекаться с краями окна браузера.
 *
 * Ссылка: https://react-spectrum.adobe.com/react-aria/Tooltip.html#tooltip
 */
export function Tooltip(props: TooltipProps): ReactElement {
  const {
    children,
    title,
    description,
    useArrow = true,
    ...tooltipProps
  } = props;

  const classNames = tooltipRecipe();

  return (
    <AriaTooltip {...tooltipProps} className={classNames.root}>
      {useArrow && (
        <OverlayArrow className={classNames.arrow} slot="arrow">
          <svg width={10} height={10} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" fill="currentColor" />
          </svg>
        </OverlayArrow>
      )}
      {title && <div className={classNames.title}>{title}</div>}
      {description && (
        <div className={classNames.description}>{description}</div>
      )}
      <div className={classNames.content}>{children}</div>
    </AriaTooltip>
  );
}
