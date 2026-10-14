import type { ReactElement } from 'react';
import { useContext } from 'react';
import type { PressEvent } from 'react-aria';
import { mergeProps } from 'react-aria';
import { Button as AriaButton } from 'react-aria-components';

import { cx } from '#styled-system/css';
import { buttonRecipe } from '#styled-system/recipes';

import { useConfigProvider } from '../ConfigProvider';
import { Spinner } from '../Loader';
import type { ButtonProps } from '../shared';
import {
  ButtonFixWrongCapturingContext,
  ButtonVariantContext,
} from '../shared';

/**
 * Button — это элемент предназначен для отображения кнопки с иконкой без текста, позволяющий пользователю выполнять действия с помощью взаимодействия мышью, касанием и клавиатурой.
 * Существуют множество особенностей взаимодействия и доступности, компонент Button обрабатывает все эти взаимодействия.
 *
 *
 * ## Особенности
 *
 * - **Стилизация**: Предоставляет состояния для наведения, нажатия и фокуса, что облегчает стилизацию. Эти состояния применяются только при взаимодействии с подходящими устройствами ввода.
 *
 * - **Доступность**: Использует нативный элемент `<button>`, поддерживающий клавиши Пробел и Enter.
 *
 * - **Кросс-браузерность**: Нормализует взаимодействия с мышью, касанием, клавиатурой и фокусом для обеспечения согласованности между браузерами и устройствами.
 *
 * - **Ожидающее состояние**: Кнопка может быть переведена в состояние ожидания с помощью пропса `isPending`, что полезно, когда действие занимает много времени, предоставляя пользователю обратную связь о процессе.
 *
 * - **Обработка событий**: Button поддерживает взаимодействия пользователей с помощью мыши, клавиатуры и касаний. Вы можете обрабатывать все эти взаимодействия через пропс `onPress`. Это аналогично стандартному событию `onClick`, но нормализовано для равной поддержки всех методов взаимодействия. В дополнение, события `onPressStart`, `onPressEnd` и `onPressChange` срабатывают по мере взаимодействия пользователя с кнопкой.
 *
 * [Ссылка на документацию Button](https://react-spectrum.adobe.com/react-aria/Button.html#button)
 */

export function Button(props: ButtonProps): ReactElement {
  const [variantProps, otherProps] = buttonRecipe.splitVariantProps(props);
  const { children, onPress, fixWrongCapturing } = otherProps;
  const buttonVariantContext = useContext(ButtonVariantContext);
  const mergedVariantProps = mergeProps(buttonVariantContext, variantProps);
  const className = buttonRecipe(mergedVariantProps);
  const customClassName = cx(
    className,
    typeof otherProps.className === 'string' && otherProps.className,
  );

  const { buttonPressHandlerDelay } = useConfigProvider();
  const buttonFixWrongCapturingContext = useContext(
    ButtonFixWrongCapturingContext,
  );

  const buttonFixWrongCapturingProps = mergeProps(
    buttonFixWrongCapturingContext,
    { fixWrongCapturing },
  );

  /**
   * Workaround https://issues.chromium.org/issues/40851596
   */
  const pressHandler = (e: PressEvent): void => {
    if (
      !buttonFixWrongCapturingProps.fixWrongCapturing ||
      e.pointerType === 'mouse' ||
      e.pointerType === 'keyboard'
    ) {
      onPress?.(e);
      return;
    }
    setTimeout(() => {
      onPress?.(e);
    }, buttonPressHandlerDelay);
  };

  return (
    <AriaButton
      {...otherProps}
      className={customClassName}
      onPress={pressHandler}
    >
      {(renderProps) => (
        <>
          {renderProps.isPending && <Spinner colorScheme="inherit" size="lg" />}
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </AriaButton>
  );
}
