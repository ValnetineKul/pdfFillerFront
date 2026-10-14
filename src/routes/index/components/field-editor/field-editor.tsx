import { useState } from 'react';

import { GapControl, gapFieldSchema, normalizeGapInput, optionalGapSchema } from '@/ui/gap-field';

import { fieldIsRequired, OPTIONAL_IDS } from '../../form-model';

export function FieldEditor({
  id,
  label,
  value,
  onSave,
}: {
  id: string;
  label: string;
  value: string;
  onSave: (id: string, value: string) => void;
}) {
  const [draftValue, setDraftValue] = useState(value);
  const [draftError, setDraftError] = useState('');
  const schema = OPTIONAL_IDS.has(id)
    ? optionalGapSchema(id, label)
    : gapFieldSchema(id, label);

  return (
    <GapControl
      id={id}
      label={label}
      value={draftValue}
      autoFocus
      isRequired={fieldIsRequired(id)}
      error={draftError}
      invalid={Boolean(draftError)}
      onValue={setDraftValue}
      onCommit={(next) => {
        const normalized = normalizeGapInput(id, next, false);
        const result = schema.safeParse(normalized);
        if (!result.success) {
          setDraftError(result.error.issues[0]?.message ?? 'Проверьте значение.');
          return;
        }
        setDraftError('');
        onSave(id, normalized);
      }}
    />
  );
}
