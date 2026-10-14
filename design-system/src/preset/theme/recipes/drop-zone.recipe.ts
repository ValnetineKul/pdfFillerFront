import { defineSlotRecipe } from '@pandacss/dev';

export const dropZoneRecipe = defineSlotRecipe({
  className: 'drop-zone',
  slots: ['root', 'infoText', 'additionalText', 'dropZoneAction'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      w: 'full',
      paddingInline: '6',
      paddingBlock: '4',
      gap: '3',
      borderRadius: 'dropZone.root',
      backgroundColor: 'background.primary',
      alignItems: 'center',
      color: 'text.tertiary',
      fontWeight: 'normal',
      outlineWidth: 'thin',
      outlineColor: 'border.secondary',
      outlineStyle: 'solid',
      '&[data-disabled]': {
        cursor: 'not-allowed',
        backgroundColor: 'background.disabled.subtle',
        outlineColor: 'border.disabled.subtle',
      },
      '&[data-drop-target]': {
        outlineColor: 'border.brand.solid',
        outlineWidth: 'thick',
      },
    },
    dropZoneAction: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 1,
    },
    additionalText: {
      textStyle: 'sm',
    },
    infoText: {
      textStyle: 'xs',
      textAlign: 'center',
    },
  },
  staticCss: ['*'],
});
