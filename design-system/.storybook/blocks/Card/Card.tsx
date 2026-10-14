import type { FC } from 'react';

import { Description, IconWrapper, Item, Title } from './CardList.styled';
import type { CardType } from './types';

export const Card: FC<CardType> = (props) => {
  const { title, description, href, icon } = props;
  return (
    <Item href={href}>
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Item>
  );
};
