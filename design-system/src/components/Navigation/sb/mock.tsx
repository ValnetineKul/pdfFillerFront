import { Icon } from '@front/icons';
import type { ReactNode } from 'react';

export const ITEMS = [
  {
    id: 1,
    name: 'Personal info',
    icon: <Icon name="map-and-travel/ticket-01" />,
    badge: 3,
    dot: true,
    addon: <Icon name="arrows/chevron-selector-vertical" />,
    children: [],
  },
  {
    id: 2,
    name: 'Safety',
    icon: <Icon name="alerts-and-feedback/alert-triangle" />,
    url: '/safety',
    children: [],
  },
  {
    id: 3,
    name: 'Payment',
    icon: <Icon name="casino/roulette" />,
    children: [],
  },
  {
    id: 4,
    name: 'Bet history',
    icon: <Icon name="casino/dice-6" />,
    children: [],
  },
  {
    id: 5,
    name: 'Log out',
    icon: <Icon name="time/clock" />,
    dot: true,
    action: 'log-out',
    children: [],
  },
];

export interface TreeItem {
  id: number;
  name: string;
  icon?: ReactNode;
  badge?: number;
  dot?: boolean;
  url?: string;
  action?: string;
  children?: Array<TreeItem>;
}

export const EXPANDED_ITEMS: Array<TreeItem> = [
  {
    id: 1,
    name: 'Personal info',
    icon: <Icon name="map-and-travel/ticket-01" />,
    badge: 3,
    dot: true,
    children: [
      {
        id: 6,
        name: 'Contacts',
        children: [],
      },
      {
        id: 7,
        name: 'Sumsub',
        children: [],
      },
      {
        id: 8,
        name: 'Verification',
        action: 'verification',
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Safety',
    icon: <Icon name="alerts-and-feedback/alert-triangle" />,
    url: '/safety',
    children: [],
  },
  {
    id: 3,
    name: 'Payment',
    icon: <Icon name="casino/roulette" />,
    children: [
      {
        id: 9,
        name: 'Deposit',
        children: [],
      },
      {
        id: 10,
        name: 'Withdrawal',
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: 'Bet history',
    icon: <Icon name="casino/dice-6" />,
    children: [],
  },
  {
    id: 5,
    name: 'Log out',
    icon: <Icon name="time/clock" />,
    action: 'log-out',
    children: [],
  },
];
