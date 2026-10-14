import type { FC, ReactNode } from 'react';

import { ContentWrapper, Title } from './HeroContent.styled';

export const HeroContent: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <ContentWrapper>
      <Title>{title}</Title>
      {children}
    </ContentWrapper>
  );
};
