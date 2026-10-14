import { Radio, RadioGroup } from '@/design-system';
import { radioRowClass } from '@/ui/styles';

export function SponsorChoice({
  sponsored,
  onSponsored,
}: {
  sponsored: string;
  onSponsored: (value: string) => void;
}) {
  return (
    <RadioGroup
      label="Поездку спонсируют"
      value={sponsored === 'yes' ? 'yes' : 'no'}
      onChange={onSponsored}
    >
      <div className={radioRowClass}>
        <Radio value="yes">Да</Radio>
        <Radio value="no">Нет</Radio>
      </div>
    </RadioGroup>
  );
}
