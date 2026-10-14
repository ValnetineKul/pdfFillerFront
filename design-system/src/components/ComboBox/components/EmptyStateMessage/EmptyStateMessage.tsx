import { Icon } from '@front/icons';
import type { ReactElement } from 'react';

import { comboboxRecipe } from '#styled-system/recipes';

import { FeaturedIcon } from '../../../FeaturedIcon';

type EmptyStateMessageProps = { emptyStateText?: string };

const classNames = comboboxRecipe();

export function EmptyStateMessage(props: EmptyStateMessageProps): ReactElement {
  return (
    <div className={classNames.emptyState}>
      <FeaturedIcon size="lg" colorScheme="secondary" type="modern">
        <Icon name="general/not-found" />
      </FeaturedIcon>
      <div className={classNames.emptyStateText}>{props.emptyStateText}</div>
    </div>
  );
}
