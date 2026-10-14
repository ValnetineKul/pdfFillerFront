import { Icon } from '@front/icons';

import { IconButton } from '@/design-system';
import { GapControl } from '@/ui/gap-field';
import { lockedChoiceClass, lockedFieldClass } from '@/ui/styles';

import { fieldIsRequired } from '../../form-model';

export function LockedInput({
  id,
  label,
  value,
  onEdit,
}: {
  id: string;
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className={id === 'visa.sponsored' ? lockedChoiceClass : lockedFieldClass}>
      <GapControl
        id={id}
        label={label}
        value={value}
        isDisabled
        isRequired={fieldIsRequired(id)}
        onValue={() => undefined}
        onCommit={() => undefined}
      />
      <IconButton
        aria-label={`Исправить «${label}»`}
        variant="subtle"
        colorScheme="secondary"
        size="sm"
        type="button"
        onPress={onEdit}
      >
        <Icon name="general/edit-01" />
      </IconButton>
    </div>
  );
}
