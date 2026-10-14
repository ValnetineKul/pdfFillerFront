import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { DragTypes, DropOperation } from 'react-aria';
import type { DropZoneProps as AriaDropZoneProps } from 'react-aria-components';
import { DropZone as AriaDropZone, Text } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { formatFileSize } from '#shared/utils';
import type { DropZoneRecipeVariantProps } from '#styled-system/recipes';
import { dropZoneRecipe } from '#styled-system/recipes';

import { FeaturedIcon } from '../FeaturedIcon';
import type { FileTriggerButtonProps } from '../FileTrigger';
import { FileTrigger } from '../FileTrigger';

/**
 * DropZone — это компонент зоны перетаскивания, который обеспечивает доступное и удобное взаимодействие для перетаскивания файлов, каталогов или других объектов.
 *
 * ## Особенности
 *
 * - **Поддержка Drag & Drop**: Пользователь может перетаскивать объекты мышью, касанием или клавиатурой.
 * - **Доступность**: Зона доступна для работы с клавиатурой и поддерживает вспомогательные технологии.
 * - **Гибкость содержимого**: В качестве детей компонента можно передавать любой контент, который будет менять вид при взаимодействии пользователя.
 * - **Интеграция с FileTrigger**: Часто используется совместно с FileTrigger для поддержки выбора файлов через системный диалог.
 * - **Обработка событий**: Поддерживаются события onDrop, onDropEnter, onDropMove и onDropExit для полного контроля над взаимодействием.
 * - **Контроль над стилизацией**: Состояния hover, focus и состояние зоны при наведении доступны для кастомной стилизации.
 *
 * [Официальная документация React Aria DropZone](https://react-spectrum.adobe.com/react-aria/DropZone.html)
 */

export type DropZoneProps = AriaDropZoneProps &
  FileTriggerButtonProps &
  DropZoneRecipeVariantProps & {
    label?: string;
    triggerButtonLinkText?: string;
    infoText?: string | ((maxFileSize?: string) => string);
    additionalText?: string;
    deviceType?: 'mobile' | 'desktop' | 'tablet';
    maxFileSize?: number;
  } & DataAttributes;

export function DropZone(props: DropZoneProps): ReactElement {
  const {
    infoText,
    triggerButtonLinkText,
    triggerButtonProps,
    additionalText,
    onSelect,
    isDisabled,
    'aria-label': ariaLabel,
    allowsMultiple,
    acceptedFileTypes,
    deviceType = 'desktop',
    maxFileSize,
    ...otherProps
  } = props;
  const className = dropZoneRecipe();

  const checkDropOperation = (
    types: DragTypes,
    acceptedTypes?: ReadonlyArray<string>,
  ): DropOperation => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return 'copy';
    }
    const isAllowed = acceptedTypes.some((type) => types.has(type));
    return isAllowed ? 'copy' : 'cancel';
  };

  let resolvedInfoText: string | undefined;

  if (typeof infoText === 'string') {
    resolvedInfoText = infoText;
  } else if (maxFileSize) {
    resolvedInfoText = infoText?.(formatFileSize(maxFileSize));
  } else {
    resolvedInfoText = undefined;
  }

  return (
    <AriaDropZone
      {...otherProps}
      className={className.root}
      getDropOperation={(types) => checkDropOperation(types, acceptedFileTypes)}
    >
      <FeaturedIcon size={'lg'} type={'modern'}>
        <Icon name="general/upload-01" />
      </FeaturedIcon>
      <div className={className.dropZoneAction}>
        <Text slot="label">
          {triggerButtonLinkText && (
            <FileTrigger
              triggerButtonLinkText={triggerButtonLinkText}
              triggerButtonProps={triggerButtonProps}
              onSelect={onSelect}
              isDisabled={isDisabled}
              aria-label={ariaLabel}
              allowsMultiple={allowsMultiple}
              acceptedFileTypes={acceptedFileTypes}
            />
          )}
          {additionalText && deviceType === 'desktop' && (
            <span className={className.additionalText}> {additionalText}</span>
          )}
        </Text>
        {resolvedInfoText && (
          <div className={className.infoText}>{resolvedInfoText}</div>
        )}
      </div>
    </AriaDropZone>
  );
}
