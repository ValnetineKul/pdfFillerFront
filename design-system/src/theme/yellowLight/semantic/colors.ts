import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  button: {
    primary: {
      default: {
        border: { value: '{colors.brand.500}' },
        borderHover: { value: '{colors.brand.600}' },
        fg: { value: '{colors.grayLight.800}' },
        fgHover: { value: '{colors.grayLight.800}' },
        bg: { value: '{colors.brand.500}' },
        bgHover: { value: '{colors.brand.600}' },
        bgPressed: { value: '{colors.brand.700}' },
      },
      error: {
        border: { value: '{colors.error.600}' },
        borderHover: { value: '{colors.error.700}' },
        bg: { value: '{colors.error.600}' },
        bgHover: { value: '{colors.error.700}' },
        fg: { value: '{colors.white}' },
        fgHover: { value: '{colors.white}' },
        bgPressed: { value: '{colors.error.800}' },
      },
      disabled: {
        border: { value: '{colors.grayLight.300}' },
        bg: { value: '{colors.grayLight.100}' },
        fg: { value: '{colors.grayLight.400}' },
      },
    },
    secondary: {
      default: {
        border: { value: '{colors.brand.300}' },
        borderHover: { value: '{colors.brand.300}' },
        borderFocus: { value: '{colors.brand.400}' },
        borderPressed: { value: '{colors.brand.300}' },
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.brand.50}' },
        bgFocus: { value: '{colors.white}' },
        fg: { value: '{colors.brand.700}' },
        fgHover: { value: '{colors.brand.800}' },
        fgFocus: { value: '{colors.brand.700}' },
        fgPressed: { value: '{colors.brand.700}' },
        bgPressed: { value: '{colors.brand.100}' },
      },
      pale: {
        border: { value: '{colors.grayLight.300}' },
        borderHover: { value: '{colors.grayLight.300}' },
        borderPressed: { value: '{colors.grayLight.300}' },
        borderFocus: { value: '{colors.grayLight.400}' },
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgFocus: { value: '{colors.white}' },
        bgPressed: { value: '{colors.grayLight.100}' },
        fg: { value: '{colors.grayLight.700}' },
        fgHover: { value: '{colors.grayLight.800}' },
        fgPressed: { value: '{colors.grayLight.700}' },
        fgFocus: { value: '{colors.grayLight.700}' },
      },
      error: {
        border: { value: '{colors.error.300}' },
        borderHover: { value: '{colors.error.300}' },
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.error.50}' },
        fg: { value: '{colors.error.700}' },
        fgHover: { value: '{colors.error.800}' },
        bgPressed: { value: '{colors.error.100}' },
        borderPressed: { value: '{colors.error.300}' },
      },
      disabled: {
        border: { value: '{colors.grayLight.300}' },
        fg: { value: '{colors.grayLight.400}' },
      },
    },
    tertiary: {
      default: {
        fg: { value: '{colors.brand.700}' },
        fgHover: { value: '{colors.brand.700}' },
        bgHover: { value: '{colors.brand.50}' },
        bgPressed: { value: '{colors.brand.100}' },
        fgPressed: { value: '{colors.brand.700}' },
        fgFocus: { value: '{colors.brand.800}' },
      },
      pale: {
        fg: { value: '{colors.grayLight.600}' },
        fgHover: { value: '{colors.grayLight.700}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgPressed: { value: '{colors.grayLight.100}' },
        fgPressed: { value: '{colors.grayLight.800}' },
        fgFocus: { value: '{colors.grayLight.600}' },
      },
      error: {
        fg: { value: '{colors.error.700}' },
        fgHover: { value: '{colors.error.800}' },
        bgHover: { value: '{colors.error.50}' },
        bgPressed: { value: '{colors.error.100}' },
        fgPressed: { value: '{colors.error.800}' },
      },
      disabled: {
        fg: { value: '{colors.grayLight.400}' },
      },
    },
  },
  fg: {
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.500}' },
      },
    },
  },
  link: {
    default: {
      fg: { value: '{colors.brand.600}' },
      fgHover: { value: '{colors.brand.700}' },
    },
  },

  bonusCardText: {
    darkMain: {
      title: { value: '{colors.grayLight.900}' },
      description: { value: '{colors.grayLight.600}' },
    },
    lightMain: {
      title: { value: '{colors.grayLight.25}' },
      description: { value: '{colors.grayLight.300}' },
    },
    darkBrand: {
      title: { value: '{colors.brand.800}' },
      description: { value: '{colors.brand.600}' },
    },
    lightBrand: {
      title: { value: '{colors.brand.400}' },
      description: { value: '{colors.brand.600}' },
    },
  },
  removeButton: {
    dark: {
      color: { value: '{colors.grayLight.400}' },
      colorHover: { value: '{colors.grayLight.500}' },
      bgHover: { value: '{colors.grayLight.100}' },
    },
  },
  badge: {
    dark: {
      color: { value: '{colors.grayLight.50}' },
      fg: { value: '{colors.grayLight.300}' },
      bg: { value: '{colors.grayLight.900}' },
      border: { value: '{colors.grayLight.700}' },
      borderOutline: { value: '{colors.grayLight.200}' },
    },
  },
  tab: {
    basic: {
      default: {
        scrollButtonsBg: { value: '{colors.grayNeutral.100}' },
      },
    },
    modern: {
      default: {
        fg: { value: '{colors.grayLight.500}' },
        bg: { value: '{colors.white}' },
        border: { value: '{colors.grayLight.300}' },
        fgHover: { value: '{colors.brand.700}' },
        bgHover: { value: '{colors.brand.50}' },
        borderHover: { value: '{colors.brand.300}' },
        fgFocus: { value: '{colors.grayLight.500}' },
        focus: {
          bg: { value: '{colors.white}' },
        },
        borderFocus: { value: '{colors.grayLight.300}' },
      },
      current: {
        fg: { value: '{colors.brand.700}' },
        bg: { value: '{colors.brand.50}' },
        border: { value: '{colors.brand.300}' },
        fgHover: { value: '{colors.brand.700}' },
        bgHover: { value: '{colors.brand.50}' },
        borderHover: { value: '{colors.brand.300}' },
        fgFocus: { value: '{colors.brand.700}' },
        bgFocus: { value: '{colors.brand.50}' },
        borderFocus: { value: '{colors.brand.300}' },
      },
    },
  },
  tooltip: {
    default: {
      bg: { value: '{colors.grayLight.50}' },
    },
  },
  disclosure: {
    bg: {
      DEFAULT: { value: '{colors.white}' },
      hover: { value: '{colors.grayLight.50}' },
      focus: { value: '{colors.white}' },
      pressed: { value: '{colors.grayLight.100}' },
      disabled: { value: '{colors.grayLight.50}' },
    },
    text: {
      DEFAULT: { value: '{colors.grayLight.900}' },
      hover: { value: '{colors.grayLight.900}' },
      focus: { value: '{colors.grayLight.900}' },
      pressed: { value: '{colors.grayLight.900}' },
      disabled: { value: '{colors.grayLight.400}' },
    },
    icon: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      hover: { value: '{colors.grayLight.400}' },
      focus: { value: '{colors.grayLight.400}' },
      pressed: { value: '{colors.grayLight.500}' },
      disabled: { value: '{colors.grayLight.300}' },
    },
    description: { value: '{colors.grayLight.600}' },
  },
});
