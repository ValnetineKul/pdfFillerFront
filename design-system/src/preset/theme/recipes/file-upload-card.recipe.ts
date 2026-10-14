import { defineSlotRecipe } from '@pandacss/dev';

export const fileUploadCardRecipe = defineSlotRecipe({
  className: 'file-upload-card',
  slots: [
    'root',
    'actionsWrapper',
    'infoWrapper',
    'loader',
    'fileName',
    'fileMeta',
    'mobileInfoBlock',
    'topBlock',
    'desktopLeftBlock',
    'mobileFileIcon',
    'desktopFileIcon',
    'fileNameHead',
    'fileNameTail',
    'mobileInfoWrapper',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'fileUploadCard.root',
      outlineWidth: 'thin',
      outlineColor: 'border.secondary',
      outlineStyle: 'solid',
      backgroundColor: 'background.primary',
      p: '4',
      gap: '2',
      w: 'full',
      containerType: 'inline-size',
    },
    topBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '7',
      alignItems: 'center',
      minWidth: 0,
    },
    actionsWrapper: {
      display: 'flex',
      gap: '3',
      alignItems: 'center',
      flexShrink: 0,
      flexGrow: 0,
    },
    desktopLeftBlock: {
      gap: '3',
      maxWidth: '80%',
      minWidth: 0,
      flex: '1 1 auto',
      display: 'none',
      '@container (min-width: token(sizes.80))': {
        display: 'flex',
      },
    },
    infoWrapper: {
      maxWidth: '100%',
      flexDirection: 'column',
      textStyle: 'sm',
      w: 'full',
      minWidth: 0,
      flexShrink: 1,
      overflow: 'hidden',
      display: 'none',
      '@container (min-width: token(sizes.80))': {
        display: 'flex',
      },
    },
    mobileInfoWrapper: {
      flexDirection: 'column',
      textStyle: 'sm',
      w: 'full',
      minWidth: 0,
      flexShrink: 1,
      overflow: 'hidden',
      display: 'flex',
      '@container (min-width: token(sizes.80))': {
        display: 'none',
      },
    },
    loader: {
      display: 'flex',
      w: '4',
      h: '4',
    },
    fileName: {
      display: 'flex',
      color: 'text.secondary',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    fileNameHead: {
      minWidth: '0',
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    fileNameTail: {
      display: 'inline',
    },
    fileMeta: { color: 'text.tertiary' },
    mobileInfoBlock: {
      display: 'flex',
      '@container (min-width: token(sizes.80))': {
        display: 'none',
      },
    },

    desktopFileIcon: {
      display: 'none',
      '@container (min-width: token(sizes.80))': {
        display: 'flex',
      },
    },
    mobileFileIcon: {
      display: 'flex',
      '@container (min-width: token(sizes.80))': {
        display: 'none',
      },
    },
  },
  staticCss: ['*'],
});
