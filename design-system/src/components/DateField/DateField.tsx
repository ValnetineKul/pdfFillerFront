import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import type { DateValue } from 'react-aria-components';
import {
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  FieldError,
  Group,
  Label,
  Popover as AriaPopover,
  Text,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { datePickerRecipe } from '#styled-system/recipes';

import { Asterisk } from '../Asterisk';
import { Calendar } from '../Calendar';
import { TooltipButton } from '../TooltipButton';
import { DateFieldClearButton } from './DateFieldClearButton';
import type { DateFieldProps } from './types';

/**
 * DateField - Поле даты позволяет пользователям вводить и редактировать
 * значения даты и времени с помощью клавиатуры. Каждая часть
 * значения даты отображается в индивидуально редактируемом сегменте.
 *
 * ## Особенности
 *
 * Поле даты можно создать с помощью `<input type="date">`, но это очень ограничено по функциональности, не имеет возможностей интернационализации, непоследовательно работает между браузерами и сложно стилизуется. DateField помогает создать доступные и интернациональные поля даты и времени, которые можно стилизовать по мере необходимости.
 *
 * - **Даты и время** — Поддержка дат и времени с настраиваемой степенью детализации.
 * - **Интернациональность** — Поддержка 13 календарных систем, используемых по всему миру, включая григорианский, буддийский, исламский, персидский и другие. Доступны специфические для локали форматы, числовые системы, циклы часов и поддержка справа налево.
 * - **Учет часовых поясов** — Даты и время могут дополнительно включать часовой пояс. Все изменения следуют правилам часовых поясов, таким как переход на летнее/зимнее время.
 * - **Доступность** — Каждый элемент даты и времени отображается как индивидуально фокусируемый и редактируемый сегмент, что позволяет пользователям легко редактировать даты с помощью клавиатуры в любом формате даты и локали.
 * - **Удобство для сенсорных экранов** — Сегменты даты можно редактировать с помощью простого в использовании числового ключа, и все взаимодействия доступны с помощью экранных читалок.
 * - **Валидация** — Интеграция с HTML-формами, поддержка обязательных, минимальных и максимальных значений, настраиваемые функции валидации, валидация в реальном времени и ошибки валидации на стороне сервера.
 * - **Настраиваемость** — Как и во всех компонентах React Aria, структура DOM и стили всех элементов могут быть полностью настроены.
 *
 * ## Анатомия
 *
 * DateField состоит из метки и группы сегментов, представляющих каждую единицу даты и времени (например, годы, месяцы, дни и т. д.). Каждый сегмент является индивидуально доступным и редактируемым пользователем, с помощью ввода с клавиатуры или с использованием стрелок для увеличения и уменьшения значения. Этот подход позволяет корректно форматировать и парсить значения независимо от локали или формата даты, а также предлагает легкий и безошибочный способ редактирования дат с помощью клавиатуры.
 *
 * DateField также поддерживает необязательные элементы описания и сообщения об ошибках, которые могут использоваться для предоставления дополнительного контекста о поле и любых сообщениях о валидации. Эти элементы связаны с полем ввода через атрибут `aria-describedby`.
 *
 * ## Дополнительная информация
 *
 * Прочитайте нашу статью в [блоге](https://react-spectrum.adobe.com/blog/date-and-time-pickers-for-all.html), чтобы узнать больше о возможностях интернационализации, доступности и пользовательского опыта, реализованных в DateField.
 * [Подробнее о DateField](https://react-spectrum.adobe.com/react-aria/DateField.html#datefield)
 */
export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  defaultValue,
  isRequired,
  calendar,
  hideClearButton,
  necessityIndicator,
  customAsterisk,
  showCalendarButton = true,
  calendarButtonProps,
  ...props
}: DateFieldProps<T>): ReactElement {
  const classes = datePickerRecipe();
  const triggerRef = useRef(null);

  return (
    <AriaDatePicker
      {...props}
      className={classes.root}
      defaultValue={defaultValue}
    >
      {({
        isInvalid,
        isOpen,
        isDisabled,
        state: {
          realtimeValidation: { validationErrors },
        },
      }) => (
        <>
          {label && (
            <Label className={classes.label}>
              {label}
              {isRequired && necessityIndicator && (
                <Asterisk>{customAsterisk}</Asterisk>
              )}
            </Label>
          )}
          <Group className={classes.wrapper} isInvalid={isInvalid}>
            <DateInput className={classes.dateInput}>
              {(segment) => (
                <DateSegment segment={segment} className={classes.input} />
              )}
            </DateInput>
            {!hideClearButton && !isDisabled && <DateFieldClearButton />}
            {showCalendarButton && (
              <span ref={triggerRef} className={classes.trigger}>
                <TooltipButton isInvalid={isInvalid} {...calendarButtonProps}>
                  <Icon
                    className={css({ iconSize: 'sm' })}
                    name="time/calendar"
                  />
                </TooltipButton>
              </span>
            )}
          </Group>
          {description && (
            <Text slot="description" className={classes.description}>
              {description}
            </Text>
          )}
          {(errorMessage ?? Boolean(validationErrors.length)) && (
            <FieldError className={classes.errorMessage}>
              {errorMessage ?? validationErrors.join(',')}
            </FieldError>
          )}
          {isOpen && (
            <AriaPopover
              triggerRef={triggerRef}
              placement="bottom end"
              className={cx(
                classes.popover,
                scrollable({
                  direction: 'vertical',
                  width: 'auto',
                }),
              )}
            >
              <Calendar calendar={calendar} />
            </AriaPopover>
          )}
        </>
      )}
    </AriaDatePicker>
  );
}
