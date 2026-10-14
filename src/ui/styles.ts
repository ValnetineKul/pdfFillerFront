import { css } from '#styled-system/css';

export const pageClass = css({
  minHeight: '100vh',
  backgroundColor: 'grayLight.50',
  color: 'grayLight.900',
});

export const shellClass = css({
  width: '100%',
  maxWidth: '880px',
  marginInline: 'auto',
  padding: '32px 20px 64px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const cardClass = css({
  backgroundColor: 'white',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'grayLight.200',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const titleClass = css({
  fontSize: '30px',
  lineHeight: '38px',
  fontWeight: '600',
  margin: '0',
});

export const subtitleClass = css({
  fontSize: '14px',
  lineHeight: '20px',
  color: 'grayLight.600',
  margin: '0',
});

export const formClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const rowClass = css({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: { base: '1fr', w768: '1fr 1fr' },
});

export const wideFieldClass = css({
  gridColumn: '1 / -1',
});

export const blocksClass = css({
  display: 'flex',
  flexDirection: 'column',
  '& button[slot="trigger"] > span:first-child': {
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: '600',
  },
  '& [data-complete="true"] button[slot="trigger"] > span:first-child::after': {
    content: '"✓"',
    marginLeft: '8px',
    color: 'success.600',
    fontWeight: '600',
  },
  '& [data-complete="false"] button[slot="trigger"]': {
    pointerEvents: 'none',
    cursor: 'default',
  },
  '& [data-complete="false"] button[slot="trigger"] > span:last-child': {
    opacity: '0.35',
  },
});

export const blockWrapClass = css({
  position: 'relative',
});

export const blockLoaderClass = css({
  position: 'absolute',
  inset: '0',
  zIndex: '2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(1px)',
});

export const lockedFieldClass = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  minWidth: '0',
  '& > :first-child': {
    flex: '1',
    minWidth: '0',
  },
  '& > button': {
    marginTop: '26px',
    flexShrink: '0',
  },
});

export const lockedChoiceClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& > :first-child': {
    flex: '1',
    minWidth: '0',
  },
});

export const radioRowClass = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '16px',
});

export const headerClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
});

export const countryValueClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
});

export const flagClass = css({
  fontSize: '18px',
  lineHeight: '1',
});

export const noticeClass = css({
  fontSize: '14px',
  lineHeight: '20px',
  color: 'grayLight.700',
  backgroundColor: 'grayLight.50',
  borderRadius: '8px',
  padding: '12px',
  margin: '0',
});

export const errorClass = css({
  fontSize: '14px',
  lineHeight: '20px',
  color: 'error.700',
  margin: '0',
});

export const fieldListClass = css({
  display: 'grid',
  gap: '8px 16px',
  margin: '0',
  gridTemplateColumns: { base: '1fr', w768: '1fr 1fr' },
});

export const fieldItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const fieldLabelClass = css({
  fontSize: '12px',
  lineHeight: '18px',
  color: 'grayLight.500',
});

export const fieldValueClass = css({
  minWidth: '0',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '600',
  whiteSpace: 'normal',
  overflowWrap: 'anywhere',
});

export const fieldValueRowClass = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '8px',
});

export const addressFieldClass = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '& > *': {
    width: '100%',
  },
  '& textarea': {
    minHeight: '96px',
    lineHeight: '24px',
    overflow: 'hidden',
    resize: 'none',
  },
});

export const addressSuggestionsClass = css({
  display: 'flex',
  flexDirection: 'column',
  margin: '0',
  padding: '4px',
  listStyle: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'grayLight.200',
  borderRadius: '8px',
  backgroundColor: 'white',
});

export const addressSuggestionClass = css({
  width: '100%',
  padding: '8px 12px',
  borderWidth: '0',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: 'grayLight.900',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  whiteSpace: 'normal',
  cursor: 'pointer',
  _hover: {
    backgroundColor: 'grayLight.50',
  },
});

export const dateFieldWrapClass = css({
  width: '100%',
  '& > *': {
    width: '100%',
  },
});

export const linkClass = css({
  color: 'brand.700',
  fontWeight: '600',
  textDecoration: 'none',
});
