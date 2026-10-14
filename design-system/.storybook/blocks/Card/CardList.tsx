import type { FC } from 'react';
import { ResetWrapper } from 'storybook/internal/components';

import { Card } from './Card';
import { List } from './CardList.styled';
import type { CardListProps } from './types';

export const CardList: FC<CardListProps> = (props) => {
  const { listOfCards } = props;
  return (
    <ResetWrapper>
      {
        <List className="sb-unstyled">
          {listOfCards.map((cardProps) => (
            <Card key={cardProps.id} {...cardProps} />
          ))}
        </List>
      }
    </ResetWrapper>
  );
};
