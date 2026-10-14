import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { consumeGeneration, logoutBilling } from '@/api/billing';
import { getApiClient } from '@/api/client';
import {
  hotelNameAboveAddress,
  parseRussianPassport,
  parseRussianPassportOcr,
  readBookingDetails,
  readVisaSticker,
} from '@/api/extract-profile';
import type {
  SchemaAgreementFields,
  SchemaApplicantFields,
} from '#temp/api-schemas/api';
import { clearSession, getSession } from '@/api/session';
import { countries, getCountry } from '@/countries/italy';
import { Button, Select, SelectItem } from '@/design-system';
import { fillPersonalDataAgreement } from '@/pdf/fill-agreement';
import { fillItalyVisa, recentVisa } from '@/pdf/fill-italy';
import { readPdfItems } from '@/pdf/read-document';
import { readRussianPassportOcr } from '@/pdf/read-russian-passport';
import { readSourceText } from '@/pdf/read-source';
import { readTravelPassport } from '@/pdf/read-travel-passport';
import {
  cardClass,
  countryValueClass,
  errorClass,
  flagClass,
  formClass,
  headerClass,
  noticeClass,
  pageClass,
  shellClass,
  subtitleClass,
  titleClass,
} from '@/ui/styles';

import {
  applyManualValues,
  collectGaps,
  flattenGapValues,
  missingChoices,
  PASSPORT_TYPES,
  updateReadValue,
  type Draft,
  type GapFormValues,
} from './form-model';
import { MissingFieldsForm } from './components/missing-fields-form/missing-fields-form';
import { SourceUpload } from './components/source-upload/source-upload';

export const auth = true;

const fillerSchema = z.object({
  country: z.string().min(1, { message: 'Выберите страну.' }),
  passport: optionalFile({
    types: PASSPORT_TYPES,
    typeError: 'Загрузите паспорт в формате JPG, PNG или PDF.',
    maxSize: 10 * 1024 * 1024,
    sizeError: 'Максимальный размер файла — 10 МБ.',
  }),
});

type FillerValues = z.infer<typeof fillerSchema>;

