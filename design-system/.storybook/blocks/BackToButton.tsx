import { BackIcon } from '@storybook/icons';
import type { FC } from 'react';
import { Link } from 'storybook/internal/components';

export const BackToButton: FC<{ href?: string }> = ({ href }) => {
  return (
    <Link href={href}>
      <BackIcon /> Вернуться в начало
    </Link>
  );
};
