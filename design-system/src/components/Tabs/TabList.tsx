import { Icon } from '@front/icons';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import type { TabListProps as AriaTabListProps } from 'react-aria-components';
import { TabList as AriaTabList } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { splitDataAttributes } from '#shared/utils';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import type { TabsRecipeVariantProps } from '#styled-system/recipes';
import { tabsRecipe } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import { ScrollIntoViewHoc } from '../ScrollIntoViewHoc';
import { TabContext } from './base/Tab';
import { EPSILON, SCROLL_BUTTON_PROPS } from './constants';
import { getScrollButtonSize } from './utils';

export type TabListProps<T> = AriaTabListProps<T> &
  TabsRecipeVariantProps &
  DataAttributes;

/**
 * Tabs — это компонент, который организует контент в несколько секций и позволяет пользователям навигировать между ними.
 * Контент под набором вкладок должен быть связан и образовывать целостное единство.
 * Tabs ожидает, что дочерними элементами будут <TabList> и <TabPanels>, но могут быть добавлены дополнительные элементы для гибкости в размещении.
 *
 * ## Анатомия
 *
 * **TabList**: Содержит список вкладок, позволяющих пользователю переключаться между секциями.
 *
 * **TabPanels**: Содержит панели, отображающие соответствующий контент для выбранной вкладки.
 *
 * Каждый <Item> в <TabList> и <TabPanels> должен иметь уникальный ключ (`key`), соответствующий друг другу. Статические коллекции можно использовать, если известен полный список вкладок и их содержимого заранее. Динамические коллекции подходят для случаев, когда варианты поступают из внешних источников данных, таких как API.
 *
 * ## Особенности
 *
 * - **Гибкость**: Дополнительные элементы могут оборачивать <TabList> и <TabPanels> для настройки макета.
 *
 * - **Динамическое обновление**: Использует пропс `items` для передачи итерационного списка опций. Если объекты элементов содержат свойство `id`, оно будет использоваться автоматически, и ключ не требуется.
 *
 * - **Управление событиями**: Подробности о выборе можно найти в разделе События.
 *
 * Tabs идеально подходят для организации связанного контента и улучшения взаимодействия с пользователем.
 *
 * [Ссылка на документацию](https://react-spectrum.adobe.com/react-spectrum/Tabs.html#tabs)
 */

export function TabList<T extends object>(
  props: TabListProps<T>,
): ReactElement {
  const [variantProps, otherProps] = tabsRecipe.splitVariantProps(props);
  const [dataAttributes, tabListProps] = splitDataAttributes(otherProps);
  const tabsClasses = tabsRecipe(variantProps);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentOverflow, setContentOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isVisibleScrollButtons =
    isContentOverflow && variantProps.hasScrollButton;

  const isVisibleLeftButton = isVisibleScrollButtons && canScrollLeft;
  const isVisibleRightButton = isVisibleScrollButtons && canScrollRight;
  const scrollButtonsSize = getScrollButtonSize(
    variantProps.variant,
    variantProps.size,
  );

  const scrollButtonProps = variantProps.variant
    ? SCROLL_BUTTON_PROPS[variantProps.variant]
    : {};

  const listScrollClassName = scrollable({
    direction:
      variantProps.orientation === 'vertical' ? 'vertical' : 'horizontal',
    hideScrollbar: true,
  });

  const updateOverflowAndEdges = (): void => {
    const element = contentRef.current;
    if (!element) return;

    const overflow = element.scrollWidth - element.clientWidth > EPSILON;
    setContentOverflow(overflow);

    if (!overflow) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const maxLeft = element.scrollWidth - element.clientWidth;
    const left = element.scrollLeft;

    setCanScrollLeft(left > EPSILON);
    setCanScrollRight(left < maxLeft - EPSILON);
  };

  const makeScrollByViewport = (dir: 1 | -1): void => {
    const scrollableList = contentRef.current;
    if (!scrollableList) return;
    const delta = scrollableList.clientWidth * 0.5 * dir;
    scrollableList.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const handleScrollRight = (): void => {
    makeScrollByViewport(1);
  };

  const handleScrollLeft = (): void => {
    makeScrollByViewport(-1);
  };

  useEffect(() => {
    const element = contentRef.current;

    if (!element || !variantProps.hasScrollButton) return;

    updateOverflowAndEdges();

    element.addEventListener('scroll', updateOverflowAndEdges, {
      passive: true,
    });

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateOverflowAndEdges);
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', updateOverflowAndEdges);
    };
  }, [variantProps.hasScrollButton]);

  return (
    <TabContext.Provider
      value={{ className: tabsClasses.item, 'data-scrollable': true }}
    >
      <ScrollIntoViewHoc>
        <div className={tabsClasses.wrapper} {...dataAttributes}>
          {isVisibleLeftButton && (
            <div className={tabsClasses.leftButton}>
              <IconButton
                isDisabled={!canScrollLeft}
                size={scrollButtonsSize}
                onlyIcon
                onPress={handleScrollLeft}
                {...scrollButtonProps}
              >
                <Icon
                  className={tabsClasses.scrollChevronIcon}
                  name="arrows/chevron-left"
                />
              </IconButton>
            </div>
          )}
          <AriaTabList<T>
            ref={contentRef}
            {...tabListProps}
            className={cx(tabsClasses.list, listScrollClassName)}
          />

          {isVisibleRightButton && (
            <div className={tabsClasses.rightButton}>
              <IconButton
                isDisabled={!canScrollRight}
                size={scrollButtonsSize}
                onlyIcon
                onPress={handleScrollRight}
                {...scrollButtonProps}
              >
                <Icon
                  className={tabsClasses.scrollChevronIcon}
                  name="arrows/chevron-right"
                />
              </IconButton>
            </div>
          )}
        </div>
      </ScrollIntoViewHoc>
    </TabContext.Provider>
  );
}
