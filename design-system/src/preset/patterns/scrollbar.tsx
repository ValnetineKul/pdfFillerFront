import { definePattern } from '@pandacss/dev';

export const scrollable = definePattern({
  description: 'A container that allows for scrolling',
  defaultValues: {
    direction: 'vertical',
    hideScrollbar: false,
  },
  properties: {
    direction: { type: 'enum', value: ['horizontal', 'vertical'] },
    hideScrollbar: { type: 'boolean' },
  },
  blocklist: ['overflow'],
  transform(props) {
    const { direction, hideScrollbar, ...rest } = props;

    return {
      overflow: 'auto',
      height: direction === 'horizontal' ? '100%' : 'auto',
      width: direction === 'vertical' ? '100%' : 'auto',
      '--webkit-overflow-scrolling': 'touch',

      '@supports not selector(::-webkit-scrollbar)': {
        scrollbarWidth: hideScrollbar ? 'noneValue' : 'thin',
        scrollbarColor: '{colors.background.quarterary} transparent',
      },

      '@supports selector(::-webkit-scrollbar)': {
        '&::-webkit-scrollbar': {
          height: '2',
          width: '2',
          display: hideScrollbar ? 'none' : 'initial',
        },

        '&::-webkit-scrollbar-thumb:vertical': {
          minHeight: '12',
        },

        '&::-webkit-scrollbar-thumb:horizontal': {
          minWidth: '12',
        },

        '&::-webkit-scrollbar-track ': {
          backgroundColor: 'transparent',
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '{colors.background.quarterary}',
          borderRadius: '2',
        },

        '&::-webkit-scrollbar-corner': {
          display: 'none',
        },

        '&::-webkit-scrollbar-button': {
          display: 'none',
        },
      },
      ...rest,
    };
  },
});
