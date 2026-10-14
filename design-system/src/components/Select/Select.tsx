import { Icon } from '@front/icons';
import type { ReactElement, ReactNode } from 'react';
import type {
  ButtonProps as AriaButtonProps,
  SelectProps as AriaSelectProps,
  SelectValueRenderProps,
  ValidationResult,
} from 'react-aria-components';
import {
  Button,
  FieldError,
  Label,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import {
  selectRecipe,
  type SelectRecipeVariantProps,
} from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { Flex } from '../Layout';

export interface SelectProps<T extends object>
  extends
    Omit<AriaSelectProps<T>, 'children'>,
    AsteriskFieldProps,
    DataAttributes {
  label?: string;
  labelHint?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  isNonModal?: boolean;
  children: ReactNode | ((item: T) => ReactNode);
  placement?: 'top' | 'bottom' | 'left' | 'right';
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
  triggerButtonProps?: AriaButtonProps & DataAttributes;
  renderValue?: (
    params: SelectValueRenderProps<T> & {
      defaultChildren: ReactNode;
    },
  ) => ReactNode;
}

/**
 *
 * Select отображает сворачиваемый список вариантов и позволяет пользователю выбрать один из них.
 * Элемент Select упрощает выбор из большого количества опций, обеспечивая компактный интерфейс.
 *
 * Пользователи могут взаимодействовать с элементом с помощью мыши, касания или клавиатуры.
 * Для навигации по элементам списка можно использовать клавиши со стрелками, а для выбора — клавишу Enter или пробел.
 *
 * ## Особенности
 * Гибкость – Поддержка контролируемого и неконтролируемого состояния, асинхронной загрузки, отключенных элементов, валидации, секций, сложных элементов и многого другого.
 *
 * Навигация с помощью клавиатуры – Select можно открыть и перемещаться по нему с помощью клавиш со стрелками, а также клавиш Page Up/Page Down, Home/End и т.д. Поддерживается автоматическая прокрутка и ввод текста как в списке, так и на кнопке.
 *
 * Доступность – Соответствует шаблону ARIA listbox, с поддержкой элементов и секций, а также слотами для элементов метки и описания внутри каждого элемента для улучшенного объявления с помощью экранных считывателей.
 *
 * Интеграция с HTML-формами – Включает визуально скрытый элемент <select>, чтобы обеспечить интеграцию с HTML-формами, автозаполнение и навигацию по формам на мобильных устройствах через программную клавиатуру.
 *
 * Валидация – Поддержка нативной валидации ограничений HTML с настраиваемым пользовательским интерфейсом, пользовательскими функциями валидации и ошибками валидации на стороне сервера.
 *
 * Стилизация – Элементы включают встроенные состояния для стилизации, такие как наведение, нажатие, фокус, выбранный и отключенный.
 *
 *  ## Анатомия
 * Select состоит из метки, кнопки, отображающей выбранное значение, и списка, который отображается в поповере. Пользователи могут щелкнуть, коснуться или использовать клавиатуру на кнопке, чтобы открыть поповер списка.
 *
 * Select также поддерживает необязательные элементы описания и сообщения об ошибках,
 * которые можно использовать для предоставления дополнительной информации о поле и любых
 * сообщениях валидации. Эти элементы связаны с вводом через атрибут aria-describedby.
 *
 * [Ссылка на документацию Select](https://react-spectrum.adobe.com/react-aria/Select.html#select)
 */

export function Select<T extends object>(
  props: SelectProps<T> & SelectRecipeVariantProps,
): ReactElement {
  const [variantProps, otherProps] = selectRecipe.splitVariantProps(props);
  const { triggerButtonProps, ...ariaSelectProps } = otherProps;
  const {
    children,
    label,
    labelHint,
    items,
    errorMessage,
    isRequired,
    description,
    isNonModal,
    necessityIndicator,
    customAsterisk,
    placement,
    rightSlot,
    leftSlot,
    renderValue,
  } = otherProps;

  const classes = selectRecipe(variantProps);

  return (
    <AriaSelect
      {...ariaSelectProps}
      isRequired={isRequired}
      className={classes.root}
    >
      {({ isOpen, isInvalid, isDisabled }) => (
        <>
          {label && (
            <Label className={classes.label}>
              {label}
              {isRequired && necessityIndicator && (
                <Asterisk>{customAsterisk}</Asterisk>
              )}
              <Flex alignItems="center" className={classes.labelHint}>
                {labelHint}
              </Flex>
            </Label>
          )}
          <Button
            className={classes.trigger}
            data-open={isOpen}
            data-invalid={isInvalid}
            {...triggerButtonProps}
          >
            {leftSlot}
            <SelectValue<T> className={classes.selectValue}>
              {(params) =>
                renderValue && params
                  ? renderValue?.(params)
                  : params?.defaultChildren
              }
            </SelectValue>
            {!isDisabled && (
              <span
                aria-hidden="true"
                data-open={isOpen}
                className={classes.arrow}
              >
                <Icon
                  name={isOpen ? 'arrows/chevron-up' : 'arrows/chevron-down'}
                  className={classes.arrowIcon}
                />
              </span>
            )}
            {rightSlot}
          </Button>
          {!errorMessage && description && (
            <Text slot="description" className={classes.textMessage}>
              {description}
            </Text>
          )}
          {errorMessage && (
            <FieldError className={classes.errorMessage}>
              {errorMessage}
            </FieldError>
          )}
          <Popover
            className={classes.dropdown}
            isNonModal={isNonModal}
            placement={placement}
          >
            <ListBox
              className={cx(
                classes.list,
                scrollable({
                  direction: 'vertical',
                }),
              )}
              items={items}
            >
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </AriaSelect>
  );
}
