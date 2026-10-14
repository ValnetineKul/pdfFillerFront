import { styled } from 'storybook/theming';

export const ContentWrapper = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s3,
  color: theme.color.defaultText,
  marginBottom: 24,
  lineHeight: 1.6,
  fontWeight: 600,
  backgroundColor: '#f9f5ff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '24px 32px',
}));

export const Title = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s3,
  color: theme.color.defaultText,
  marginBottom: 8,
  lineHeight: 1.6,
  fontWeight: 600,
}));
