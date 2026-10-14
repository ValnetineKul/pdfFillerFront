import React, { type ReactElement, type ReactNode } from 'react';
import type {
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
} from 'react-aria-components';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import { dropDownListItem, menuRecipe } from '#styled-system/recipes';

export type MenuProps<T extends object> = AriaMenuProps<T> &
  React.RefAttributes<HTMLDivElement> & { className?: string } & DataAttributes;

export type MenuItemProps<T extends object> = AriaMenuItemProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    beforeSlot?: ReactElement | ReactNode;
    afterSlot?: ReactElement | ReactNode;
    children?: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  } & DataAttributes;

/**
 * Menu — это выпадающий список с действиями или опциями, которые пользователь может выбрать.
 * Menu предоставляет пользователю доступ к набору элементов управления без необходимости покидать текущую страницу.
 *
 * ## Анатомия
 *
 * **Триггер**: Элемент, который активирует отображение меню (например, кнопка или ссылка).
 *
 * **Пункты меню**: Список доступных действий или опций, каждая из которых может быть выбрана пользователем.
 *
 * ## Особенности
 *
 * **Навигация с клавиатуры**: Элементы меню можно перемещать с помощью клавиш со стрелками, а также Page Up/Down, Home/End. Поддерживаются Typeahead и отключенные элементы.
 *
 * **Выбор элемента**: Поддержка одинарного или множественного выбора для пунктов меню.
 *
 * **Взаимодействие**: Меню можно вызвать нажатием кнопки мыши, касанием или с помощью клавиатуры, при этом фокус автоматически перемещается на первый или последний элемент.
 *
 * **Доступность**: Следует ARIA-паттерну, автоматически связывая триггер и меню через `aria`. Включает поддержку меток, описаний и комбинаций клавиш для каждого элемента.
 *
 * **Стилизация**: Можно настроить внешний вид меню, добавить анимации открытия/закрытия, а также отобразить стрелку для указания на триггер.
 *
 * Menu идеально подходит для отображения списка опций, действий или других элементов управления, улучшая взаимодействие с интерфейсом.
 *
 * [Ссылка на документацию](https://react-spectrum.adobe.com/react-aria/Menu.html#menu)
 */

export function Menu<T extends object>(props: MenuProps<T>): ReactElement {
  const classNames = menuRecipe();
  return (
    <AriaMenu {...props} className={cx(classNames.root, props.className)} />
  );
}

export function MenuItem<T extends HTMLDivElement>({
  children,
  beforeSlot,
  afterSlot,
  size,
  className,
  ...props
}: MenuItemProps<T>): ReactElement {
  const classes = dropDownListItem({ size });

  return (
    <AriaMenuItem {...props} className={cx(classes.root, className)}>
      {beforeSlot && (
        <div slot="beforeSlot" className={classes.beforeSlot}>
          {beforeSlot}
        </div>
      )}
      <div className={classes.optionContent}>{children}</div>
      <div slot="afterSlot" className={classes.afterSlot}>
        {afterSlot}
      </div>
    </AriaMenuItem>
  );
}
