import type { ReactElement } from 'react';
import type {
  TagGroupProps as AriaTagGroupProps,
  TagListProps as AriaTagListProps,
} from 'react-aria-components';
import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import type { TagGroupRecipeVariantProps } from '#styled-system/recipes';
import { tagGroupRecipe } from '#styled-system/recipes';

import { ScrollIntoViewHoc } from '../ScrollIntoViewHoc';
import { TagContext } from './base/Tag';

export type TagGroupProps<T> = Omit<AriaTagGroupProps, 'children'> &
  Pick<AriaTagListProps<T>, 'items' | 'children' | 'renderEmptyState'> &
  TagGroupRecipeVariantProps & {
    isScrollable?: boolean;
  } & DataAttributes;

/**
 * ## TagGroup
 *
 * Группа тегов — это фокусируемый список меток, категорий, ключевых слов, фильтров или других элементов, поддерживающий навигацию с помощью клавиатуры, выбор и удаление.
 *
 * ### Особенности
 *
 * Статический список тегов можно создать с помощью HTML-элементов `<ul>` или `<ol>`, но он не поддерживает никаких пользовательских взаимодействий. HTML-списки предназначены для статического контента, а не для списков с богатыми взаимодействиями, такими как навигация с помощью клавиатуры, выбор элементов, удаление и т. д. TagGroup помогает создать доступные и интерактивные компоненты списка тегов, которые можно стилизовать по мере необходимости.
 *
 * - **Навигация с клавиатуры** — Теги можно навигировать с помощью стрелочных клавиш, а также клавиш page up/down, home/end и т. д.
 * - **Удаляемые** — Теги можно удалить из группы тегов, нажав кнопку удаления или клавишу backspace.
 * - **Выбор элементов** — Поддержка выбора одного или нескольких элементов, с возможностью отключения элементов и поддержкой поведения переключения и замены выбора.
 * - **Доступность** — Соответствует шаблону ARIA grid, с дополнительными объявлениями выбора через ARIA live region. Тщательно протестировано на многих устройствах и вспомогательных технологиях, чтобы гарантировать согласованность объявлений и поведения.
 * - **Стилизация** — Элементы включают встроенные состояния для стилизации, такие как наведение, нажатие, фокус, выбранный и отключенный.
 *
 * ### Анатомия
 *
 * Группа тегов состоит из метки и списка тегов. Каждый тег должен содержать визуальную метку и может дополнительно содержать кнопку удаления. Если визуальная метка не включена в группу тегов, то необходимо передать `aria-label` или `aria-labelledby`, чтобы идентифицировать его для вспомогательных технологий.
 *
 * TagGroup также поддерживает необязательные слоты для описания и сообщения об ошибке, которые можно использовать для предоставления дополнительного контекста о группе тегов и любых сообщений о валидации. Они связаны с группой тегов через атрибут `aria-describedby`.
 *
 * [Ссылка на документацию TagGroup](https://react-spectrum.adobe.com/react-aria/TagGroup.html#tag)
 */

export function TagGroup<T extends object>(
  props: TagGroupProps<T>,
): ReactElement {
  const [variantProps, { children, items, ...otherProps }] =
    tagGroupRecipe.splitVariantProps(props);
  const classNames = tagGroupRecipe(variantProps);
  const { isScrollable } = variantProps;

  return (
    <TagContext.Provider
      value={{ className: classNames.item, 'data-scrollable': true }}
    >
      <AriaTagGroup {...otherProps} className={classNames.group}>
        <ScrollIntoViewHoc isActive={!!isScrollable}>
          <AriaTagList
            items={items}
            className={
              isScrollable
                ? cx(
                    classNames.list,
                    scrollable({
                      direction: 'horizontal',
                      hideScrollbar: true,
                    }),
                  )
                : classNames.list
            }
          >
            {children}
          </AriaTagList>
        </ScrollIntoViewHoc>
      </AriaTagGroup>
    </TagContext.Provider>
  );
}
