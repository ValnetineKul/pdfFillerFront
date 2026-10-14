import { Icon } from '@front/icons';
import type { ReactElement, ReactNode } from 'react';
import type { GroupProps } from 'react-aria-components';
import { DateInput, DateSegment, Group, Label } from 'react-aria-components';

import { css } from '#styled-system/css';
import { multiMonthCalendarPickerRecipe } from '#styled-system/recipes';

type CalendarVerticalPickerProps = {
  label?: string;
  separator?: ReactNode;
  groupProgress?: GroupProps;
};

export const MultiMonthCalendarPickerGroup = ({
  label,
  separator = '—',
  groupProgress,
}: CalendarVerticalPickerProps): ReactElement => {
  const recipe = multiMonthCalendarPickerRecipe({
    clickable: !!groupProgress?.onClick,
  });

  return (
    <div className={recipe.root}>
      {label && <Label>{label}</Label>}
      <Group className={recipe.wrapper} {...groupProgress}>
        <Icon name="time/calendar" className={css({ iconSize: 'md' })} />
        <DateInput className={recipe.input} slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">{separator}</span>
        <DateInput className={recipe.input} slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
      </Group>
    </div>
  );
};
