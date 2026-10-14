import { useCallback, useRef } from 'react';

import { FileUpload } from '@/design-system';
import { errorClass } from '@/ui/styles';

export function SourceUpload({
  label,
  hint,
  acceptedFileTypes,
  acceptedFileErrorText,
  maxFileSize,
  errorMessage,
  onChange,
  onBlur,
}: {
  label: string;
  hint: string;
  acceptedFileTypes: Array<string>;
  acceptedFileErrorText: string;
  maxFileSize: number;
  errorMessage?: string;
  onChange: (file: File | null) => void;
  onBlur: () => void;
}) {
  const maxMegabytes = Math.round(maxFileSize / (1024 * 1024));
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const handleChange = useCallback((files: Array<File>) => {
    onChangeRef.current(files.at(-1) ?? null);
  }, []);

  return (
    <div onBlur={onBlur}>
      <FileUpload
        aria-label={label}
        triggerButtonLinkText={label}
        additionalText="или перетащите файл"
        infoText={() => hint}
        acceptedFileTypes={acceptedFileTypes}
        acceptedFileErrorText={acceptedFileErrorText}
        maxFileSize={maxFileSize}
        maxFileSizeErrorText={() =>
          `Максимальный размер файла — ${maxMegabytes} МБ.`
        }
        fileUploadProgressText={(progress) => `${progress}% загружено`}
        deleteButtonAriaLabel={(fileName) => `Удалить ${fileName}`}
        reloadButtonAriaLabel={(fileName) => `Загрузить ${fileName} снова`}
        onChange={handleChange}
      />
      {errorMessage ? <p className={errorClass}>{errorMessage}</p> : null}
    </div>
  );
}
