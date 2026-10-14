import { styled } from 'storybook/theming';

export const Title = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s3,
  color: theme.color.defaultText,
  marginBottom: 8,
  lineHeight: 1.6,
  fontWeight: 600,
}));

export const IconWrapper = styled.div({
  marginBottom: 8,
  padding: 3,
  '& svg': {
    height: '24px',
    width: '24px',
  },
});

export const Description = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s2,
  color: theme.color.defaultText,
  lineHeight: 1.4,
}));

export const Item = styled.a({
  backgroundColor: '#f9f5ff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#ece3fa',
  },
  '&:active': {
    backgroundColor: '#efe8f9',
  },
});

export const List = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(33%, 1fr))',
  gap: '16px',
  width: '100%',
});