export default function PdfFillerPage() {
  const navigate = useNavigate();
  const session = getSession();
  const [fields, setFields] = useState<SchemaApplicantFields | null>(null);
  const [agreement, setAgreement] = useState<SchemaAgreementFields | null>(
    null,
  );
  const [draft, setDraft] = useState<Draft | null>(null);
  const [warnings, setWarnings] = useState<Array<string>>([]);
  const [formError, setFormError] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);
  const [isParsingRussianPassport, setIsParsingRussianPassport] =
    useState(false);
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FillerValues>({
    resolver: zodResolver(fillerSchema),
    defaultValues: { country: '' },
    mode: 'onTouched',
  });
  const country = getCountry(watch('country') || null);
  const gaps = draft ? collectGaps(draft.fields, draft.agreement) : [];

  const clearResult = () => {
    draftRef.current = null;
    setFields(null);
    setAgreement(null);
    setDraft(null);
    setWarnings([]);
    setEditing({});
  };

  const saveReadValue = (id: string, raw: string) => {
    if (!draftRef.current) {
      return;
    }

    const next = updateReadValue(draftRef.current, id, raw);
    draftRef.current = next;
    setFields(next.fields);
    setAgreement(next.agreement);
    setDraft(next);
    setEditing((current) => ({ ...current, [id]: false }));
  };

  const patchFields = (partial: Partial<SchemaApplicantFields>) => {
    const current = draftRef.current;
    if (!current) {
      return;
    }
    const next: Draft = {
      ...current,
      fields: { ...current.fields, ...partial },
    };
    draftRef.current = next;
    setDraft(next);
    setFields(next.fields);
  };

  const onBookingFile = async (file: File | null) => {
    if (!file) {
      return;
    }
    const text = await readSourceText(file, 'eng+rus+ita').catch(() => '');
    const booking = readBookingDetails(text);
    const placedHotel = file.type.startsWith('image/')
      ? ''
      : await readPdfItems(file)
          .then(hotelNameAboveAddress)
          .catch(() => '');
    const hotelName = placedHotel || booking.hotel;
    patchFields({
      staySource: 'booking',
      ...(hotelName ? { hotelName } : {}),
      ...(booking.address ? { hostAddress: booking.address } : {}),
      ...(booking.phone ? { hotelPhone: booking.phone } : {}),
      hostEmail: '',
      ...(booking.stayFrom ? { stayFrom: booking.stayFrom } : {}),
      ...(booking.stayTo ? { stayTo: booking.stayTo } : {}),
    });
    if (!hotelName && !booking.address) {
      setFormError('В бронировании не найдены отель или адрес. Заполните поля ниже.');
    }
  };

  const onRussianPassport = async (file: File | null) => {
    if (!file) {
      return;
    }
    const current = draftRef.current;
    if (!current) {
      return;
    }
    setIsParsingRussianPassport(true);
    setFormError('');
    try {
      const ocr = await readRussianPassportOcr(file).catch(async () => {
        const text = await readSourceText(file, 'rus').catch(() => '');
        return {
          words: [] as Array<{
            text: string;
            x: number;
            y: number;
            width: number;
            height: number;
            confidence: number;
          }>,
          digitText: '',
          fullText: text,
        };
      });
      const parsed =
        ocr.words.length > 0
          ? parseRussianPassportOcr(ocr.words, ocr.digitText)
          : parseRussianPassport(ocr.fullText);
      const nextAgreement = { ...current.agreement };
      for (const [key, value] of Object.entries(parsed) as Array<
        [keyof SchemaAgreementFields, string]
      >) {
        if (value.trim()) {
          nextAgreement[key] = value.trim();
        }
      }
      nextAgreement.documentType = 'паспорт';
      const next: Draft = { ...current, agreement: nextAgreement };
      draftRef.current = next;
      setAgreement(next.agreement);
      setDraft(next);
      if (!parsed.fullName.trim() || !parsed.series || !parsed.number) {
        setFormError(
          'Часть данных паспорта РФ не прочиталась. Заполните пустые поля ниже.',
        );
      } else {
        setFormError('');
      }
    } finally {
      setIsParsingRussianPassport(false);
    }
  };

  const onVisaFile = async (file: File | null) => {
    if (!file) {
      return;
    }
    const text = await readSourceText(file, 'eng+rus+ita').catch(() => '');
    const sticker = readVisaSticker(text);
    patchFields({
      previousVisa: 'yes',
      fingerprintDate: sticker.fingerprintDate,
      visaNumber: sticker.visaNumber,
    });
    if (sticker.fingerprintDate && draftRef.current && !recentVisa(draftRef.current.fields)) {
      setFormError('Виза старше 5 лет. В анкете будет отметка «Нет».');
    } else if (!sticker.fingerprintDate || !sticker.visaNumber) {
      setFormError('Часть данных с визы не прочиталась. Заполните пустые поля.');
    }
  };

  const onFill = async (values: FillerValues) => {
    const selectedCountry = getCountry(values.country);
    if (!selectedCountry) {
      return;
    }

    setFormError('');

    try {
      const passportText = await readPassportFile(values.passport);

      const result = await getApiClient().POST('/api/v1/documents/extract', {
        body: {
          country: selectedCountry.code,
          passportText,
          formText: '',
          bookingText: '',
          russianPassportText: '',
          russianRegistrationText: '',
        },
      });

      if (result.error || !result.data) {
        setFormError(
          result.error?.message ?? 'Не удалось прочитать загруженные файлы.',
        );
        return;
      }

      const nextDraft: Draft = {
        countryCode: selectedCountry.code,
        fields: result.data.fields,
        agreement: result.data.agreement,
      };
      setFields(nextDraft.fields);
      setAgreement(nextDraft.agreement);
      setDraft(nextDraft);
      setWarnings(result.data.warnings);

      if (
        collectGaps(nextDraft.fields, nextDraft.agreement).length === 0 &&
        !missingChoices(nextDraft.fields)
      ) {
        await downloadFilledDocuments(nextDraft);
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Не удалось заполнить анкету.');
    }
  };

  const onFinish = async (manual: GapFormValues) => {
    const current = draftRef.current;
    if (!current) {
      return;
    }

    setFormError('');
    setIsFinishing(true);

    const choiceError = missingChoices(current.fields);
    if (choiceError) {
      setFormError(choiceError);
      setIsFinishing(false);
      return;
    }

    try {
      const completed = applyManualValues(current, flattenGapValues(manual));
      draftRef.current = completed;
      await downloadFilledDocuments(completed);
      setFields(completed.fields);
      setAgreement(completed.agreement);
      setDraft(completed);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Не удалось заполнить анкету.');
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <main className={pageClass}>
      <div className={shellClass}>
        <header className={headerClass}>
          <div>
            <h1 className={titleClass}>Заполнение анкеты</h1>
            <p className={subtitleClass}>
              Вы вошли как {session?.login}. Выберите страну и загрузите загранпаспорт, если он есть.
            </p>
          </div>
          <Button
            variant="outline"
            onPress={() => {
              void logoutBilling().finally(() => {
                clearSession();
                navigate('/login');
              });
            }}
          >
            Выйти
          </Button>
        </header>

        <form className={cardClass} onSubmit={handleSubmit(onFill)} noValidate>
          <div className={formClass}>
            <Controller
              control={control}
              name="country"
              render={({
                field: { value, onChange, onBlur, name },
                fieldState: { invalid, error },
              }) => (
                <Select
                  name={name}
                  label="Страна"
                  placeholder="Выберите страну"
                  items={countries}
                  selectedKey={value || null}
                  onBlur={onBlur}
                  onSelectionChange={(key) => {
                    onChange(key ? String(key) : '');
                    clearResult();
                  }}
                  isRequired
                  validationBehavior="aria"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                >
                  {(item) => (
                    <SelectItem id={item.id} textValue={item.name}>
                      <span className={countryValueClass}>
                        <span className={flagClass} aria-hidden>
                          {item.flag}
                        </span>
                        {item.name}
                      </span>
                    </SelectItem>
                  )}
                </Select>
              )}
            />

            {country ? (
              <p className={noticeClass}>
                {country.flag} {country.name}: {country.templateName}.{' '}
                {country.documentHint}
              </p>
            ) : null}

            <Controller
              control={control}
              name="passport"
              render={({ field, fieldState: { error } }) => (
                <SourceUpload
                  label="Загранпаспорт"
                  hint="JPG, PNG или PDF страницы с данными"
                  acceptedFileTypes={[...PASSPORT_TYPES]}
                  acceptedFileErrorText="Загрузите паспорт в формате JPG, PNG или PDF."
                  maxFileSize={10 * 1024 * 1024}
                  errorMessage={error?.message}
                  onBlur={field.onBlur}
                  onChange={(file) => {
                    field.onChange(file ?? undefined);
                    if (file) {
                      clearResult();
                    }
                  }}
                />
              )}
            />

            {formError ? <p className={errorClass}>{formError}</p> : null}
            {warnings.map((warning) => (
              <p className={noticeClass} key={warning}>
                {warning}
              </p>
            ))}

            <Button type="submit" variant="solid" isPending={isSubmitting}>
              {gaps.length > 0 ? 'Прочитать заново' : 'Заполнить и скачать'}
            </Button>
          </div>
        </form>

        {fields && agreement ? (
          <MissingFieldsForm
            gaps={gaps}
            fields={fields}
            agreement={agreement}
            editing={editing}
            isPending={isFinishing}
            onSubmit={onFinish}
            onEdit={(id) => setEditing((current) => ({ ...current, [id]: true }))}
            onSave={saveReadValue}
            onMinor={(minor) => patchFields({ minor })}
            onPreviousVisa={(previousVisa) => patchFields({ previousVisa })}
            onVisaFile={(file) => {
              void onVisaFile(file);
            }}
            onStaySource={(staySource) => patchFields({ staySource })}
            onSponsored={(sponsored) => patchFields({ sponsored })}
            onBookingFile={(file) => {
              void onBookingFile(file);
            }}
            onRussianPassport={(file) => {
              void onRussianPassport(file);
            }}
            isParsingRussianPassport={isParsingRussianPassport}
          />
        ) : null}
      </div>
    </main>
  );
}

async function downloadFilledDocuments(draft: Draft): Promise<void> {
  await consumeGeneration();
  const selectedCountry = getCountry(draft.countryCode);
  if (!selectedCountry) {
    throw new Error('Страна не выбрана.');
  }

  const [template, agreementTemplate, font] = await Promise.all([
    fetch(selectedCountry.templateUrl).then((response) => response.arrayBuffer()),
    fetch(selectedCountry.agreementUrl).then((response) =>
      response.arrayBuffer(),
    ),
    fetch('/fonts/NotoSans-Regular.ttf').then((response) =>
      response.arrayBuffer(),
    ),
  ]);
  const filled = await fillItalyVisa({
    template,
    fields: draft.fields,
  });
  const agreementPdf = await fillPersonalDataAgreement({
    template: agreementTemplate,
    font,
    agreement: draft.agreement,
  });

  downloadPdf(filled, `${selectedCountry.code.toLowerCase()}-visa-application.pdf`);
  window.setTimeout(() => {
    downloadPdf(agreementPdf, 'soglasie-personalnye-dannye.pdf');
  }, 300);
}

function optionalFile(options: {
  types: ReadonlyArray<string>;
  typeError: string;
  maxSize: number;
  sizeError: string;
}) {
  return z
    .file({ error: options.typeError })
    .mime([...options.types], { error: options.typeError })
    .max(options.maxSize, { error: options.sizeError })
    .optional();
}

function readPassportFile(file: File | undefined): Promise<string> {
  if (!file) {
    return Promise.resolve('');
  }
  const read = file.type.startsWith('image/')
    ? readTravelPassport(file)
    : readSourceText(file, 'eng');
  return read.catch(() => '');
}

function downloadPdf(bytes: Uint8Array, fileName: string): void {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const url = URL.createObjectURL(
    new Blob([copy], { type: 'application/pdf' }),
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
