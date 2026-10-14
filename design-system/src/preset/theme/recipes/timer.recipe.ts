import { defineSlotRecipe } from '@pandacss/dev';

export const timerRecipe = defineSlotRecipe({
  className: 'timer',
  slots: [
    'root',
    'colon',
    'unitWrapper',
    'timeUnitWrapper',
    'timeWrapper',
    'unit',
    'unitTitle',
    'unstyled',
  ],
  base: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2',
    },
    colon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '1',
      color: 'text.secondary',
    },
    timeWrapper: {
      display: 'flex',
    },
    unitWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'background.secondary',
      flexDirection: 'column',
    },
    timeUnitWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    unstyled: {
      color: 'text.secondary',
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    unit: {
      color: 'text.secondary',
      fontWeight: 'bold',
    },
    unitTitle: {
      color: 'text.quarterary',
      fontWeight: 'normal',
      textAlign: 'center',
    },
  },
  variants: {
    variant: {
      big: {
        colon: { height: '7', textStyle: 'lg', fontWeight: 'bold' },
        timeWrapper: {
          backgroundColor: 'background.secondary',
          borderColor: 'border.secondary',
          borderWidth: 'thin',
          borderRadius: 'timer.big',
          padding: '2',
          boxShadow: 'xs',
        },
        timeUnitWrapper: {
          minWidth: '10.5',
        },
        unitWrapper: {
          padding: '2',
          minWidth: '15',
          borderColor: 'border.secondary',
          borderWidth: 'thin',
          borderRadius: 'timer.big',
          boxShadow: 'xs',
        },
        unit: {
          textStyle: 'xl',
        },
        unitTitle: {
          textStyle: 'xs',
        },
      },
      small: {
        root: {
          gap: '1',
        },
        colon: { height: '5', textStyle: 'sm', fontWeight: 'semibold' },
        timeWrapper: {
          backgroundColor: 'background.secondary',
          borderColor: 'border.secondary',
          borderWidth: 'thin',
          borderRadius: 'timer.small',
          padding: '1',
          boxShadow: 'xs',
        },
        timeUnitWrapper: {
          minWidth: '6.5',
        },
        unitWrapper: {
          padding: '1',
          minWidth: '9',
          borderColor: 'border.secondary',
          borderWidth: 'thin',
          borderRadius: 'timer.small',
          boxShadow: 'xs',
        },
        unit: {
          textStyle: 'sm',
          fontWeight: 'semibold',
        },
        unitTitle: {
          textStyle: 'xxs',
        },
      },
      solid: {
        root: {
          width: 'fit',
          backgroundColor: 'background.secondary',
          borderColor: 'border.secondary',
          borderWidth: 'thin',
          borderRadius: 'timer.solid',
          padding: '2',
          boxShadow: 'xs',
        },
        timeWrapper: {
          gap: '2',
        },
        colon: { height: '7', textStyle: 'lg', fontWeight: 'bold' },
        unit: { textStyle: 'xl' },
        unitTitle: {
          textStyle: 'xs',
        },
      },
      text: {},
    },
    transparent: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: ['big', 'small'],
      transparent: true,
      css: {
        unitWrapper: { backgroundColor: 'timer.bgTransparent' },
        timeWrapper: { backgroundColor: 'timer.bgTransparent' },
      },
    },
    {
      variant: 'solid',
      transparent: true,
      css: {
        root: { backgroundColor: 'timer.bgTransparent' },
        unitWrapper: { backgroundColor: 'transparent' },
      },
    },
  ],
  defaultVariants: {
    variant: 'text',
  },
  staticCss: ['*'],
});
