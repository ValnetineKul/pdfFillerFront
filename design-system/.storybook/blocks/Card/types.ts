import type { ReactElement } from 'react';

export type CardType = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  icon?: ReactElement;
};

export type CardListProps = {
  listOfCards: Array<CardType>;
  isInline: boolean;
};
