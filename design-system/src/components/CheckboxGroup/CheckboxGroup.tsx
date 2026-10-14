import type { ReactElement, ReactNode } from 'react';
import type {
  CheckboxGroupProps,
  ValidationResult,
} from 'react-aria-components';
import {
  CheckboxGroup as AriaCheckboxGroup,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { CheckboxRecipeVariantProps } from '#styled-system/recipes';
import { checkboxGroupRecipe, checkboxRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { CheckboxVariantContext } from '../Checkbox';

export interface AriaCheckboxGroupProps
  extends
    Omit<CheckboxGroupProps, 'children'>,
    AsteriskFieldProps,
    DataAttributes {
  children?: ReactNode;
  label?: string;
  description?: string;
  size?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  necessityIndicator?: boolean;
}

/**
 * ## CheckboxGroup
 *
 * Группа флажков позволяет пользователю выбирать несколько элементов из списка вариантов.
 *
 * ### Особенности
 *
 * Группы флажков можно создать в HTML с помощью элементов `<fieldset>` и `<input>`, однако их сложно стилизовать. CheckboxGroup помогает создать доступные группы флажков, которые можно стилизовать по мере необходимости.
 *
 * - **Доступность** — Группы флажков доступны для вспомогательных технологий через ARIA и автоматически связывают вложенные `<Label>`. Поддерживаются также слоты для описания и сообщения об ошибке.
 * - **Интеграция с HTML-формами** — Каждый отдельный флажок использует визуально скрытый элемент `<input>`, что позволяет интегрироваться с HTML-формами и поддерживать автозаполнение.
 * - **Валидация** — Поддержка нативной валидации ограничений HTML с настраиваемым пользовательским интерфейсом, пользовательскими функциями валидации и ошибками валидации на стороне сервера.
 *
 * ### Анатомия
 *
 * Группа флажков состоит из набора флажков и метки. Каждый флажок включает метку и визуальный индикатор выбора. В группе может быть выбрано ноль или более флажков одновременно. Пользователи могут щелкнуть или коснуться флажка, чтобы выбрать его, или использовать клавишу Tab для навигации к нему и клавишу Space для переключения состояния.
 *
 * CheckboxGroup также поддерживает необязательные элементы описания и сообщения об ошибке, которые могут использоваться для предоставления дополнительного контекста о поле и любых сообщениях о валидации. Они связаны с входными данными через атрибут `aria-describedby`.
 *
 * [Ссылка на документацию CheckboxGroup](https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html#checkbox)
 */
export function CheckboxGroup(
  props: AriaCheckboxGroupProps & CheckboxRecipeVariantProps,
): ReactElement {
  const [variantProps, otherProps] = checkboxRecipe.splitVariantProps(props);
  const [groupVariantProps] = checkboxGroupRecipe.splitVariantProps(props);
  const {
    children,
    description,
    errorMessage,
    label,
    isRequired,
    necessityIndicator,
    customAsterisk,
    ...checkboxProps
  } = otherProps;

  const classNames = checkboxGroupRecipe(groupVariantProps);

  return (
    <CheckboxVariantContext.Provider value={variantProps}>
      <AriaCheckboxGroup {...checkboxProps} className={classNames.root}>
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
        {errorMessage && (
          <FieldError className={classNames.error}>{errorMessage}</FieldError>
        )}
      </AriaCheckboxGroup>
    </CheckboxVariantContext.Provider>
  );
}
