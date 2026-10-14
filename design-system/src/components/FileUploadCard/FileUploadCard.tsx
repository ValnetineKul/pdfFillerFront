import { Icon } from '@front/icons';
import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import {
  formatFileSize,
  pickDataAttributes,
  renderMiddleEllipsis,
} from '#shared/utils';
import type { FileUploadCardRecipeVariantProps } from '#styled-system/recipes';
import { fileUploadCardRecipe } from '#styled-system/recipes';

import { FeaturedIcon } from '../FeaturedIcon';
import { FileTypeIcons } from '../FileTypeIcons';
import { IconButton } from '../IconButton';
import { Loader } from '../Loader';
import type { ButtonProps } from '../shared';

/**
 * FileUploadCard — это компонент карточки для отображения отдельного файла в процессе загрузки или после неё.
 *
 * ## Особенности
 *
 * - **Поддержка статуса загрузки**: Отображает прогресс загрузки, успешное завершение и ошибки.
 * - **Универсальная визуализация**: Показывает иконку типа файла, имя, размер и сообщения об ошибках.
 * - **Доступность**: Включает aria-labels для кнопок удаления и повторной загрузки, улучшая UX для вспомогательных технологий.
 * - **Управление файлами**: Позволяет удалять файлы и повторять загрузку с соответствующими обработчиками событий.
 * - **Гибкость стилизации**: Использует систему рецептов для кастомного внешнего вида и адаптивности.
 *
 * ## Использование
 *
 * Принимает файл и статус загрузки, отображая все метаданные и состояние, предоставляя пользователю интерактивный контроль над файлом.
 *
 * Обычно используется как дочерний компонент FileUpload для представления каждого элемента в списке загружаемых файлов.
 *
 * Поддерживает показ ошибок по размеру или типу файла с кастомным текстом.
 */

export type FileUploadCardProps = {
  file?: File;
  isComplete?: boolean;
  isError?: boolean;
  deleteButtonAriaLabel?: (fileName: string) => string;
  reloadButtonAriaLabel?: (fileName: string) => string;
  fileUploadProgressText?: (progress: number) => string;
  errorText?: string;
  onDelete?: () => void;
  onReload?: () => void;
  progressValue?: number;
  maxFileSizeErrorText?: (maxFileSize?: string) => string;
  acceptedFileErrorText?: string;
  isSizeError?: boolean;
  deleteButtonProps?: ButtonProps;
  reloadButtonProps?: ButtonProps;
} & FileUploadCardRecipeVariantProps &
  DataAttributes;

