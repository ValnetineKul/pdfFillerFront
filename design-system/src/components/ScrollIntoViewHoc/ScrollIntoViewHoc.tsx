import type { FC, PropsWithChildren, SyntheticEvent } from 'react';

import { scrollIntoViewHocRecipe } from '#styled-system/recipes';

/**
 * ScrollIntoViewHoc — это компонент, который позволяет добавить функциональность прокрутки до элемента, на который был осуществлен клик
 *
 * ## Интеграция компонента
 *
 * Для того чтобы компонент работал:
 * 1) Требуется передать в ScrollIntoViewHoc  блок с возможностью прокрутки  в качестве children
 * 2) Добавить дата атрибут (data-scrollable) на итерируемых детей
 *
 * ## Отключение
 * Прокрутку можно отключить вручную, передав опциональный проп isActive = false
 *
 */

type ScrollIntoViewHocProps = PropsWithChildren & {
  isActive?: boolean;
};

export const ScrollIntoViewHoc: FC<ScrollIntoViewHocProps> = (props) => {
  const [variantProps, { children, isActive = true, ...otherProps }] =
    scrollIntoViewHocRecipe.splitVariantProps(props);
  const className = scrollIntoViewHocRecipe(variantProps);

  const handleClick = (event: SyntheticEvent<HTMLDivElement>): void => {
    if (!isActive) return;

    const targetElement = event.target as HTMLElement;
    const elementToScroll = targetElement.closest('[data-scrollable]');

    elementToScroll?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  };

  return (
    <div {...otherProps} className={className} onPointerUpCapture={handleClick}>
      {children}
    </div>
  );
};
