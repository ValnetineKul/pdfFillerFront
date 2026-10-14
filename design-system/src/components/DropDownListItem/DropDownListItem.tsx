import { Icon } from '@front/icons';
import type { ReactElement, ReactNode } from 'react';
import type { ListBoxItemProps } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import {
  dropDownListItem,
  type DropDownListItemVariantProps,
} from '#styled-system/recipes';

export type DropDownListItemProps = ListBoxItemProps &
  DropDownListItemVariantProps & {
    beforeSlot?: ReactElement | ReactNode;
    afterSlot?: ReactElement | ReactNode;
    children?: ReactNode;
    showSelectedItemIndication?: boolean;
  } & DataAttributes;

/**
 * DropDownListItem - используется для представления отдельных опций в выпадающих списках.
 *
 * ## Особенности
 *
 * - Универсальность: Компонент имеет идентичное представление в нескольких элементах, таких как Select, Combobox, выпадающий список выбора локали и быстрое меню профиля в шапке проекта.
 *
 * - Стилизация: Поддерживает централизованное управление стилями, что обеспечивает единообразный внешний вид во всех местах использования.
 *
 * - Гибкость: Может использоваться как самодостаточный компонент или только его стили из рецепта.
 *
 * - Размеры: Доступны два варианта размеров — sm и md, соответствующие макетам. (default = 'md')
 *
 * ## Применение
 * DropDownListItem применяется как готовый компонент с передачей пропсов для поддержания состояний, а также использовать стили из рецепта и поддерживать состояния по средствам дата аттрибутов.
 * Компонент поддерживает управление фокусом и навигацию с клавиатуры для удобства взаимодействия пользователей.
 *
 * ## Анатомия
 *
 * Компонент состоит из:
 *
 * - Контейнера, определяющего размеры и стилистику элемента и стили статуса.
 *
 * - Текст и содержимое, представляющее саму опцию.
 *
 * - Дополнительных элементов, таких как иконки или индикаторы состояния, если это предусмотрено дизайном.
 *
 *
 */

export function DropDownListItem(props: DropDownListItemProps): ReactElement {
  const [variantProps, otherProps] = dropDownListItem.splitVariantProps(props);
  const classes = dropDownListItem(variantProps);
  const { afterSlot, beforeSlot, children, showSelectedItemIndication } =
    otherProps;
  return (
    <div {...pickDataAttributes(props)} className={classes.root}>
      {beforeSlot && (
        <div slot="beforeSlot" className={classes.beforeSlot}>
          {beforeSlot}
        </div>
      )}
      <div className={classes.optionContent}>{children}</div>
      {afterSlot && (
        <div slot="afterSlot" className={classes.afterSlot}>
          {afterSlot}
        </div>
      )}
      {props.isSelected && showSelectedItemIndication && (
        <Icon name="general/check" className={classes.selectedItemIndication} />
      )}
    </div>
  );
}