export function FileUploadCard(props: FileUploadCardProps): ReactElement {
  const classNames = fileUploadCardRecipe();
  const {
    reloadButtonAriaLabel,
    deleteButtonAriaLabel,
    isError,
    isComplete,
    errorText,
    fileUploadProgressText,
    onDelete,
    onReload,
    progressValue,
    isSizeError,
    acceptedFileErrorText,
    file,
    deleteButtonProps,
    reloadButtonProps,
  } = props;
  const fileType = file?.type;
  const fileName = file?.name;
  const fileSize = file ? formatFileSize(file.size) : undefined;

  const progressText = progressValue
    ? fileUploadProgressText?.(progressValue)
    : '';
  const deleteLabel = deleteButtonAriaLabel?.(fileName ?? '');
  const reloadLabel = reloadButtonAriaLabel?.(fileName ?? '');

  const truncatedFileName = renderMiddleEllipsis(fileName, {
    head: classNames.fileNameHead,
    tail: classNames.fileNameTail,
  });

  return (
    <div {...pickDataAttributes(props)} className={classNames.root}>
      <div className={classNames.topBlock}>
        <div className={classNames.mobileFileIcon}>
          <FileTypeIcons fileType={fileType} />
        </div>
        {isComplete ? (
          <>
            <div className={classNames.desktopLeftBlock}>
              <div className={classNames.desktopFileIcon}>
                <FileTypeIcons fileType={fileType} />
              </div>
              <div className={classNames.infoWrapper}>
                {fileName && (
                  <div className={classNames.fileName}>{truncatedFileName}</div>
                )}

                {fileSize && (
                  <div className={classNames.fileMeta}>{fileSize}</div>
                )}
              </div>
            </div>
            <div className={classNames.actionsWrapper}>
              <FeaturedIcon size="xs" colorScheme={'success'}>
                <Icon name="general/check" />
              </FeaturedIcon>
              <IconButton
                aria-label={deleteLabel}
                size={'sm'}
                variant={'subtle'}
                colorScheme={'secondary'}
                onPress={onDelete}
                {...deleteButtonProps}
              >
                <Icon name="general/trash-01" width={20} height={20} />
              </IconButton>
            </div>
          </>
        ) : isError ? (
          <>
            <div className={classNames.desktopLeftBlock}>
              <div className={classNames.desktopFileIcon}>
                <FileTypeIcons fileType={fileType} />
              </div>
              <div className={classNames.infoWrapper}>
                {fileName && (
                  <div className={classNames.fileName}>{truncatedFileName}</div>
                )}
                {errorText && (
                  <div className={classNames.fileMeta}>{errorText}</div>
                )}
              </div>
            </div>
            <div className={classNames.actionsWrapper}>
              <IconButton
                aria-label={deleteLabel}
                size={'sm'}
                variant={'subtle'}
                colorScheme={'error'}
                onPress={onDelete}
                {...deleteButtonProps}
              >
                <Icon name="general/trash-01" width={20} height={20} />
              </IconButton>
              {!(isSizeError || errorText === acceptedFileErrorText) && (
                <IconButton
                  aria-label={reloadLabel}
                  size={'sm'}
                  variant={'subtle'}
                  colorScheme={'secondary'}
                  onPress={onReload}
                  {...reloadButtonProps}
                >
                  <Icon name="arrows/refresh-cw-04" width={20} height={20} />
                </IconButton>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={classNames.desktopLeftBlock}>
              <div className={classNames.desktopFileIcon}>
                <FileTypeIcons fileType={fileType} />
              </div>
              <div className={classNames.infoWrapper}>
                {fileName && (
                  <div className={classNames.fileName}>{truncatedFileName}</div>
                )}
                {fileSize && progressText && (
                  <div className={classNames.fileMeta}>
                    {fileSize} – {progressText}
                  </div>
                )}
              </div>
            </div>
            <div className={classNames.actionsWrapper}>
              <div className={classNames.loader}>
                <Loader size={'md'}></Loader>
              </div>
              <IconButton
                aria-label={deleteLabel}
                size={'sm'}
                variant={'subtle'}
                colorScheme={'secondary'}
                onPress={onDelete}
                {...deleteButtonProps}
              >
                <Icon name="general/trash-01" width={20} height={20} />
              </IconButton>
            </div>
          </>
        )}
      </div>
      <div className={classNames.mobileInfoBlock}>
        {isComplete ? (
          <div className={classNames.mobileInfoWrapper}>
            {fileName && (
              <div className={classNames.fileName}>{truncatedFileName}</div>
            )}
            {fileSize && <div className={classNames.fileMeta}>{fileSize}</div>}
          </div>
        ) : isError ? (
          <div className={classNames.mobileInfoWrapper}>
            {fileName && (
              <div className={classNames.fileName}>{truncatedFileName}</div>
            )}
            {errorText && (
              <div className={classNames.fileMeta}>{errorText}</div>
            )}
          </div>
        ) : (
          <div className={classNames.mobileInfoWrapper}>
            {fileName && (
              <div className={classNames.fileName}>{truncatedFileName}</div>
            )}
            {fileSize && progressText && (
              <div className={classNames.fileMeta}>
                {fileSize} – {progressText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
