import { Icon } from '@front/icons';

export const ITEMS = [
  {
    id: 1,
    icon: <Icon name="map-and-travel/navigation-pointer-01" />,
    label: 'Navigation',
    action: 'open-menu',
  },
  {
    id: 2,
    icon: <Icon name="casino/roulette" />,
    label: 'Casino',
    url: '/casino',
  },
  {
    id: 3,
    icon: <Icon name="finance-and-ecommerce/sale-01" />,
    label: 'Promo',
    url: '/promo',
  },
  {
    id: 4,
    icon: <Icon name="sports/Football" />,
    label: 'Sport',
    url: '/sport',
  },
  {
    id: 5,
    icon: <Icon name="communication/message-chat-circle" />,
    label: 'Chat',
    action: 'open-chat',
  },
  {
    id: 6,
    icon: <Icon name="users/user-01" />,
    label: 'Profile',
    url: '/account',
    subIcon: true,
  },
];
