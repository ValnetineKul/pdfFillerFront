import type { ReactElement } from 'react';
import { useContext } from 'react';
import { mergeProps } from 'react-aria';
import { Button as AriaButton } from 'react-aria-components';

import { cx } from '#styled-system/css';
import { buttonRecipe } from '#styled-system/recipes';

import { Spinner } from '../Loader';
import type { ButtonProps } from '../shared';
import { ButtonVariantContext } from '../shared';

/**
 * IconButton — это элемент предназначен для отображения кнопки с иконкой без текста, позволяющий пользователю выполнять действия с помощью взаимодействия мышью, касанием и клавиатурой.
 * Существуют множество особенностей взаимодействия и доступности, компонент IconButton обрабатывает все эти взаимодействия.
 * Стили вариантов кнопки идентичны компоненту Button.
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

export function IconButton(props: ButtonProps): ReactElement {
  const [variantProps, otherProps] = buttonRecipe.splitVariantProps(props);
  const { children, ...buttonProps } = otherProps;
  const buttonVariantContext = useContext(ButtonVariantContext);
  const mergedVariantProps = mergeProps(buttonVariantContext, variantProps);
  const buttonClassName = buttonRecipe({
    ...mergedVariantProps,
    onlyIcon: true,
  });
  const customClassName = cx(
    buttonClassName,
    typeof otherProps.className === 'string' && otherProps.className,
  );

  return (
    <AriaButton {...buttonProps} className={customClassName}>
      {(renderProps) =>
        renderProps.isPending ? (
          <Spinner colorScheme="inherit" size="lg" />
        ) : typeof children === 'function' ? (
          children(renderProps)
        ) : (
          children
        )
      }
    </AriaButton>
  );
}
