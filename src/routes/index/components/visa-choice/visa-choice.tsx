import { Radio, RadioGroup } from '@/design-system';
import { recentVisa } from '@/pdf/fill-italy';
import { noticeClass, formClass, radioRowClass } from '@/ui/styles';

import { PASSPORT_TYPES } from '../../form-model';
import { SourceUpload } from '../source-upload/source-upload';

export function VisaChoice({
  previousVisa,
  fingerprintDate,
  onPreviousVisa,
  onVisaFile,
}: {
  previousVisa: string;
  fingerprintDate: string;
  onPreviousVisa: (value: string) => void;
  onVisaFile: (file: File | null) => void;
}) {
  const oldVisa =
    Boolean(fingerprintDate) &&
    previousVisa === 'yes' &&
    !recentVisa({ fingerprintDate, previousVisa });
  return (
    <div className={formClass}>
      <RadioGroup
        label="Была виза за последние 5 лет"
        value={previousVisa}
        isRequired
        necessityIndicator
        onChange={onPreviousVisa}
      >
        <div className={radioRowClass}>
          <Radio value="yes">Да</Radio>
          <Radio value="no">Нет</Radio>
        </div>
      </RadioGroup>
      {previousVisa === 'yes' ? (
        <>
          <div className={noticeClass}>
            На наклейке номер визы стоит справа сверху. Дата отпечатков пальцев — в строке
            fingerprints / remarks. Если виза выдана раньше чем 5 лет назад, в анкете будет «Нет».
          </div>
          <SourceUpload
            label="Фото визы"
            hint="JPG, PNG или PDF наклейки"
            acceptedFileTypes={[...PASSPORT_TYPES]}
            acceptedFileErrorText="Загрузите визу в формате JPG, PNG или PDF."
            maxFileSize={10 * 1024 * 1024}
            onBlur={() => undefined}
            onChange={onVisaFile}
          />
          {oldVisa ? (
            <p className={noticeClass}>Виза старше 5 лет. В пункте 29 будет отметка «Нет».</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
