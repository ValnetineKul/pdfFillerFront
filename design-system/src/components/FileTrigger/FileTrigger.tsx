import type { ReactElement } from 'react';
import type { FileTriggerProps as AriaFileTriggerProps } from 'react-aria-components';
import { FileTrigger as AriaFileTrigger } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import { Button } from '../Button';
import type { ButtonProps } from '../shared';

export type FileTriggerButtonProps = AriaFileTriggerProps &
  ButtonProps & {
    triggerButtonLinkText?: string;
    triggerButtonProps?: ButtonProps;
  } & DataAttributes;

/**
 * FileTrigger — это компонент, который обеспечивает доступ к выбору файлов или каталогов через взаимодействие с любой React Aria или React Spectrum компонентой или с помощью пользовательских компонентов, созданных с использованием хука usePress.
 * Этот компонент скрывает стандартный элемент `<input type="file">`, предоставляя более гибкие способы стилизации и интеграции в пользовательский интерфейс.
 *
 * ## Особенности
 *
 * - **Гибкость**: Работает с любыми pressable компонентами, что позволяет легко интегрировать его с дизайном.
 * - **Поддержка выбора каталогов**: Возможность выбрать директории с помощью свойства `acceptDirectory`.
 * - **Мультифайловая загрузка**: Можно разрешить выбор нескольких файлов через свойство `allowsMultiple`.
 * - **Настраиваемое ограничение типов файлов**: Задавайте допустимые MIME-типы через `acceptedFileTypes`.
 * - **Accessibility**: Поддержка `aria-label` и `aria-labelledby` для обеспечения доступности.
 *
 * ## Использование
 *
 * Компонент оборачивает нажимаемый элемент (например, кнопку) и включает скрытый элемент `<input>`, который вызывает системное окно выбора файлов или каталогов.
 *
 * [Пример использования](https://react-spectrum.adobe.com/react-aria/FileTrigger.html)
 */

export function FileTrigger(props: FileTriggerButtonProps): ReactElement {
  const {
    'aria-label': ariaLabel,
    triggerButtonLinkText,
    isDisabled,
    triggerButtonProps,
    ...triggerProps
  } = props;

  return (
    <AriaFileTrigger {...triggerProps}>
      <Button
        variant={'link'}
        size={'md'}
        colorScheme={'primary'}
        aria-label={ariaLabel}
        isDisabled={isDisabled}
        {...triggerButtonProps}
      >
        {triggerButtonLinkText}
      </Button>
    </AriaFileTrigger>
  );
}
