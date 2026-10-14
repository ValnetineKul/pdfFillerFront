import type { ReactNode } from 'react';
import { Fragment } from 'react';

import type { timerRecipe } from '#styled-system/recipes';

import type { Unit } from './utils';

type TimerUnitsProps = {
  units: Array<Unit>;
  classNames: ReturnType<typeof timerRecipe>;
  wrapper: 'unitWrapper' | 'timeUnitWrapper';
  showColonBetween?: boolean;
  showColonAfterLast?: boolean;
};

export function TimerUnits({
  units,
  classNames,
  wrapper,
  showColonBetween = false,
  showColonAfterLast = false,
}: TimerUnitsProps): ReactNode {
  return units.map((unit, index) => {
    const isLast = index === units.length - 1;
    const showColon = isLast ? showColonAfterLast : showColonBetween;

    return (
      <Fragment key={unit.key}>
        <div className={classNames[wrapper]}>
          <span className={classNames.unit}>{unit.value}</span>
          <span className={classNames.unitTitle}>{unit.title}</span>
        </div>
        {showColon && <span className={classNames.colon}>:</span>}
      </Fragment>
    );
  });
}
