import type { ReactElement, ReactNode } from 'react';
import type {
  RadioGroupProps as AriaRadioGroupProps,
  ValidationResult,
} from 'react-aria-components';
import {
  FieldError,
  Label,
  RadioGroup as AriaRadioGroup,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { RadioGroupRecipeVariantProps } from '#styled-system/recipes';
import { radioGroupRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { RadioVariantContext } from './Radio';

export type RadioGroupProps = Omit<AriaRadioGroupProps, 'children'> & {
  children?: ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  necessityIndicator?: boolean;
} & RadioGroupRecipeVariantProps &
  AsteriskFieldProps &
  DataAttributes;

/**
 *
 * # RadioGroup
 *
 * Группа радиокнопок (RadioGroup) позволяет пользователю выбрать единственный элемент из списка взаимно исключающих вариантов. Радиокнопки представляют собой элементы управления, которые позволяют пользователю делать выбор из ограниченного набора вариантов, где только один вариант может быть выбран одновременно.
 *
 * ## Использование
 *
 * Радиогруппы обычно используются для предоставления пользователю возможности выбрать один вариант из предустановленного списка. Например, это может быть выбор пола, цвета или типа продукта. Пользователь может кликнуть по радиокнопке или использовать клавиши стрелок для навигации между вариантами.
 *
 * ## Особенности
 *
 * Группы радиокнопок (RadioGroup) могут быть созданы в HTML с помощью элементов `<fieldset>` и `<input>`, однако их стилизация может быть затруднена. RadioGroup и Radio помогают создать доступные группы радиокнопок, которые можно стилизовать по мере необходимости.
 *
 * - **Доступность**: Группы радиокнопок доступны для вспомогательных технологий через ARIA и автоматически связываются с вложенной `<Label>`. Также поддерживаются слоты для текстов описания и сообщений об ошибках.
 *
 * - **Интеграция с HTML-формами**: Каждая радиокнопка использует скрытый элемент `<input>`, что позволяет интегрироваться с HTML-формами и поддерживать автозаполнение.
 *
 * - **Валидация**: Поддержка встроенной валидации HTML с настраиваемым интерфейсом, пользовательскими функциями валидации и ошибками валидации на стороне сервера.
 *
 * - **Кроссбраузерность**: Взаимодействия мыши, касания, клавиатуры и фокуса нормализованы для обеспечения консистентности между браузерами и устройствами.
 *
 * ## Анатомия
 *
 * Группа радиокнопок состоит из набора радиокнопок и метки. Каждая радиокнопка включает метку и визуальный индикатор выбора. В группе можно выбрать только одну радиокнопку за раз. Пользователи могут щелкнуть или коснуться радиокнопки, чтобы выбрать ее, или использовать клавишу Tab для навигации к группе, стрелочные клавиши для навигации внутри группы и клавишу Space для выбора варианта.
 *
 * RadioGroup также поддерживает необязательные элементы описания и сообщения об ошибках,
 * которые могут использоваться для предоставления дополнительного контекста о поле и
 * любых сообщениях о валидации. Эти элементы связаны с полями ввода
 * через атрибут `aria-describedby`.
 *
 * [Ссылка на документацию RadioGroup](https://react-spectrum.adobe.com/react-aria/RadioGroup.html#radiogroup)
 */

export function RadioGroup(props: RadioGroupProps): ReactElement {
  const [variantProps, otherProps] = radioGroupRecipe.splitVariantProps(props);
  const classNames = radioGroupRecipe(variantProps);
  const {
    children,
    label,
    description,
    errorMessage,
    necessityIndicator,
    isRequired,
    customAsterisk,
  } = otherProps;

  return (
    <RadioVariantContext.Provider value={variantProps}>
      <AriaRadioGroup {...otherProps} className={classNames.root}>
        {label && (
          <Label className={classNames.label}>
            {label}
            {isRequired && necessityIndicator && (
              <Asterisk>{customAsterisk}</Asterisk>
            )}
          </Label>
        )}
        {children}
        {description && (
          <Text slot="description" className={classNames.description}>
            {description}
          </Text>
        )}
        <FieldError className={classNames.error}>{errorMessage}</FieldError>
      </AriaRadioGroup>
    </RadioVariantContext.Provider>
  );
}
