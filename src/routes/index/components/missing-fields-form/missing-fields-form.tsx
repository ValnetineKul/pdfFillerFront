import { useEffect, useMemo, useState } from 'react';
import {
  Controller,
  useForm,
  useWatch,
  type FieldPath,
  type Resolver,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  SchemaAgreementFields,
  SchemaApplicantFields,
} from '#temp/api-schemas/api';
import { Accordion, AccordionItem, Button, Loader } from '@/design-system';
import { buildGapSchema, GapControl, normalizeGapInput } from '@/ui/gap-field';
import {
  blockLoaderClass,
  blocksClass,
  blockWrapClass,
  cardClass,
  formClass,
  rowClass,
  subtitleClass,
  titleClass,
  wideFieldClass,
} from '@/ui/styles';

import { FieldEditor } from '../field-editor/field-editor';
import { SourceUpload } from '../source-upload/source-upload';
import {
  BLOCKS,
  blockIsComplete,
  fieldIsRequired,
  fieldsForBlock,
  FIELD_LABELS,
  gapFormDefaults,
  OPTIONAL_IDS,
  PASSPORT_TYPES,
  SPONSOR_FIELDS,
  storedValue,
  type BlockId,
  type Gap,
  type GapFormValues,
} from '../../form-model';
import { LockedInput } from '../locked-input/locked-input';
import { MinorChoice } from '../minor-choice/minor-choice';
import { SponsorChoice } from '../sponsor-choice/sponsor-choice';
import { StayChoice } from '../stay-choice/stay-choice';
import { VisaChoice } from '../visa-choice/visa-choice';

