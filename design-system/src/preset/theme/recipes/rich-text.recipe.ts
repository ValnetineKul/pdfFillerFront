import { defineRecipe } from '@pandacss/dev';

export const richTextRecipe = defineRecipe({
  className: 'rich-text',
  base: {
    textStyle: 'md',
    color: 'text.primary',
    '& p': {
      marginBottom: '2',
    },
    '& a': {
      color: 'link.default.fg',
      textDecoration: 'underline',
      _hover: {
        color: 'link.default.fgHover',
        textDecoration: 'none',
        cursor: 'pointer',
      },
    },
    '& strong': {
      fontWeight: 'bold',
    },
    '& em': {
      fontStyle: 'italic',
    },
    '& u': {
      textDecoration: 'underline',
    },
    '& s': {
      textDecoration: 'line-through',
    },
    '& blockquote': {
      position: 'relative',
      display: 'inline-block',
      color: 'text.primary',
      fontWeight: 'semibold',
      fontStyle: 'italic',
      textStyle: 'md',
      marginBottom: '2',
      borderLeftWidth: '0.5',
      borderLeftStyle: 'solid',
      borderLeftColor: 'fg.brand.primary',
      paddingLeft: '3.5',
      paddingBlock: '2',
    },
    '& ul': {
      listStyleType: 'disc',
      paddingLeft: '5',
      marginTop: '6',
      marginBottom: '6',
      '& ul, & ol': { marginTop: '0', marginBottom: '0', paddingLeft: '4' },
    },
    '& ol': {
      listStyleType: 'decimal',
      paddingLeft: '5',
      marginTop: '6',
      marginBottom: '6',
      '& ul, & ol': { marginTop: '0', marginBottom: '0', paddingLeft: '4' },
    },
    '& li': {},
    '& pre': {
      padding: '4',
      borderRadius: '2',
      overflowX: 'auto',
      fontFamily: 'mono',
      textStyle: 'md',
      color: 'text.primary',
      background: 'background.tertiary',
      marginBottom: '4',
      display: 'block',
      '& code': {
        padding: '0',
        borderRadius: '0',
        background: 'initial',
      },
    },
    '& code': {
      display: 'inline-block',
      marginBottom: '2',
      padding: '2',
      borderRadius: '2',
      fontFamily: 'mono',
      textStyle: 'md',
      color: 'text.primary',
      background: 'background.tertiary',
    },
    '& table': {
      width: 'full',
      marginBottom: '4',
      borderRadius: '2',
      marginTop: '4',
      borderWidth: 'thin',
      borderStyle: 'solid',
      borderColor: 'border.secondary',
      color: 'text.tertiary',
    },
    '& th, & td': {
      borderYWidth: 'thin',
      borderStyle: 'solid',
      borderYColor: 'border.secondary',
      padding: '2',
      textAlign: 'left',
    },
    '& th': {
      backgroundColor: 'background.secondary',
      fontWeight: 'semibold',
    },
    '& hr': {
      border: 'none',
      borderTopWidth: 'thin',
      borderTopStyle: 'solid',
      borderColor: 'border.secondary',
      marginBlock: '3',
      display: 'block',
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: '4',
      marginBottom: '5',
      fontWeight: 'semibold',
      color: 'text.primary',
    },
    '& h1': {
      marginTop: '12',
      marginBottom: '6',
      textStyle: 'display.xl',
      w748: { textStyle: 'display.xxl' },
    },
    '& h2': {
      marginTop: '10',
      marginBottom: '5',
      textStyle: 'display.lg',
      w748: { textStyle: 'display.xl' },
    },
    '& h3': {
      marginTop: '8',
      marginBottom: '4',
      textStyle: 'display.md',
      w748: { textStyle: 'display.lg' },
    },
    '& h4': {
      marginTop: '5',
      marginBottom: '3',
      textStyle: 'display.md',
    },
    '& h5': { marginBottom: '3', textStyle: 'display.sm' },
    '& h6': { marginBottom: '2', textStyle: 'display.xs' },
    '& img': {
      maxWidth: 'full',
      height: 'auto',
      display: 'block',
      marginBlock: '12',
      borderRadius: '2.5',
    },
    '& iframe': {
      width: 'full',
      maxWidth: 'full',
      aspectRatio: '16/9',
      border: 'none',
      marginBlock: '4',
    },
  },
  variants: {
    textAlign: {
      left: {
        '& h1, & h2, & h3, & h4, & h5, & h6, & p, & span': {
          textAlign: 'left',
        },
      },
      center: {
        '& h1, & h2, & h3, & h4, & h5, & h6, & p, & span': {
          textAlign: 'center',
        },
      },
      right: {
        '& h1, & h2, & h3, & h4, & h5, & h6, & p, & span': {
          textAlign: 'right',
        },
      },
    },
    fontSize: {
      sm: {
        textStyle: 'sm',
      },
      md: {
        textStyle: 'md',
      },
      lg: {
        textStyle: 'lg',
      },
    },
  },
  defaultVariants: {
    textAlign: 'left',
    fontSize: 'md',
  },
  staticCss: ['*'],
});
