import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  button: {
    primary: {
      default: {
        fg: { value: '{colors.grayLight.900}' },
        fgHover: { value: '{colors.grayLight.900}' },
      },
      disabled: {
        border: { value: '{colors.grayLight.700}' },
        bg: { value: '{colors.grayLight.900}' },
        fg: { value: '{colors.grayLight.500}' },
      },
    },
    secondary: {
      default: {
        border: { value: '{colors.brand.700}' },
        borderHover: { value: '{colors.brand.800}' },
        borderFocus: { value: '{colors.brand.800}' },
        borderPressed: { value: '{colors.brand.700}' },
        bg: { value: '{colors.grayLight.900}' },
        bgHover: { value: '{colors.grayLight.800}' },
        bgPressed: { value: '{colors.grayLight.800}' },
        bgFocus: { value: '{colors.grayLight.900}' },
        fg: { value: '{colors.brand.500}' },
        fgHover: { value: '{colors.brand.700}' },
        fgPressed: { value: '{colors.brand.800}' },
        fgFocus: { value: '{colors.brand.500}' },
      },
      pale: {
        border: { value: '{colors.grayLight.700}' },
        borderHover: { value: '{colors.grayLight.600}' },
        borderPressed: { value: '{colors.grayLight.600}' },
        borderFocus: { value: '{colors.grayLight.700}' },
        bg: { value: '{colors.grayLight.900}' },
        bgHover: { value: '{colors.grayLight.800}' },
        bgFocus: { value: '{colors.grayLight.900}' },
        bgPressed: { value: '{colors.grayLight.800}' },
        fg: { value: '{colors.grayLight.100}' },
        fgHover: { value: '{colors.grayLight.200}' },
        fgPressed: { value: '{colors.grayLight.300}' },
        fgFocus: { value: '{colors.grayLight.200}' },
      },
      error: {
        border: { value: '{colors.error.500}' },
        borderHover: { value: '{colors.error.700}' },
        borderPressed: { value: '{colors.error.800}' },
        borderFocus: { value: '{colors.error.700}' },
        bg: { value: '{colors.grayLight.900}' },
        bgHover: { value: '{colors.error.900}' },
        bgFocus: { value: '{colors.error.900}' },
        bgPressed: { value: '{colors.error.900}' },
        fg: { value: '{colors.error.100}' },
        fgHover: { value: '{colors.error.100}' },
        fgPressed: { value: '{colors.error.300}' },
        fgFocus: { value: '{colors.error.100}' },
      },
      disabled: {
        border: { value: '{colors.grayLight.800}' },
        bg: { value: '{colors.grayLight.900}' },
        fg: { value: '{colors.grayLight.500}' },
      },
    },
    tertiary: {
      default: {
        fg: { value: '{colors.brand.300}' },
        fgHover: { value: '{colors.brand.200}' },
        fgPressed: { value: '{colors.brand.300}' },
        fgFocus: { value: '{colors.brand.400}' },
        bgHover: { value: '{colors.brand.800}' },
        bgPressed: { value: '{colors.brand.900}' },
      },
      pale: {
        fg: { value: '{colors.grayLight.200}' },
        fgHover: { value: '{colors.grayLight.100}' },
        fgPressed: { value: '{colors.grayLight.300}' },
        fgFocus: { value: '{colors.grayLight.200}' },
        bgHover: { value: '{colors.grayLight.800}' },
        bgPressed: { value: '{colors.grayLight.800}' },
      },
      error: {
        fg: { value: '{colors.error.200}' },
        fgHover: { value: '{colors.error.100}' },
        fgPressed: { value: '{colors.error.300}' },
        bgHover: { value: '{colors.error.950}' },
        bgPressed: { value: '{colors.error.950}' },
      },
      disabled: {
        fg: { value: '{colors.grayLight.500}' },
      },
    },
    link: {
      default: {
        bgFocus: { value: '{colors.transparent}' },
      },
    },
  },

  featuredIcon: {
    brand: {
      fg: { value: '{colors.grayLight.900}' },
      bg: { value: '{colors.brand.600}' },
    },
    pale: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.grayLight.700}' },
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
      fg: { value: '{colors.grayLight.300}' },
      border: { value: '{colors.grayLight.700}' },
      bg: { value: '{colors.grayLight.900}' },
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
      fg: { value: '{colors.grayLight.900}' },
      bg: { value: '{colors.purple.400}' },
    },
  },

  fg: {
    primary: { value: '{colors.white}' },
    white: { value: '{colors.grayLight.900}' },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.300}' },
      hover: { value: '{colors.grayLight.200}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      hover: { value: '{colors.grayLight.300}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      hover: { value: '{colors.grayLight.300}' },
    },
    quinary: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      hover: { value: '{colors.grayLight.400}' },
    },
    senary: { value: '{colors.grayLight.600}' },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      subtle: { value: '{colors.grayLight.600}' },
    },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.300}' },
      },
      secondary: { value: '{colors.brand.500}' },
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
    surface: { primary: { value: '{colors.grayLight.900}' } },
    primary: {
      DEFAULT: { value: '{colors.grayLight.900}' },
      alt: { value: '{colors.grayLight.900}' },
      hover: { value: '{colors.grayLight.800}' },
      pressed: { value: '{colors.grayLight.700}' },
      solid: { value: '{colors.grayLight.900}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.800}' },
      alt: { value: '{colors.grayLight.900}' },
      hover: { value: '{colors.grayLight.700}' },
      pressed: { value: '{colors.grayLight.700}' },
      subtle: { value: '{colors.grayLight.900}' },
      solid: { value: '{colors.grayLight.600}' },
    },
    tertiary: { value: '{colors.grayLight.700}' },
    active: { value: '{colors.grayLight.700}' },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.900}' },
      subtle: { value: '{colors.grayLight.900}' },
    },
    overlay: { value: '{colors.grayLight.800}' },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.500}' },
        alt: { value: '{colors.brand.800}' },
      },
      secondary: { value: '{colors.brand.600}' },
      solid: {
        DEFAULT: { value: '{colors.brand.800}' },
        hover: { value: '{colors.brand.700}' },
        pressed: { value: '{colors.brand.800}' },
      },
      section: {
        DEFAULT: { value: '{colors.brand.800}' },
        subtle: { value: '{colors.grayLight.950}' },
      },
    },
    error: {
      primary: { value: '{colors.error.200}' },
      secondary: { value: '{colors.error.600}' },
    },
    warning: {
      primary: { value: '{colors.warning.500}' },
      secondary: { value: '{colors.warning.600}' },
    },
    quarterary: {
      value: '{colors.grayLight.600}',
    },
  },

  border: {
    primary: { value: '{colors.grayLight.500}' },
    secondary: { value: '{colors.grayLight.600}' },
    tertiary: { value: '{colors.grayLight.700}' },
    brand: {
      DEFAULT: { value: '{colors.brand.400}' },
      solid: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.700}' },
      },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.700}' },
      subtle: { value: '{colors.grayLight.700}' },
    },
    error: {
      DEFAULT: { value: '{colors.error.500}' },
    },
  },

  text: {
    primary: {
      DEFAULT: { value: '{colors.grayLight.50}' },
      onBrand: { value: '{colors.grayLight.900}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.200}' },
      hover: { value: '{colors.grayLight.100}' },
      onBrand: { value: '{colors.grayLight.700}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayLight.300}' },
      mute: { value: '{colors.grayLight.400}' },
      hover: { value: '{colors.grayLight.200}' },
      onBrand: { value: '{colors.grayLight.600}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      onBrand: { value: '{colors.grayLight.500}' },
    },
    placeholder: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      subtle: { value: '{colors.grayLight.700}' },
    },
    disabled: { value: '{colors.grayLight.600}' },
    brand: {
      primary: { value: '{colors.brand.50}' },
      secondary: { value: '{colors.brand.500}' },
      tertiary: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.700}' },
      },
    },
    error: {
      primary: { value: '{colors.error.600}' },
    },
    warning: { primary: { value: '{colors.warning.600}' } },
    success: { primary: { value: '{colors.success.600}' } },
  },

  link: {
    default: {
      fg: { value: '{colors.brand.600}' },
      fgHover: { value: '{colors.brand.800}' },
    },
    pale: {
      fg: { value: '{colors.grayLight.200}' },
      fgHover: { value: '{colors.grayLight.100}' },
    },
    error: {
      fg: { value: '{colors.error.200}' },
      fgHover: { value: '{colors.error.100}' },
    },
    disabled: {
      fg: { value: '{colors.grayLight.500}' },
    },
  },

  tag: {
    default: {
      bg: { value: '{colors.grayLight.950}' },
      border: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.300}' },
    },
    hover: {
      bg: { value: '{colors.grayLight.900}' },
      border: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.300}' },
    },
    pressed: {
      bg: { value: '{colors.grayLight.800}' },
      border: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.300}' },
    },
    selected: {
      bg: { value: '{colors.grayLight.950}' },
      border: { value: '{colors.grayLight.300}' },
      fg: { value: '{colors.grayLight.300}' },
    },
  },

  tab: {
    basic: {
      default: {
        bgHover: { value: '{colors.grayLight.800}' },
        bgFocus: { value: '{colors.grayLight.950}' },
        scrollButtonsBg: { value: '{colors.grayLight.950}' },
      },
      current: {
        bg: { value: '{colors.grayLight.700}' },
        bgHover: { value: '{colors.grayLight.600}' },
        bgFocus: { value: '{colors.grayLight.800}' },
      },
    },
    border: {
      bg: { value: '{colors.grayLight.950}' },
      border: { value: '{colors.grayLight.800}' },
      default: {
        bgHover: { value: '{colors.grayLight.800}' },
        bgFocus: { value: '{colors.grayLight.950}' },
      },
      current: {
        bg: { value: '{colors.grayLight.700}' },
        bgHover: { value: '{colors.grayLight.600}' },
        bgFocus: { value: '{colors.grayLight.800}' },
      },
    },
    modern: {
      default: {
        fg: { value: '{colors.grayLight.300}' },
        bg: { value: '{colors.grayLight.900}' },
        border: { value: '{colors.grayLight.700}' },
        fgHover: { value: '{colors.brand.300}' },
        bgHover: { value: '{colors.grayLight.900}' },
        borderHover: { value: '{colors.brand.600}' },
        fgFocus: { value: '{colors.brand.300}' },
        focus: {
          bg: { value: '{colors.grayLight.900}' },
        },
        borderFocus: { value: '{colors.brand.600}' },
      },
      current: {
        fg: { value: '{colors.grayLight.800}' },
        bg: { value: '{colors.brand.600}' },
        border: { value: '{colors.brand.600}' },
        fgHover: { value: '{colors.grayLight.800}' },
        bgHover: { value: '{colors.brand.800}' },
        borderHover: { value: '{colors.brand.800}' },
        fgFocus: { value: '{colors.grayLight.800}' },
        bgFocus: { value: '{colors.brand.800}' },
        borderFocus: { value: '{colors.brand.800}' },
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
      fg: { value: '{colors.grayLight.400}' },
      hover: {
        bg: { value: '{colors.grayLight.700}' },
        color: { value: '{colors.grayLight.200}' },
      },
      selected: {
        bg: { value: '{colors.grayLight.700}' },
        color: { value: '{colors.grayLight.200}' },
      },
    },
    teal: {
      fg: { value: '{colors.teal.500}' },
      hover: {
        bg: { value: '{colors.teal.900}' },
        color: { value: '{colors.teal.400}' },
      },
      pressed: {
        bg: { value: '{colors.grayLight.900}' },
        color: { value: '{colors.grayLight.200}' },
      },
      selected: {
        bg: { value: '{colors.teal.950}' },
        color: { value: '{colors.teal.400}' },
      },
    },
    rose: {
      fg: { value: '{colors.rose.500}' },
      hover: {
        bg: { value: '{colors.rose.900}' },
        color: { value: '{colors.rose.400}' },
      },
      pressed: {
        bg: { value: '{colors.grayLight.900}' },
        color: { value: '{colors.grayLight.200}' },
      },
      selected: {
        bg: { value: '{colors.rose.950}' },
        color: { value: '{colors.rose.400}' },
      },
    },
    purple: {
      fg: { value: '{colors.purple.500}' },
      hover: {
        bg: { value: '{colors.purple.900}' },
        color: { value: '{colors.purple.400}' },
      },
      pressed: {
        bg: { value: '{colors.grayLight.900}' },
        color: { value: '{colors.grayLight.200}' },
      },
      selected: {
        bg: { value: '{colors.purple.900}' },
        color: { value: '{colors.purple.400}' },
      },
    },
  },

  badge: {
    dark: {
      color: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.500}' },
      bg: { value: '{colors.grayLight.50}' },
      border: { value: '{colors.grayLight.200}' },
      borderOutline: { value: '{colors.grayLight.600}' },
      flatBg: { value: '{colors.grayLight.100}' },
      flatText: { value: '{colors.grayLight.900}' },
    },
    grayLight: {
      bg: { value: '{colors.grayLight.900}' },
      border: { value: '{colors.grayLight.700}' },
      borderOutline: { value: '{colors.grayLight.200}' },
      flatBg: { value: '{colors.grayLight.500}' },
      flatText: { value: '{colors.grayLight.50}' },
      color: { value: '{colors.grayLight.300}' },
      fg: { value: '{colors.grayLight.500}' },
    },

    brand: {
      color: { value: '{colors.brand.25}' },
      fg: { value: '{colors.brand.500}' },
      bg: { value: '{colors.grayLight.900}' },
      border: { value: '{colors.brand.800}' },
      borderOutline: { value: '{colors.brand.600}' },
      flatBg: { value: '{colors.brand.950}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    error: {
      color: { value: '{colors.error.300}' },
      fg: { value: '{colors.error.500}' },
      bg: { value: '{colors.error.950}' },
      border: { value: '{colors.error.800}' },
      borderOutline: { value: '{colors.error.600}' },
      flatBg: { value: '{colors.error.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    success: {
      color: { value: '{colors.success.300}' },
      fg: { value: '{colors.success.400}' },
      bg: { value: '{colors.success.950}' },
      border: { value: '{colors.success.800}' },
      borderOutline: { value: '{colors.success.600}' },
      flatBg: { value: '{colors.success.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    warning: {
      color: { value: '{colors.warning.300}' },
      fg: { value: '{colors.warning.500}' },
      bg: { value: '{colors.warning.950}' },
      border: { value: '{colors.warning.800}' },
      borderOutline: { value: '{colors.warning.600}' },
      flatBg: { value: '{colors.warning.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    pink: {
      color: { value: '{colors.pink.300}' },
      fg: { value: '{colors.pink.500}' },
      bg: { value: '{colors.pink.950}' },
      border: { value: '{colors.pink.800}' },
      borderOutline: { value: '{colors.pink.600}' },
      flatBg: { value: '{colors.pink.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    purple: {
      color: { value: '{colors.purple.300}' },
      fg: { value: '{colors.purple.500}' },
      bg: { value: '{colors.purple.950}' },
      border: { value: '{colors.purple.800}' },
      borderOutline: { value: '{colors.purple.600}' },
      flatBg: { value: '{colors.purple.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    blue: {
      color: { value: '{colors.blue.300}' },
      fg: { value: '{colors.blue.500}' },
      bg: { value: '{colors.blue.950}' },
      border: { value: '{colors.blue.800}' },
      borderOutline: { value: '{colors.blue.600}' },
      flatBg: { value: '{colors.blue.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    rose: {
      color: { value: '{colors.rose.300}' },
      fg: { value: '{colors.rose.500}' },
      bg: { value: '{colors.rose.950}' },
      border: { value: '{colors.rose.800}' },
      borderOutline: { value: '{colors.rose.600}' },
      flatBg: { value: '{colors.rose.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    teal: {
      color: { value: '{colors.teal.300}' },
      fg: { value: '{colors.teal.500}' },
      bg: { value: '{colors.teal.950}' },
      border: { value: '{colors.teal.800}' },
      borderOutline: { value: '{colors.teal.600}' },
      flatBg: { value: '{colors.teal.600}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
  },

  marker: {
    bg: { value: '{colors.orangeDark.500}' },
  },

  miscellaneousIcons: {
    brand: {
      fg: { value: '{colors.grayLight.900}' },
      bg: { value: '{colors.brand.500}' },
    },
    pale: {
      fg: { value: '{colors.grayLight.400}' },
      bg: { value: '{colors.grayLight.700}' },
    },
    success: {
      fg: { value: '{colors.white}' },
      bg: { value: '{colors.teal.500}' },
    },
  },

  removeButton: {
    brand: {
      color: { value: '{colors.brand.600}' },
      colorHover: { value: '{colors.brand.500}' },
      bgHover: { value: '{colors.brand.900}' },
    },
    pale: {
      color: { value: '{colors.grayLight.50}' },
      colorHover: { value: '{colors.grayLight.100}' },
      bgHover: { value: '{colors.grayLight.700}' },
    },
  },

  tooltip: {
    default: {
      bg: { value: '{colors.grayLight.800}' },
    },
  },

  disclosure: {
    bg: {
      DEFAULT: { value: '{colors.transparent}' },
      hover: { value: '{colors.grayLight.800}' },
      focus: { value: '{colors.grayLight.900}' },
      pressed: { value: '{colors.grayLight.900}' },
      disabled: { value: '{colors.transparent}' },
    },
    text: {
      DEFAULT: { value: '{colors.grayLight.25}' },
      hover: { value: '{colors.grayLight.25}' },
      focus: { value: '{colors.grayLight.25}' },
      pressed: { value: '{colors.grayLight.25}' },
      disabled: { value: '{colors.grayLight.500}' },
    },
    icon: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      hover: { value: '{colors.grayLight.500}' },
      focus: { value: '{colors.grayLight.500}' },
      pressed: { value: '{colors.grayLight.500}' },
      disabled: { value: '{colors.grayLight.600}' },
    },
    description: { value: '{colors.grayDark.400}' },
  },

  datePicker: {
    fgFocus: { value: '{colors.grayLight.900}' },
    bgFocus: { value: '{colors.brand.600}' },
  },

  featuredCard: {
    bg: { value: '{colors.grayLight.800}' },
    borderHover: { value: '{colors.brand.600}' },
  },
  tabBar: { fg: { value: '{colors.grayLight.200}' } },
});
