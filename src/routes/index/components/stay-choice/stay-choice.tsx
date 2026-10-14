import { Radio, RadioGroup } from '@/design-system';
import { formClass, radioRowClass, subtitleClass } from '@/ui/styles';

import { SourceUpload } from '../source-upload/source-upload';

export function StayChoice({
  source,
  onSource,
  onBookingFile,
}: {
  source: string;
  onSource: (value: string) => void;
  onBookingFile: (file: File | null) => void;
}) {
  return (
    <div className={formClass}>
      <RadioGroup
        label="Проживание"
        value={source}
        isRequired
        necessityIndicator
        onChange={onSource}
      >
        <div className={radioRowClass}>
          <Radio value="booking">Букинг</Radio>
          <Radio value="invitation">Приглашение</Radio>
        </div>
      </RadioGroup>
      {source === 'booking' ? (
        <SourceUpload
          label="Бронирование"
          hint="PDF или фото брони: JPG, PNG, WEBP. Из файла берутся отель, адрес и телефон."
          acceptedFileTypes={[
            'application/pdf',
            'application/octet-stream',
            'image/jpeg',
            'image/png',
            'image/webp',
            '',
          ]}
          acceptedFileErrorText="Загрузите бронирование в формате PDF, JPG, PNG или WEBP."
          maxFileSize={15 * 1024 * 1024}
          onBlur={() => undefined}
          onChange={onBookingFile}
        />
      ) : null}
      {source === 'invitation' ? (
        <p className={subtitleClass}>
          Фамилия и имя приглашающего, адрес, телефон и почта. Если они есть в загруженной форме, поля уже заполнены.
        </p>
      ) : null}
    </div>
  );
}
