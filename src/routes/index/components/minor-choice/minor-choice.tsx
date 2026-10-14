import { Checkbox } from '@/design-system';
import { formClass, subtitleClass } from '@/ui/styles';

export function MinorChoice({
  minor,
  onMinor,
}: {
  minor: string;
  onMinor: (value: string) => void;
}) {
  return (
    <div className={formClass}>
      <Checkbox isSelected={minor === 'yes'} onChange={(selected) => onMinor(selected ? 'yes' : 'no')}>
        Несовершеннолетний
      </Checkbox>
      {minor === 'yes' ? (
        <p className={subtitleClass}>
          Фамилия и имя обоих родителей — как в загранпаспорте, плюс телефон и почта.
          Адрес нужен, только если родитель живёт не там, где ребёнок.
        </p>
      ) : null}
    </div>
  );
}