export function MissingFieldsForm({
  gaps,
  fields,
  agreement,
  editing,
  isPending,
  onSubmit,
  onEdit,
  onSave,
  onMinor,
  onPreviousVisa,
  onVisaFile,
  onStaySource,
  onSponsored,
  onBookingFile,
  onRussianPassport,
  isParsingRussianPassport = false,
}: {
  gaps: Array<Gap>;
  fields: SchemaApplicantFields;
  agreement: SchemaAgreementFields;
  editing: Record<string, boolean>;
  isPending: boolean;
  onSubmit: (values: GapFormValues) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, value: string) => void;
  onMinor: (value: string) => void;
  onPreviousVisa: (value: string) => void;
  onVisaFile: (file: File | null) => void;
  onStaySource: (value: string) => void;
  onSponsored: (value: string) => void;
  onBookingFile: (file: File | null) => void;
  onRussianPassport: (file: File | null) => void;
  isParsingRussianPassport?: boolean;
}) {
  const optionalWork = FIELD_LABELS.filter(
    ([key]) => OPTIONAL_IDS.has(`visa.${key}`) && !fields[key].trim(),
  ).map(([key, label]) => ({
    id: `visa.${key}`,
    label,
    optional: true,
  }));
  const schema = useMemo(
    () => buildGapSchema([...gaps, ...optionalWork]),
    [gaps, fields],
  );
  const {
    control,
    handleSubmit,
  } = useForm<GapFormValues>({
    resolver: zodResolver(schema) as Resolver<GapFormValues>,
    defaultValues: {
      ...gapFormDefaults(gaps),
      visa: {
        ...gapFormDefaults(gaps).visa,
        ...Object.fromEntries(optionalWork.map((item) => [item.id.split('.')[1], ''])),
      },
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const formValues = useWatch({ control }) as GapFormValues;
  const completeByBlock = useMemo(() => {
    const result = {} as Record<BlockId, boolean>;
    for (const block of BLOCKS) {
      result[block.id] = blockIsComplete(block.id, fields, agreement, formValues);
    }
    return result;
  }, [agreement, fields, formValues]);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(BLOCKS.map((block) => block.id)),
  );

  useEffect(() => {
    setExpanded((current) => {
      const next = new Set(current);
      let changed = false;
      for (const block of BLOCKS) {
        if (!completeByBlock[block.id] && !next.has(block.id)) {
          next.add(block.id);
          changed = true;
        }
      }
      return changed ? next : current;
    });
  }, [completeByBlock]);

  const renderField = (item: { id: string; label: string }) => {
    const value = storedValue(item.id, fields, agreement);
    const isParentAddress =
      item.id === 'visa.parent1Address' || item.id === 'visa.parent2Address';
    if (value.trim() && !editing[item.id]) {
      return (
        <LockedInput
          key={item.id}
          id={item.id}
          label={item.label}
          value={value}
          onEdit={() => onEdit(item.id)}
        />
      );
    }
    if (isParentAddress || (value.trim() && editing[item.id])) {
      return (
        <FieldEditor
          key={item.id}
          id={item.id}
          label={item.label}
          value={value}
          onSave={onSave}
        />
      );
    }
    return (
      <Controller
        key={item.id}
        control={control}
        name={item.id as FieldPath<GapFormValues>}
        render={({ field, fieldState: { invalid, error } }) => (
          <GapControl
            id={item.id}
            label={item.label}
            value={typeof field.value === 'string' ? field.value : ''}
            isRequired={fieldIsRequired(item.id)}
            invalid={invalid}
            error={error?.message}
            onValue={field.onChange}
            onBlur={field.onBlur}
            onCommit={(next) => {
              field.onChange(normalizeGapInput(item.id, next, false));
              field.onBlur();
            }}
          />
        )}
      />
    );
  };

  return (
    <form className={cardClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={titleClass} style={{ fontSize: '20px' }}>
        Данные для анкеты
      </h2>
      <p className={subtitleClass}>
        Заполненное поле закрыто. Нажмите карандаш, чтобы исправить его.
        Раздел «Работа» можно оставить пустым.
      </p>
      <div className={blocksClass}>
        <Accordion
          allowsMultipleExpanded
          expandedKeys={expanded}
          onExpandedChange={(keys) => {
            const next = new Set<string>();
            for (const key of keys) {
              next.add(String(key));
            }
            for (const block of BLOCKS) {
              if (!completeByBlock[block.id]) {
                next.add(block.id);
              }
            }
            setExpanded(next);
          }}
        >
          {BLOCKS.map((block) => {
            const items = fieldsForBlock(block.id, fields, agreement).filter(
              (item) => block.id !== 'passport' || !item.id.startsWith('visa.parent'),
            );
            const parentItems =
              block.id === 'passport' && fields.minor === 'yes'
                ? fieldsForBlock(block.id, fields, agreement).filter((item) =>
                    item.id.startsWith('visa.parent'),
                  )
                : [];
            const complete = completeByBlock[block.id];
            const showConsentLoader =
              block.id === 'consent' && isParsingRussianPassport;
            return (
              <div
                className={blockWrapClass}
                data-complete={complete ? 'true' : 'false'}
                key={block.id}
              >
                {showConsentLoader ? (
                  <div className={blockLoaderClass} aria-busy="true">
                    <Loader size="2xl" text="Читаем паспорт РФ…" />
                  </div>
                ) : null}
                <AccordionItem id={block.id} label={block.label}>
                  <div className={formClass}>
                    {block.id === 'trip' ? (
                      <VisaChoice
                        previousVisa={fields.previousVisa}
                        fingerprintDate={fields.fingerprintDate}
                        onPreviousVisa={onPreviousVisa}
                        onVisaFile={onVisaFile}
                      />
                    ) : null}
                    {block.id === 'stay' ? (
                      <StayChoice
                        source={fields.staySource}
                        onSource={onStaySource}
                        onBookingFile={onBookingFile}
                      />
                    ) : null}
                    {block.id === 'consent' ? (
                      <SourceUpload
                        label="Паспорт РФ"
                        hint="JPG, PNG или PDF страницы с фото. Непрочитанные поля останутся ниже."
                        acceptedFileTypes={[...PASSPORT_TYPES]}
                        acceptedFileErrorText="Загрузите паспорт РФ в формате JPG, PNG или PDF."
                        maxFileSize={10 * 1024 * 1024}
                        onBlur={() => undefined}
                        onChange={onRussianPassport}
                      />
                    ) : null}
                    <div className={rowClass}>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={
                            item.id === 'visa.hotelName' ||
                            item.id === 'visa.hostAddress'
                              ? wideFieldClass
                              : undefined
                          }
                        >
                          {renderField(item)}
                        </div>
                      ))}
                    </div>
                    {block.id === 'passport' ? (
                      <MinorChoice minor={fields.minor} onMinor={onMinor} />
                    ) : null}
                    {parentItems.length > 0 ? (
                      <div className={rowClass}>
                        {parentItems.map(renderField)}
                      </div>
                    ) : null}
                    {block.id === 'trip' && fields.sponsored === 'yes' ? (
                      <div className={rowClass}>
                        {SPONSOR_FIELDS.map((item) => renderField(item))}
                      </div>
                    ) : null}
                    {block.id === 'trip' ? (
                      <SponsorChoice
                        sponsored={fields.sponsored}
                        onSponsored={onSponsored}
                      />
                    ) : null}
                  </div>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
      <Button type="submit" variant="solid" isPending={isPending}>
        {gaps.length > 0 ? 'Дополнить и скачать' : 'Скачать документы'}
      </Button>
    </form>
  );
}
