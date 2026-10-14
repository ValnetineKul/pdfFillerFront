import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  popoverSlide: {
    from: { transform: 'var(--popover-slide-position)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  modalOverlayFade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  modalContentShow: {
    from: { transform: 'translateY(30px) scale(0.96)', opacity: 0 },
    to: { transform: 'translateY(0) scale(1)', opacity: 1 },
  },
  caretBlink: {
    '0%,70%,100%': { opacity: 1 },
    '20%,50%': { opacity: 0 },
  },
  rotate: { '100%': { transform: 'rotate(360deg)' } },
  dashCircle: {
    '0%': { strokeDasharray: '1, 150', strokeDashoffset: 0 },
    '50%': { strokeDasharray: '90, 150', strokeDashoffset: '-35' },
    '100%': { strokeDasharray: '90, 150', strokeDashoffset: '-124' },
  },
  drawerBottomSlide: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)' },
  },
  drawerTopSlide: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(-100%)' },
  },
  drawerRightSlide: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(100%)' },
  },
  drawerLeftSlide: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-100%)' },
  },
  glowPulse: {
    '40%, 60%': {
      opacity: 1,
    },
    '0%, 100%': {
      opacity: 0,
    },
  },
});
