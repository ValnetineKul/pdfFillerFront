import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  button: {
    primary: {
      default: {
        border: { value: '{colors.brand.600}' },
        borderHover: { value: '{colors.brand.700}' },
        borderPressed: { value: '{colors.brand.800}' },
        bg: { value: '{colors.brand.600}' },
        bgHover: { value: '{colors.brand.700}' },
        bgPressed: { value: '{colors.brand.800}' },
        pressed: { value: '{colors.brand.700}' },
      },
      error: {
        border: { value: '{colors.error.600}' },
        borderHover: { value: '{colors.error.700}' },
        borderPressed: { value: '{colors.error.800}' },
        bg: { value: '{colors.error.600}' },
        bgHover: { value: '{colors.error.700}' },
        bgPressed: { value: '{colors.error.800}' },
        fg: { value: '{colors.white}' },
        fgHover: { value: '{colors.white}' },
      },
      disabled: {
        border: { value: '{colors.grayBlue.800}' },
        bg: { value: '{colors.grayBlue.800}' },
        fg: { value: '{colors.grayBlue.500}' },
      },
    },
    secondary: {
      default: {
        border: { value: '{colors.brand.700}' },
        borderHover: { value: '{colors.brand.700}' },
        borderFocus: { value: '{colors.brand.800}' },
        borderPressed: { value: '{colors.brand.700}' },
        bg: { value: '{colors.grayBlue.950}' },
        bgHover: { value: '{colors.grayBlue.900}' },
        bgFocus: { value: '{colors.grayBlue.950}' },
        bgPressed: { value: '{colors.grayBlue.900}' },
        fg: { value: '{colors.brand.300}' },
        fgHover: { value: '{colors.brand.200}' },
        fgFocus: { value: '{colors.brand.300}' },
        fgPressed: { value: '{colors.brand.300}' },
      },
      pale: {
        border: { value: '{colors.grayBlue.700}' },
        borderHover: { value: '{colors.grayBlue.700}' },
        borderPressed: { value: '{colors.grayBlue.700}' },
        borderFocus: { value: '{colors.grayBlue.600}' },
        bg: { value: '{colors.grayBlue.900}' },
        bgHover: { value: '{colors.grayBlue.800}' },
        bgFocus: { value: '{colors.grayBlue.900}' },
        bgPressed: { value: '{colors.grayBlue.700}' },
        fg: { value: '{colors.grayBlue.100}' },
        fgHover: { value: '{colors.grayBlue.200}' },
        fgPressed: { value: '{colors.grayBlue.100}' },
        fgFocus: { value: '{colors.grayBlue.100}' },
      },
      error: {
        border: { value: '{colors.error.300}' },
        borderHover: { value: '{colors.error.300}' },
        borderPressed: { value: '{colors.error.400}' },
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.error.50}' },
        bgPressed: { value: '{colors.error.100}' },
        fg: { value: '{colors.error.700}' },
        fgHover: { value: '{colors.error.800}' },
      },
      disabled: {
        border: { value: '{colors.grayBlue.800}' },
        fg: { value: '{colors.grayBlue.500}' },
      },
    },
    tertiary: {
      default: {
        fg: { value: '{colors.brand.400}' },
        fgHover: { value: '{colors.brand.200}' },
        fgPressed: { value: '{colors.brand.300}' },
        fgFocus: { value: '{colors.brand.500}' },
        bgHover: { value: '{colors.brand.950}' },
        bgPressed: { value: '{colors.brand.900}' },
      },
      pale: {
        fg: { value: '{colors.grayBlue.400}' },
        fgHover: { value: '{colors.grayBlue.200}' },
        fgPressed: { value: '{colors.grayBlue.300}' },
        fgFocus: { value: '{colors.grayBlue.400}' },
        bgHover: { value: '{colors.grayBlue.800}' },
        bgPressed: { value: '{colors.grayBlue.900}' },
      },
      error: {
        fg: { value: '{colors.error.700}' },
        fgHover: { value: '{colors.error.800}' },
        fgPressed: { value: '{colors.error.900}' },
        bg: { value: '{colors.error.50}' },
        bgHover: { value: '{colors.error.100}' },
      },
      disabled: {
        fg: { value: '{colors.grayBlue.500}' },
      },
    },
  },
  featuredIcon: {
    brand: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.brand.600}' },
    },
    pale: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.grayLight.600}' },
    },
    error: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.error.600}' },
    },
    warning: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.warning.600}' },
    },
    success: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.success.600}' },
    },
    modern: {
      fg: { value: '{colors.white}' },
      border: { value: '{colors.grayLight.700}' },
    },
    teal: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.teal.500}' },
    },
    rose: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.rose.500}' },
    },
    purple: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.purple.500}' },
    },
    grayLight: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.grayLight.800}' },
    },
  },
  fg: {
    primary: { value: '{colors.white}' },
    white: { value: '{colors.white}' },
    secondary: {
      DEFAULT: { value: '{colors.grayBlue.300}' },
      hover: { value: '{colors.grayBlue.200}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayBlue.400}' },
      hover: { value: '{colors.grayBlue.300}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayBlue.400}' },
      hover: { value: '{colors.grayBlue.300}' },
    },
    quinary: {
      DEFAULT: { value: '{colors.grayBlue.25}' },
      hover: { value: '{colors.grayBlue.400}' },
    },
    senary: { value: '{colors.grayBlue.600}' },
    disabled: {
      DEFAULT: { value: '{colors.grayBlue.500}' },
      subtle: { value: '{colors.grayBlue.600}' },
    },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.300}' },
      },
      secondary: { value: '{colors.brand.500}' },
    },
  },

  background: {
    primary: {
      DEFAULT: { value: '{colors.grayBlue.950}' },
      alt: { value: '{colors.grayBlue.900}' },
      hover: { value: '{colors.grayBlue.800}' },
      pressed: { value: '{colors.grayBlue.700}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayBlue.900}' },
      alt: { value: '{colors.grayBlue.950}' },
      hover: { value: '{colors.grayBlue.800}' },
      pressed: { value: '{colors.grayBlue.700}' },
      subtle: { value: '{colors.grayBlue.900}' },
      solid: { value: '{colors.grayBlue.600}' },
    },
    tertiary: { value: '{colors.grayBlue.800}' },
    active: { value: '{colors.grayBlue.800}' },
    disabled: {
      DEFAULT: { value: '{colors.grayBlue.800}' },
      subtle: { value: '{colors.grayBlue.900}' },
    },
    overlay: { value: '{colors.grayBlue.800}' },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.800}' },
      },
      secondary: { value: '{colors.brand.600}' },
      solid: {
        DEFAULT: { value: '{colors.brand.600}' },
        hover: { value: '{colors.brand.500}' },
        pressed: { value: '{colors.brand.400}' },
      },
      section: {
        DEFAULT: { value: '{colors.brand.800}' },
        subtle: { value: '{colors.brand.950}' },
      },
    },
    error: {
      solid: {
        alt: { value: '{colors.error.600}' },
      },
    },
    quarterary: {
      value: '{colors.brand.700}',
    },
  },

  border: {
    primary: { value: '{colors.grayBlue.600}' },
    secondary: { value: '{colors.grayBlue.700}' },
    tertiary: { value: '{colors.grayBlue.800}' },
    brand: {
      DEFAULT: { value: '{colors.brand.400}' },
      solid: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.700}' },
      },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayBlue.700}' },
      subtle: { value: '{colors.grayBlue.800}' },
    },
  },

  text: {
    primary: {
      DEFAULT: { value: '{colors.grayBlue.50}' },
      onBrand: { value: '{colors.grayBlue.50}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayBlue.200}' },
      hover: { value: '{colors.grayBlue.100}' },
      onBrand: { value: '{colors.brand.200}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayBlue.300}' },
      hover: { value: '{colors.grayBlue.300}' },
      onBrand: { value: '{colors.brand.400}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayBlue.400}' },
      onBrand: { value: '{colors.brand.400}' },
    },
    placeholder: {
      DEFAULT: { value: '{colors.grayBlue.400}' },
      subtle: { value: '{colors.grayBlue.700}' },
    },
    disabled: { value: '{colors.grayBlue.500}' },
    brand: {
      primary: { value: '{colors.grayBlue.50}' },
      secondary: { value: '{colors.brand.100}' },
      tertiary: {
        DEFAULT: { value: '{colors.brand.400}' },
        alt: { value: '{colors.grayBlue.50}' },
      },
    },
    error: {
      primary: { value: '{colors.error.600}' },
    },
  },
  link: {
    default: {
      fg: { value: '{colors.brand.300}' },
      fgHover: { value: '{colors.brand.200}' },
    },
    pale: {
      fg: { value: '{colors.grayBlue.400}' },
      fgHover: { value: '{colors.grayBlue.300}' },
    },
  },
  tag: {
    default: {
      bg: { value: '{colors.grayBlue.950}' },
      border: { value: '{colors.grayBlue.700}' },
      fg: { value: '{colors.grayBlue.300}' },
    },
    hover: {
      bg: { value: '{colors.grayBlue.900}' },
      border: { value: '{colors.grayBlue.600}' },
      fg: { value: '{colors.grayBlue.300}' },
    },
    pressed: {
      bg: { value: '{colors.grayBlue.800}' },
      border: { value: '{colors.grayBlue.600}' },
      fg: { value: '{colors.grayBlue.300}' },
    },
    selected: {
      bg: { value: '{colors.grayBlue.950}' },
      border: { value: '{colors.grayBlue.300}' },
      fg: { value: '{colors.grayBlue.300}' },
    },
  },
  tab: {
    basic: {
      default: {
        bg: { value: '{colors.transparent}' },
        bgHover: { value: '{colors.grayBlue.800}' },
        bgFocus: { value: '{colors.grayBlue.800}' },
        scrollButtonsBg: { value: '{colors.grayBlue.950}' },
      },
      current: {
        bg: { value: '{colors.grayBlue.800}' },
        bgHover: { value: '{colors.grayBlue.700}' },
        bgFocus: { value: '{colors.grayBlue.800}' },
      },
    },
    border: {
      bg: { value: '{colors.grayBlue.700}' },
      border: { value: '{colors.grayBlue.800}' },
      default: {
        bg: { value: '{colors.transparent}' },
        bgHover: { value: '{colors.grayBlue.800}' },
        bgFocus: { value: '{colors.grayBlue.800}' },
      },
      current: {
        bg: { value: '{colors.grayBlue.800}' },
        bgHover: { value: '{colors.grayBlue.700}' },
        bgFocus: { value: '{colors.grayBlue.800}' },
      },
    },
    modern: {
      default: {
        fg: { value: '{colors.grayBlue.400}' },
        bg: { value: '{colors.transparent}' },
        border: { value: '{colors.grayBlue.700}' },
        fgHover: { value: '{colors.brand.300}' },
        bgHover: { value: '{colors.brand.800}' },
        borderHover: { value: '{colors.brand.700}' },
        fgFocus: { value: '{colors.grayBlue.400}' },
        focus: {
          bg: { value: '{colors.grayBlue.950}' },
        },
        borderFocus: { value: '{colors.grayBlue.700}' },
      },
      current: {
        fg: { value: '{colors.brand.100}' },
        bg: { value: '{colors.brand.800}' },
        border: { value: '{colors.brand.700}' },
        fgHover: { value: '{colors.brand.100}' },
        bgHover: { value: '{colors.brand.800}' },
        borderHover: { value: '{colors.brand.700}' },
        fgFocus: { value: '{colors.brand.100}' },
        bgFocus: { value: '{colors.brand.800}' },
        borderFocus: { value: '{colors.brand.700}' },
      },
    },
  },
  modal: {
    bgOverlay: { value: '{colors.alphaLight.10}' },
  },
  gameCard: {
    bgOverlay: { value: '{colors.alphaDark.70}' },
  },
  timer: {
    bgTransparent: { value: '{colors.alphaDark.80}' },
  },
  navItem: {
    gray: {
      selected: {
        bg: { value: '{colors.grayBlue.800}' },
        color: { value: '{colors.grayBlue.200}' },
      },
    },
    teal: {
      hover: {
        bg: { value: '{colors.teal.900}' },
        color: { value: '{colors.teal.500}' },
      },
      pressed: {
        bg: { value: '{colors.teal.900}' },
        color: { value: '{colors.teal.500}' },
      },
      selected: {
        bg: { value: '{colors.teal.950}' },
        color: { value: '{colors.teal.500}' },
      },
    },
    rose: {
      hover: {
        bg: { value: '{colors.rose.900}' },
        color: { value: '{colors.rose.500}' },
      },
      pressed: {
        bg: { value: '{colors.rose.900}' },
        color: { value: '{colors.rose.500}' },
      },
      selected: {
        bg: { value: '{colors.rose.950}' },
        color: { value: '{colors.rose.500}' },
      },
    },
    purple: {
      hover: {
        bg: { value: '{colors.purple.900}' },
        color: { value: '{colors.purple.500}' },
      },
      pressed: {
        bg: { value: '{colors.purple.900}' },
        color: { value: '{colors.purple.500}' },
      },
      selected: {
        bg: { value: '{colors.purple.950}' },
        color: { value: '{colors.purple.500}' },
      },
    },
  },

  badge: {
    dark: {
      color: { value: '{colors.grayDark.900}' },
      fg: { value: '{colors.grayDark.700}' },
      bg: { value: '{colors.grayDark.100}' },
      border: { value: '{colors.grayDark.300}' },
      borderOutline: { value: '{colors.grayDark.700}' },
    },
    grayLight: {
      color: { value: '{colors.grayBlue.300}' },
      fg: { value: '{colors.grayBlue.500}' },
      bg: { value: '{colors.grayBlue.900}' },
      border: { value: '{colors.grayBlue.700}' },
    },
    brand: {
      color: { value: '{colors.grayBlue.300}' },
      fg: { value: '{colors.grayBlue.500}' },
      bg: { value: '{colors.grayBlue.950}' },
      border: { value: '{colors.grayBlue.800}' },
    },
    error: {
      color: { value: '{colors.error.300}' },
      bg: { value: '{colors.error.950}' },
      border: { value: '{colors.error.800}' },
    },
    success: {
      color: { value: '{colors.success.300}' },
      bg: { value: '{colors.success.950}' },
      border: { value: '{colors.success.800}' },
    },
    warning: {
      color: { value: '{colors.warning.300}' },
      bg: { value: '{colors.warning.950}' },
      border: { value: '{colors.warning.800}' },
    },
    pink: {
      color: { value: '{colors.pink.300}' },
      bg: { value: '{colors.pink.950}' },
      border: { value: '{colors.pink.800}' },
    },
    purple: {
      color: { value: '{colors.purple.300}' },
      bg: { value: '{colors.purple.950}' },
      border: { value: '{colors.purple.800}' },
    },
    blue: {
      color: { value: '{colors.blue.300}' },
      bg: { value: '{colors.blue.950}' },
      border: { value: '{colors.blue.800}' },
    },
    rose: {
      color: { value: '{colors.rose.300}' },
      bg: { value: '{colors.rose.950}' },
      border: { value: '{colors.rose.800}' },
    },
    teal: {
      color: { value: '{colors.teal.300}' },
      bg: { value: '{colors.teal.950}' },
      border: { value: '{colors.teal.800}' },
    },
  },
  marker: {
    bg: { value: '{colors.orangeDark.500}' },
    fg: { value: '{colors.white}' },
  },

  miscellaneousIcons: {
    brand: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.brand.500}' },
    },
    pale: {
      fg: { value: '{colors.grayBlue.400}' },
      bg: { value: '{colors.brand.800}' },
    },
    success: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.success.600}' },
    },
  },

  bonusCardText: {
    darkMain: {
      title: { value: '{colors.grayBlue.900}' },
      description: { value: '{colors.grayBlue.600}' },
    },
    lightMain: {
      title: { value: '{colors.grayBlue.25}' },
      description: { value: '{colors.grayBlue.300}' },
    },
    darkBrand: {
      title: { value: '{colors.brand.800}' },
      description: { value: '{colors.brand.600}' },
    },
    lightBrand: {
      title: { value: '{colors.brand.300}' },
      description: { value: '{colors.brand.500}' },
    },
  },
  removeButton: {
    dark: {
      color: { value: '{colors.grayDark.600}' },
      colorHover: { value: '{colors.grayDark.500}' },
      bgHover: { value: '{colors.grayDark.800}' },
    },
  },
  tooltip: {
    default: {
      bg: { value: '{colors.brand.800}' },
    },
  },
  disclosure: {
    bg: {
      DEFAULT: { value: '{colors.grayBlue.950}' },
      hover: { value: '{colors.grayBlue.800}' },
      focus: { value: '{colors.grayBlue.950}' },
      pressed: { value: '{colors.grayBlue.700}' },
      disabled: { value: '{colors.grayBlue.900}' },
    },
    text: {
      DEFAULT: { value: '{colors.grayBlue.25}' },
      hover: { value: '{colors.grayBlue.25}' },
      focus: { value: '{colors.grayBlue.25}' },
      pressed: { value: '{colors.grayBlue.25}' },
      disabled: { value: '{colors.grayBlue.600}' },
    },
    icon: {
      DEFAULT: { value: '{colors.grayBlue.600}' },
      hover: { value: '{colors.grayBlue.500}' },
      focus: { value: '{colors.grayBlue.600}' },
      pressed: { value: '{colors.grayBlue.400}' },
      disabled: { value: '{colors.grayBlue.700}' },
    },
    description: { value: '{colors.grayBlue.400}' },
  },
  featuredCard: {
    bg: { value: '{colors.brand.500}' },
    borderHover: { value: '{colors.brand.400}' },
  },
});
