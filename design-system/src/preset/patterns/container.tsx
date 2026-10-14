import { definePattern } from '@pandacss/dev';

export const container = definePattern({
  description: 'A major container for content',

  transform(props) {
    return {
      position: 'relative',
      maxWidth: '320',
      mx: 'auto',
      px: '4',
      w768: {
        px: '8',
      },
      ...props,
    };
  },
});
