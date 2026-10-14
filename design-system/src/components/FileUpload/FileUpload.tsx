import type { FileDropItem } from '@react-types/shared';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { DropEvent } from 'react-aria';

import type { DataAttributes } from '#shared/types';
import { formatFileSize, splitDataAttributes } from '#shared/utils';
import type { FileUploadRecipeVariantProps } from '#styled-system/recipes';
import { fileUploadRecipe } from '#styled-system/recipes';

import type { DropZoneProps } from '../DropZone';
import { DropZone } from '../DropZone';
import type { FileUploadCardProps } from '../FileUploadCard';
import { FileUploadCard } from '../FileUploadCard';

/**
 * FileUpload — комплексный компонент для загрузки файлов с поддержкой drag & drop, выбора через диалог,
 * отображения прогресса загрузки, валидации файлов и управления множественным выбором.
 *
 * ## Особенности
 *
 * - **Интеграция с DropZone и FileTrigger**: Поддержка drag & drop и системного окна выбора файлов.
 * - **Валидация файлов**: Проверка по размеру и типам, с выводом сообщений об ошибках.
 * - **Множественный выбор**: Можно разрешить или запретить загрузку нескольких файлов.
 * - **Отображение статуса**: Показ прогресса чтения/загрузки, ошибки и состояния успешной загрузки.
 * - **Полное управление файлами**: Добавление, удаление, повторная загрузка с обратной связью.
 * - **Accessibility**: Поддержка aria-атрибутов для обеспечения доступности.
 * - **Кастомизация**: Поддерживает стили через файл рецептов и кастомные сообщения.
 *
 * ## Использование
 *
 * Файл можно добавить перетаскиванием или через настраиваемую кнопку выбора файлов,
 * после чего компонент отображает карточки с прогрессом и возможностью управления каждым файлом.
 *
 * [Пример использования DropZone](https://react-spectrum.adobe.com/react-aria/DropZone.html)
 * [Пример использования FileTrigger](https://react-spectrum.adobe.com/react-aria/FileTrigger.html)
 */

export type FileUploadProps = DropZoneProps &
  FileUploadRecipeVariantProps &
  FileUploadCardProps & {
    maxFileSize?: number;
    maxFileSizeErrorText?: (maxFileSize?: string) => string;
    acceptedFileTypes?: Array<string>;
    allowsMultiple?: boolean;
    acceptedFileErrorText?: string;
    fileUploadProgressText?: (progress: number) => string;
    deleteButtonAriaLabel?: (fileName: string) => string;
    reloadButtonAriaLabel?: (fileName: string) => string;
    onChange: (files: Array<File>) => void;
  } & DataAttributes;

export type FileItemType = {
  file: File;
  fileName: string;
  fileSize?: string;
  status: 'reading' | 'complete' | 'error';
  progress: number;
  errorText?: string;
  id: string;
  isValid: boolean;
  isSizeError?: boolean;
};

