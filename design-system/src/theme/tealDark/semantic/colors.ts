import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  button: {
    primary: {
      disabled: {
        border: { value: '{colors.grayDark.800}' },
        bg: { value: '{colors.grayDark.800}' },
        fg: { value: '{colors.grayDark.500}' },
      },
    },
    secondary: {
      default: {
        border: { value: '{colors.brand.700}' },
        borderHover: { value: '{colors.brand.700}' },
        borderFocus: { value: '{colors.brand.800}' },
        borderPressed: { value: '{colors.brand.700}' },
        bg: { value: '{colors.grayDark.950}' },
        bgHover: { value: '{colors.brand.950}' },
        bgFocus: { value: '{colors.grayDark.950}' },
        bgPressed: { value: '{colors.brand.900}' },
        fg: { value: '{colors.brand.300}' },
        fgHover: { value: '{colors.brand.200}' },
        fgFocus: { value: '{colors.brand.300}' },
        fgPressed: { value: '{colors.brand.300}' },
      },
      pale: {
        border: { value: '{colors.grayDark.700}' },
        borderHover: { value: '{colors.grayDark.700}' },
        borderPressed: { value: '{colors.grayDark.700}' },
        borderFocus: { value: '{colors.grayDark.600}' },
        bg: { value: '{colors.grayDark.900}' },
        bgHover: { value: '{colors.grayDark.800}' },
        bgFocus: { value: '{colors.grayDark.900}' },
        bgPressed: { value: '{colors.grayDark.700}' },
        fg: { value: '{colors.grayDark.100}' },
        fgHover: { value: '{colors.grayDark.200}' },
        fgPressed: { value: '{colors.grayDark.100}' },
        fgFocus: { value: '{colors.grayDark.100}' },
      },
      error: {
        border: { value: '{colors.error.300}' },
        borderHover: { value: '{colors.error.700}' },
        borderPressed: { value: '{colors.error.600}' },
        bg: { value: '{colors.error.950}' },
        bgHover: { value: '{colors.error.900}' },
        bgPressed: { value: '{colors.error.900}' },
        fg: { value: '{colors.error.200}' },
        fgHover: { value: '{colors.error.100}' },
      },
      disabled: {
        border: { value: '{colors.grayDark.700}' },
        borderHover: { value: '{colors.grayDark.700}' },
        bg: { value: '{colors.transparent}' },
        fg: { value: '{colors.grayDark.600}' },
      },
    },
    tertiary: {
      default: {
        fg: { value: '{colors.brand.400}' },
        fgHover: { value: '{colors.brand.200}' },
        fgPressed: { value: '{colors.brand.300}' },
        fgFocus: { value: '{colors.brand.500}' },
        bgHover: { value: '{colors.brand.800}' },
        bgPressed: { value: '{colors.brand.900}' },
      },
      pale: {
        fg: { value: '{colors.grayDark.400}' },
        fgHover: { value: '{colors.grayDark.200}' },
        fgPressed: { value: '{colors.grayDark.300}' },
        fgFocus: { value: '{colors.grayDark.400}' },
        bgHover: { value: '{colors.grayDark.800}' },
        bgPressed: { value: '{colors.grayDark.900}' },
      },
      error: {
        fg: { value: '{colors.error.300}' },
        fgHover: { value: '{colors.error.200}' },
        fgPressed: { value: '{colors.error.100}' },
        bgHover: { value: '{colors.error.950}' },
        bgPressed: { value: '{colors.error.900}' },
      },
      disabled: {
        fg: { value: '{colors.grayDark.500}' },
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
  },

  fg: {
    primary: { value: '{colors.white}' },
    secondary: {
      DEFAULT: { value: '{colors.grayDark.300}' },
      hover: { value: '{colors.grayDark.200}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayDark.400}' },
      hover: { value: '{colors.grayDark.300}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayDark.400}' },
      hover: { value: '{colors.grayDark.300}' },
    },
    quinary: {
      DEFAULT: { value: '{colors.grayDark.500}' },
      hover: { value: '{colors.grayDark.400}' },
    },
    senary: { value: '{colors.grayDark.600}' },
    disabled: {
      DEFAULT: { value: '{colors.grayCool.500}' },
      subtle: { value: '{colors.grayDark.600}' },
    },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.500}' },
      },
    },
    error: {
      primary: { value: '{colors.error.500}' },
      secondary: { value: '{colors.error.400}' },
    },
    warning: {
      primary: { value: '{colors.warning.500}' },
      secondary: { value: '{colors.warning.400}' },
    },
    success: {
      primary: { value: '{colors.success.500}' },
      secondary: { value: '{colors.success.400}' },
    },
  },

  background: {
    primary: {
      DEFAULT: { value: '{colors.grayDark.950}' },
      alt: { value: '{colors.grayDark.900}' },
      hover: { value: '{colors.grayDark.800}' },
      pressed: { value: '{colors.grayLight.700}' },
      solid: { value: '{colors.grayDark.900}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayDark.900}' },
      alt: { value: '{colors.grayDark.950}' },
      hover: { value: '{colors.grayDark.800}' },
      pressed: { value: '{colors.grayDark.700}' },
      subtle: { value: '{colors.grayDark.900}' },
      solid: { value: '{colors.grayDark.600}' },
    },
    tertiary: { value: '{colors.grayDark.800}' },
    active: { value: '{colors.grayDark.800}' },
    disabled: {
      DEFAULT: { value: '{colors.grayDark.800}' },
      subtle: { value: '{colors.grayDark.900}' },
    },
    overlay: { value: '{colors.grayDark.800}' },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.grayDark.800}' },
      },
      secondary: { value: '{colors.brand.600}' },
      solid: {
        hover: { value: '{colors.brand.500}' },
      },
      section: {
        subtle: { value: '{colors.grayDark.950}' },
      },
    },
    error: {
      primary: { value: '{colors.error.200}' },
      secondary: { value: '{colors.error.600}' },
    },
    quarterary: {
      value: '{colors.grayDark.700}',
    },
    warning: {
      primary: { value: '{colors.warning.500}' },
      secondary: { value: '{colors.warning.600}' },
    },
    success: {
      primary: { value: '{colors.success.500}' },
      secondary: { value: '{colors.success.600}' },
    },
  },

  border: {
    primary: { value: '{colors.grayDark.600}' },
    secondary: { value: '{colors.grayDark.700}' },
    tertiary: { value: '{colors.grayDark.800}' },
    brand: {
      DEFAULT: { value: '{colors.brand.400}' },
      solid: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.grayDark.700}' },
      },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayDark.700}' },
      subtle: { value: '{colors.grayDark.800}' },
    },
    error: { value: '{colors.error.500}' },
  },

  text: {
    primary: {
      DEFAULT: { value: '{colors.grayDark.50}' },
      onBrand: { value: '{colors.brand.50}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayDark.300}' },
      hover: { value: '{colors.grayDark.200}' },
      onBrand: { value: '{colors.brand.300}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayDark.400}' },
      hover: { value: '{colors.grayDark.300}' },
      onBrand: { value: '{colors.brand.400}' },
      mute: { value: '{colors.grayDark.400}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayDark.400}' },
      onBrand: { value: '{colors.brand.400}' },
    },
    placeholder: {
      DEFAULT: { value: '{colors.grayDark.400}' },
      subtle: { value: '{colors.grayDark.700}' },
    },
    disabled: { value: '{colors.grayDark.500}' },
    brand: {
      primary: { value: '{colors.grayDark.50}' },
      secondary: { value: '{colors.grayDark.300}' },
      tertiary: {
        DEFAULT: { value: '{colors.brand.400}' },
        alt: { value: '{colors.grayDark.50}' },
      },
    },
  },

  link: {
    default: {
      fg: { value: '{colors.brand.300}' },
      fgHover: { value: '{colors.brand.200}' },
    },
  },

  tag: {
    default: {
      bg: { value: '{colors.grayDark.950}' },
      border: { value: '{colors.grayDark.700}' },
      fg: { value: '{colors.grayDark.300}' },
    },
    hover: {
      bg: { value: '{colors.grayDark.900}' },
      border: { value: '{colors.grayDark.700}' },
      fg: { value: '{colors.grayDark.300}' },
    },
    pressed: {
      bg: { value: '{colors.grayDark.800}' },
      border: { value: '{colors.grayDark.700}' },
      fg: { value: '{colors.grayDark.300}' },
    },
    selected: {
      bg: { value: '{colors.grayDark.950}' },
      border: { value: '{colors.grayDark.300}' },
      fg: { value: '{colors.grayDark.300}' },
    },
  },

  tab: {
    basic: {
      default: {
        fg: { value: '{colors.grayDark.400}' },
        bgHover: { value: '{colors.grayDark.800}' },
        fgHover: { value: '{colors.grayDark.300}' },
        bgFocus: { value: '{colors.grayDark.800}' },
        fgFocus: { value: '{colors.grayDark.400}' },
        scrollButtonsBg: { value: '{colors.grayCool.950}' },
      },
      current: {
        bg: { value: '{colors.grayDark.800}' },
        fg: { value: '{colors.grayDark.300}' },
        bgHover: { value: '{colors.grayDark.700}' },
        fgHover: { value: '{colors.grayDark.300}' },
        bgFocus: { value: '{colors.grayDark.800}' },
        fgFocus: { value: '{colors.grayDark.300}' },
      },
    },
    border: {
      bg: { value: '{colors.grayDark.950}' },
      border: { value: '{colors.grayDark.800}' },
      default: {
        fg: { value: '{colors.grayDark.400}' },
        bgHover: { value: '{colors.grayDark.700}' },
        fgHover: { value: '{colors.grayDark.300}' },
        bgFocus: { value: '{colors.grayDark.800}' },
        fgFocus: { value: '{colors.grayDark.400}' },
      },
      current: {
        bg: { value: '{colors.grayDark.800}' },
        fg: { value: '{colors.grayDark.30}' },
        bgHover: { value: '{colors.grayDark.700}' },
        fgHover: { value: '{colors.grayDark.300}' },
        bgFocus: { value: '{colors.grayDark.800}' },
        fgFocus: { value: '{colors.grayDark.300}' },
      },
    },
    modern: {
      default: {
        fg: { value: '{colors.grayDark.400}' },
        bg: { value: '{colors.transparent}' },
        border: { value: '{colors.grayDark.700}' },
        fgHover: { value: '{colors.brand.300}' },
        bgHover: { value: '{colors.brand.900}' },
        borderHover: { value: '{colors.brand.700}' },
        fgFocus: { value: '{colors.grayDark.400}' },
        focus: {
          bg: { value: '{colors.grayDark.950}' },
        },
        borderFocus: { value: '{colors.grayDark.700}' },
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

  navItem: {
    gray: {
      selected: {
        bg: { value: '{colors.grayDark.800}' },
        color: { value: '{colors.grayDark.200}' },
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
      color: { value: '{colors.grayDark.300}' },
      fg: { value: '{colors.grayDark.500}' },
      bg: { value: '{colors.grayDark.900}' },
      border: { value: '{colors.grayDark.700}' },
    },
    brand: {
      color: { value: '{colors.grayDark.300}' },
      fg: { value: '{colors.grayDark.500}' },
      bg: { value: '{colors.grayDark.950}' },
      border: { value: '{colors.grayDark.800}' },
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

  bigWin: {
    bg: { value: '{colors.grayDark.800}' },
    bgHover: { value: '{colors.grayDark.700}' },
    bgFocus: { value: '{colors.grayDark.800}' },
    fg: { value: '{colors.green.600}' },
  },

  gameCard: {
    bgOverlay: { value: '{colors.alphaDark.70}' },
  },
  timer: {
    bgTransparent: { value: '{colors.alphaDark.80}' },
  },

  providerCard: {
    bg: { value: '{colors.grayDark.950}' },
    border: { value: '{colors.grayDark.800}' },
  },

  miscellaneousIcons: {
    brand: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.brand.500}' },
    },
    pale: {
      fg: { value: '{colors.grayDark.400}' },
      bg: { value: '{colors.grayDark.800}' },
    },
    success: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.success.600}' },
    },
  },

  bonusCardText: {
    darkMain: {
      title: { value: '{colors.grayDark.900}' },
      description: { value: '{colors.grayDark.600}' },
    },
    lightMain: {
      title: { value: '{colors.grayDark.25}' },
      description: { value: '{colors.grayDark.300}' },
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
      color: { value: '{colors.grayDark.600}' },
      colorHover: { value: '{colors.grayDark.500}' },
      bgHover: { value: '{colors.grayDark.800}' },
    },
  },
  tooltip: {
    default: {
      bg: { value: '{colors.grayDark.800}' },
    },
  },
  disclosure: {
    bg: {
      DEFAULT: { value: '{colors.grayDark.950}' },
      hover: { value: '{colors.grayDark.900}' },
      focus: { value: '{colors.grayDark.950}' },
      pressed: { value: '{colors.grayDark.800}' },
      disabled: { value: '{colors.grayDark.800}' },
    },
    text: {
      DEFAULT: { value: '{colors.grayDark.25}' },
      hover: { value: '{colors.grayDark.25}' },
      focus: { value: '{colors.grayDark.25}' },
      pressed: { value: '{colors.grayDark.25}' },
      disabled: { value: '{colors.grayDark.600}' },
    },
    icon: {
      DEFAULT: { value: '{colors.grayLight.600}' },
      hover: { value: '{colors.grayLight.600}' },
      focus: { value: '{colors.grayLight.600}' },
      pressed: { value: '{colors.grayLight.500}' },
      disabled: { value: '{colors.grayLight.700}' },
    },
    description: { value: '{colors.grayDark.400}' },
  },
  featuredCard: {
    bg: { value: '{colors.brand.500}' },
    borderHover: { value: '{colors.brand.400}' },
  },
});
