import { defineSlotRecipe } from '@pandacss/dev';

export const tabBarRecipe = defineSlotRecipe({
  className: 'tab-bar',
  slots: ['list', 'item', 'subIcon'],
  base: {
    list: {
      width: 'full',
      display: 'flex',
      backgroundColor: 'background.primary',
    },
    item: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      gap: '1.5',
      paddingBlockEnd: '2',
      alignItems: 'center',
      textAlign: 'center',
      textStyle: 'xxs',
      color: 'tabBar.fg',
      cursor: 'pointer',
      outline: 'none',
      position: 'relative',
      '& > svg': {
        stroke: 'currentColor',
      },
      _before: {
        content: '""',
        width: '10',
        height: '0.5',
        borderRadius: 'tabBar.item.before',
        backgroundColor: 'transparent',
      },
      _selected: {
        color: 'fg.brand.primary',
        _before: {
          backgroundColor: 'fg.brand.primary',
          boxShadow: 'custom.glow.lg',
        },
      },
    },
    subIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'fg.error.secondary',
      height: '2',
      width: '2',
      top: '2',
      left: '50%',
      transform: 'translateX(8px)',
    },
  },
  staticCss: ['*'],
});