export function FileUpload(props: FileUploadProps): ReactElement {
  const {
    triggerButtonLinkText,
    triggerButtonProps,
    reloadButtonProps,
    onChange,
    errorText,
    maxFileSizeErrorText,
    maxFileSize,
    acceptedFileTypes,
    acceptedFileErrorText,
    allowsMultiple,
    fileUploadProgressText,
    deleteButtonAriaLabel,
    reloadButtonAriaLabel,
    deleteButtonProps,
    'aria-label': ariaLabel,
    ...otherProps
  } = props;
  const [dataAttributes, dropZoneProps] = splitDataAttributes(otherProps);
  const className = fileUploadRecipe();
  const [files, setFiles] = useState<Array<FileItemType>>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const validFiles = files.filter((f) => f.isValid);

    const uniqueFiles = validFiles.filter(
      (file, index, self) =>
        self.findIndex(
          (f) =>
            f.file.name === file.file.name && f.file.size === file.file.size,
        ) === index,
    );

    const uniqueValidFiles = uniqueFiles.map((f) => f.file);

    onChange?.(uniqueValidFiles);
  }, [files, onChange]);

  useEffect(() => {
    if (!allowsMultiple && files.length === 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [files, allowsMultiple]);

  const readFileWithProgress = (fileItem: FileItemType): void => {
    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id ? { ...f, progress: percent } : f,
          ),
        );
      }
    };

    reader.onload = () => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id
            ? { ...f, status: 'complete', progress: 100 }
            : f,
        ),
      );
    };

    reader.onerror = () => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id
            ? { ...f, status: 'error', progress: 0, errorText }
            : f,
        ),
      );
    };

    reader.readAsArrayBuffer(fileItem.file);
  };

  const validateFile = (file: File): string | undefined => {
    if (maxFileSize && file.size > maxFileSize) {
      return maxFileSizeErrorText?.(formatFileSize(maxFileSize));
    }

    if (
      acceptedFileTypes &&
      acceptedFileTypes.length > 0 &&
      !acceptedFileTypes.includes(file.type)
    ) {
      return acceptedFileErrorText;
    }
  };

  const addFiles = async (
    newFileDropItems: Array<FileDropItem>,
  ): Promise<void> => {
    const newFiles: Array<FileItemType> = [];

    for (const item of newFileDropItems) {
      try {
        const nativeFile = await item.getFile();

        const uniqueId = crypto.randomUUID();

        const validationError = validateFile(nativeFile);
        const isSizeError = Boolean(
          maxFileSize && nativeFile.size > maxFileSize,
        );

        const isValid = !validationError;

        if (validationError) {
          newFiles.push({
            file: nativeFile,
            fileName: nativeFile.name,
            status: 'error',
            progress: 0,
            errorText: validationError,
            id: uniqueId,
            isValid,
            isSizeError,
          });
          continue;
        }

        const fileItem: FileItemType = {
          file: nativeFile,
          fileName: nativeFile.name,
          status: 'reading',
          progress: 0,
          id: uniqueId,
          isValid,
        };

        newFiles.push(fileItem);
        readFileWithProgress(fileItem);
      } catch {
        newFiles.push({
          file: {} as File,
          fileName: item.name,
          status: 'error',
          progress: 0,
          fileSize: undefined,
          id: crypto.randomUUID(),
          isValid: false,
        });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);

    if (!allowsMultiple && files.length + newFiles.length >= 1) {
      setIsDisabled(true);
    }
  };

  const handleSelect = async (fileList: FileList | null): Promise<void> => {
    if (!fileList || isDisabled) return;
    const items: Array<FileDropItem> = Array.from(fileList).map((file) => ({
      kind: 'file',
      name: file.name,
      type: file.type,
      getFile: async () => file,
      getText: async () => '',
      types: new Set(),
    }));
    await addFiles(items);
  };

  const handleDrop = async (e: DropEvent): Promise<void> => {
    if (isDisabled) return;
    const fileItems = e.items.filter(
      (item): item is FileDropItem => item.kind === 'file',
    );

    if (!allowsMultiple && fileItems.length > 1) {
      setIsDisabled(true);
      return;
    }

    await addFiles(fileItems);
  };

  const handleDelete = (idToRemove: string): void => {
    setFiles((prev) => prev.filter((f) => f.id !== idToRemove));
    setIsDisabled(false);
  };

  const handleReload = (idToReload: string): void => {
    const fileItem = files.find((file) => file.id === idToReload);
    if (!fileItem) return;

    const validationError = validateFile(fileItem.file);
    if (validationError) {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === idToReload
            ? {
                ...file,
                status: 'error',
                progress: 0,
                errorText: validationError,
              }
            : file,
        ),
      );
      return;
    }

    const resetItem: FileItemType = {
      ...fileItem,
      status: 'reading',
      progress: 0,
      errorText: undefined,
    };

    setFiles((prev) =>
      prev.map((file) => (file.id === idToReload ? resetItem : file)),
    );

    readFileWithProgress(resetItem);
  };

  return (
    <div {...dataAttributes} className={className.root}>
      <DropZone
        {...dropZoneProps}
        onDrop={handleDrop}
        onSelect={handleSelect}
        isDisabled={isDisabled}
        aria-label={ariaLabel}
        triggerButtonLinkText={triggerButtonLinkText}
        triggerButtonProps={triggerButtonProps}
        allowsMultiple={allowsMultiple}
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
      />
      {files.length > 0 && (
        <div className={className.cardsList}>
          {files.map((file, index) => (
            <FileUploadCard
              key={file.id}
              file={file.file}
              isComplete={file.status === 'complete'}
              isError={file.status === 'error'}
              progressValue={file.progress}
              errorText={file.errorText ?? errorText}
              fileUploadProgressText={fileUploadProgressText}
              deleteButtonAriaLabel={deleteButtonAriaLabel}
              reloadButtonAriaLabel={reloadButtonAriaLabel}
              onDelete={() => handleDelete(file.id)}
              onReload={() => handleReload(file.id)}
              isSizeError={file.isSizeError}
              acceptedFileErrorText={acceptedFileErrorText}
              deleteButtonProps={deleteButtonProps}
              reloadButtonProps={reloadButtonProps}
              data-track-position={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
