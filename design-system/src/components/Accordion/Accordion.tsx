import type { ReactElement } from 'react';
import type { DisclosureGroupProps } from 'react-aria-components';
import { DisclosureGroup as AriaDisclosureGroup } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { AccordionRecipeVariantProps } from '#styled-system/recipes';
import { accordionRecipe } from '#styled-system/recipes';

import { AccordionContext } from './base/AccordionItem';

export type AccordionMainProps = AccordionRecipeVariantProps &
  DisclosureGroupProps &
  DataAttributes;

/**
 * Компонент аккордеон представляет собой вертикально расположенный набор интерактивных заголовков, каждый из которых раскрывает связанную с ним секцию содержимого. *
 *
 ** ## Особенности
 *
 * - **Доступность**: Компонент аккордеон совместимы с вспомогательными технологиями. Навигация с клавиатуры и правильное управление фокусом.
 * - **Адаптивность**: Компонент аккордеон адаптируются к различным размерам экрана и устройствам.
 */
export function Accordion(props: AccordionMainProps): ReactElement {
  const [variantProps, otherProps] = accordionRecipe.splitVariantProps(props);
  const classNames = accordionRecipe(variantProps);

  return (
    <AccordionContext.Provider value={variantProps}>
      <AriaDisclosureGroup {...otherProps} className={classNames.root}>
        {(renderProps) =>
          typeof otherProps.children === 'function'
            ? otherProps.children(renderProps)
            : otherProps.children
        }
      </AriaDisclosureGroup>
    </AccordionContext.Provider>
  );
}
