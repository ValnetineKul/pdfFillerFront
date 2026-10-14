import { styled } from 'storybook/theming';

export const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const Category = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const Title = styled.div(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s3,
  color: theme.color.defaultText,
  fontWeight: 600,
  lineHeight: 1.6,
  textTransform: 'capitalize',
}));

export const ColorsRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

export const TooltipContent = styled.span({
  fontSize: '14px',
  lineHeight: '20px',
  padding: '8px',
});

export const Color = styled.button({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  textAlign: 'center',
  width: '100%',
  cursor: 'pointer',
});

export const ColorBox = styled.div({
  width: '100%',
  height: '64px',
  backgroundImage:
    'linear-gradient(to right, var(--hex), var(--hex)), repeating-linear-gradient(0, rgb(0, 0, 0, 0.1), rgb(255, 255, 255, 0) 1px, rgb(255, 255, 255, 0.1) 1px, rgb(255, 255, 255, 0.1) 8px)',
});

export const ColorTitle = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '4px',
  fontFamily: theme.typography.fonts.base,
}));
