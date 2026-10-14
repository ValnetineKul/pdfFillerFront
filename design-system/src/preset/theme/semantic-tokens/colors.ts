import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  text: {
    primary: {
      DEFAULT: { value: '{colors.grayLight.900}' },
      onBrand: { value: '{colors.white}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.700}' },
      hover: { value: '{colors.grayLight.800}' },
      onBrand: { value: '{colors.white}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayLight.600}' },
      mute: { value: '{colors.grayLight.200}' },
      hover: { value: '{colors.brand.700}' },
      onBrand: { value: '{colors.brand.200}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      onBrand: { value: '{colors.brand.300}' },
    },
    placeholder: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      subtle: { value: '{colors.grayLight.300}' },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      subtle: { value: '{colors.grayLight.300}' },
    },
    brand: {
      primary: { value: '{colors.brand.900}' },
      secondary: { value: '{colors.brand.700}' },
      tertiary: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.600}' },
      },
    },
    error: { value: '{colors.error.600}' },
    warning: { value: '{colors.warning.600}' },
    success: { value: '{colors.success.600}' },
    white: {
      value: '{colors.white}',
    },
    black: {
      value: '{colors.grayLight.950}',
    },
  },
  fg: {
    primary: { value: '{colors.grayLight.900}' },
    senary: { value: '{colors.grayLight.300}' },
    white: { value: '{colors.white}' },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      subtle: { value: '{colors.grayLight.300}' },
    },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.600}' },
      },
      secondary: { value: '{colors.brand.600}' },
    },
    error: {
      primary: { value: '{colors.error.600}' },
      secondary: { value: '{colors.error.500}' },
    },
    warning: {
      primary: { value: '{colors.warning.600}' },
      secondary: { value: '{colors.warning.500}' },
    },
    success: {
      primary: { value: '{colors.success.600}' },
      secondary: { value: '{colors.success.500}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.700}' },
      hover: { value: '{colors.grayLight.800}' },
    },
    tertiary: {
      DEFAULT: { value: '{colors.grayLight.600}' },
      hover: { value: '{colors.grayLight.700}' },
    },
    quarterary: {
      DEFAULT: { value: '{colors.grayLight.500}' },
      hover: { value: '{colors.grayLight.600}' },
    },
    quinary: {
      DEFAULT: { value: '{colors.grayLight.400}' },
      hover: { value: '{colors.grayLight.500}' },
    },
  },
  background: {
    surface: { primary: { value: '{colors.white}' } },
    primary: {
      DEFAULT: { value: '{colors.white}' },
      alt: { value: '{colors.white}' },
      hover: { value: '{colors.grayLight.100}' },
      pressed: { value: '{colors.grayLight.200}' },
      solid: { value: '{colors.grayLight.950}' },
    },
    secondary: {
      DEFAULT: { value: '{colors.grayLight.50}' },
      alt: { value: '{colors.grayLight.50}' },
    },
    tertiary: { value: '{colors.grayLight.100}' },
    brand: {
      primary: {
        DEFAULT: { value: '{colors.brand.50}' },
        alt: { value: '{colors.brand.50}' },
      },
      secondary: { value: '{colors.brand.100}' },

      solid: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.700}' },
        hover: { value: '{colors.brand.700}' },
      },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.100}' },
      subtle: { value: '{colors.grayLight.50}' },
    },
    error: {
      primary: { value: '{colors.error.50}' },
      secondary: { value: '{colors.error.100}' },
      solid: {
        DEFAULT: { value: '{colors.error.600}' },
        alt: { value: '{colors.error.700}' },
      },
    },
    warning: {
      primary: { value: '{colors.warning.50}' },
      secondary: { value: '{colors.warning.100}' },
      solid: { value: '{colors.warning.600}' },
    },
    quarterary: {
      value: '{colors.grayLight.200}',
    },
    success: {
      primary: { value: '{colors.success.500}' },
      secondary: { value: '{colors.success.600}' },
      solid: { value: '{colors.success.600}' },
    },
  },
  border: {
    primary: { value: '{colors.grayLight.300}' },
    secondary: { value: '{colors.grayLight.200}' },
    tertiary: { value: 'colors.grayLight.100' },
    brand: {
      DEFAULT: { value: '{colors.brand.300}' },
      solid: {
        DEFAULT: { value: '{colors.brand.600}' },
        alt: { value: '{colors.brand.600}' },
      },
    },
    disabled: {
      DEFAULT: { value: '{colors.grayLight.300}' },
      subtle: { value: '{colors.grayLight.200}' },
    },
    error: {
      DEFAULT: { value: '{colors.error.300}' },
      solid: { value: '{colors.error.600}' },
    },
  },
  button: {
    primary: {
      default: {
        border: { value: '{colors.brand.600}' },
        borderHover: { value: '{colors.brand.700}' },
        borderPressed: { value: '{colors.brand.800}' },
        bg: { value: '{colors.brand.600}' },
        bgHover: { value: '{colors.brand.700}' },
        bgPressed: { value: '{colors.brand.800}' },
        fg: { value: '{colors.white}' },
        fgHover: { value: '{colors.white}' },
        loadingIcon: { value: '{colors.brand.300}' },
      },
      error: {
        border: { value: '{colors.error.600}' },
        borderHover: { value: '{colors.error.700}' },
        borderFocus: { value: '{colors.error.600}' },
        borderPressed: { value: '{colors.error.800}' },
        loadingIcon: { value: '{colors.error.300}' },
        bg: { value: '{colors.error.600}' },
        bgHover: { value: '{colors.error.700}' },
        bgPressed: { value: '{colors.error.800}' },
        bgFocus: { value: '{colors.error.600}' },
        fg: { value: '{colors.white}' },
        fgHover: { value: '{colors.white}' },
        fgPressed: { value: '{colors.white}' },
        fgFocus: { value: '{colors.white}' },
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
        bgPressed: { value: '{colors.brand.100}' },
        fg: { value: '{colors.brand.700}' },
        fgHover: { value: '{colors.brand.800}' },
        fgFocus: { value: '{colors.brand.700}' },
        fgPressed: { value: '{colors.brand.700}' },
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
        borderPressed: { value: '{colors.error.300}' },
        borderFocus: { value: '{colors.error.300}' },
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.error.50}' },
        bgFocus: { value: '{colors.white}' },
        bgPressed: { value: '{colors.error.100}' },
        fg: { value: '{colors.error.700}' },
        fgHover: { value: '{colors.error.800}' },
        fgPressed: { value: '{colors.error.700}' },
        fgFocus: { value: '{colors.error.700}' },
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
    link: {
      default: {
        bgFocus: { value: '{colors.alphaLight.10}' },
      },
    },
  },

  link: {
    default: {
      fg: { value: '{colors.brand.700}' },
      fgHover: { value: '{colors.brand.800}' },
    },
    pale: {
      fg: { value: '{colors.grayLight.600}' },
      fgHover: { value: '{colors.grayLight.800}' },
    },
    error: {
      fg: { value: '{colors.error.700}' },
      fgHover: { value: '{colors.error.800}' },
    },
    disabled: {
      fg: { value: '{colors.grayLight.400}' },
    },
  },

  menu: {
    default: {
      bgHover: { value: '{colors.grayLight.50}' },
      fg: { value: '{colors.grayLight.700}' },
      fgHover: { value: '{colors.grayLight.800}' },
    },
    disabled: {
      fg: { value: '{colors.grayLight.500}' },
    },
  },

  featuredIcon: {
    brand: {
      fg: { value: '{colors.brand.600}' },
      bg: { value: '{colors.brand.100}' },
    },
    pale: {
      fg: { value: '{colors.grayLight.600}' },
      bg: { value: '{colors.grayLight.100}' },
    },
    error: {
      fg: { value: '{colors.error.600}' },
      bg: { value: '{colors.error.100}' },
    },
    warning: {
      fg: { value: '{colors.warning.600}' },
      bg: { value: '{colors.warning.50}' },
    },
    success: {
      fg: { value: '{colors.success.600}' },
      bg: { value: '{colors.success.50}' },
    },
    modern: {
      fg: { value: '{colors.grayLight.700}' },
      bg: { value: 'transparent' },
      border: { value: '{colors.grayLight.200}' },
    },
    teal: {
      bg: { value: '{colors.teal.100}' },
      fg: { value: '{colors.teal.600}' },
    },
    rose: {
      bg: { value: '{colors.rose.100}' },
      fg: { value: '{colors.rose.600}' },
    },
    purple: {
      bg: {
        value: '{colors.purple.100}',
      },
      fg: { value: '{colors.purple.600}' },
    },
  },

  miscellaneousIcons: {
    brand: {
      fg: { value: '{colors.brand.600}' },
      bg: { value: '{colors.brand.50}' },
    },
    pale: {
      fg: { value: '{colors.grayLight.500}' },
      bg: { value: '{colors.grayLight.100}' },
    },
    success: {
      fg: { value: '{colors.success.500}' },
      bg: { value: '{colors.success.100}' },
    },
  },

  badge: {
    dark: {
      color: { value: '{colors.grayLight.50}' },
      fg: { value: '{colors.grayLight.300}' },
      bg: { value: '{colors.grayLight.900}' },
      border: { value: '{colors.grayLight.700}' },
      borderOutline: { value: '{colors.grayLight.200}' },
      flatBg: { value: '{colors.grayLight.900}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    grayLight: {
      color: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.500}' },
      bg: { value: '{colors.grayLight.50}' },
      border: { value: '{colors.grayLight.200}' },
      borderOutline: { value: '{colors.grayLight.600}' },
      flatBg: { value: '{colors.grayLight.500}' },
      flatText: { value: '{colors.grayLight.50}' },
    },
    brand: {
      color: { value: '{colors.brand.700}' },
      fg: { value: '{colors.brand.500}' },
      bg: { value: '{colors.brand.50}' },
      border: { value: '{colors.brand.200}' },
      borderOutline: { value: '{colors.brand.600}' },
      flatBg: { value: '{colors.brand.600}' },
      flatText: { value: '{colors.brand.50}' },
    },
    error: {
      color: { value: '{colors.error.700}' },
      fg: { value: '{colors.error.500}' },
      bg: { value: '{colors.error.50}' },
      border: { value: '{colors.error.200}' },
      borderOutline: { value: '{colors.error.600}' },
      flatBg: { value: '{colors.error.600}' },
      flatText: { value: '{colors.error.50}' },
    },
    success: {
      color: { value: '{colors.success.700}' },
      fg: { value: '{colors.success.500}' },
      bg: { value: '{colors.success.50}' },
      border: { value: '{colors.success.200}' },
      borderOutline: { value: '{colors.success.600}' },
      flatBg: { value: '{colors.success.600}' },
      flatText: { value: '{colors.success.50}' },
    },
    warning: {
      color: { value: '{colors.warning.700}' },
      fg: { value: '{colors.warning.500}' },
      bg: { value: '{colors.warning.50}' },
      border: { value: '{colors.warning.200}' },
      borderOutline: { value: '{colors.warning.600}' },
      flatBg: { value: '{colors.warning.600}' },
      flatText: { value: '{colors.white}' },
    },
    pink: {
      color: { value: '{colors.pink.700}' },
      fg: { value: '{colors.pink.500}' },
      bg: { value: '{colors.pink.50}' },
      border: { value: '{colors.pink.200}' },
      borderOutline: { value: '{colors.pink.600}' },
      flatBg: { value: '{colors.pink.600}' },
      flatText: { value: '{colors.white}' },
    },
    purple: {
      color: { value: '{colors.purple.700}' },
      fg: { value: '{colors.purple.500}' },
      bg: { value: '{colors.purple.50}' },
      border: { value: '{colors.purple.200}' },
      borderOutline: { value: '{colors.purple.600}' },
      flatBg: { value: '{colors.purple.600}' },
      flatText: { value: '{colors.white}' },
    },
    blue: {
      color: { value: '{colors.blue.700}' },
      fg: { value: '{colors.blue.500}' },
      bg: { value: '{colors.blue.50}' },
      border: { value: '{colors.blue.200}' },
      borderOutline: { value: '{colors.blue.600}' },
      flatBg: { value: '{colors.blue.600}' },
      flatText: { value: '{colors.white}' },
    },
    rose: {
      color: { value: '{colors.rose.700}' },
      fg: { value: '{colors.rose.500}' },
      bg: { value: '{colors.rose.50}' },
      border: { value: '{colors.rose.200}' },
      borderOutline: { value: '{colors.rose.600}' },
      flatBg: { value: '{colors.rose.600}' },
      flatText: { value: '{colors.white}' },
    },
    teal: {
      color: { value: '{colors.teal.700}' },
      fg: { value: '{colors.teal.500}' },
      bg: { value: '{colors.teal.50}' },
      border: { value: '{colors.teal.200}' },
      borderOutline: { value: '{colors.teal.600}' },
      flatBg: { value: '{colors.teal.600}' },
      flatText: { value: '{colors.white}' },
    },
  },
  removeButton: {
    dark: {
      color: { value: '{colors.grayLight.400}' },
      colorHover: { value: '{colors.grayLight.500}' },
      bgHover: { value: '{colors.grayLight.100}' },
    },
    pale: {
      color: { value: '{colors.grayCool.400}' },
      colorHover: { value: '{colors.grayCool.500}' },
      bgHover: { value: '{colors.grayCool.50}' },
    },
    grayLight: {
      color: { value: '{colors.grayLight.400}' },
      colorHover: { value: '{colors.grayLight.500}' },
      bgHover: { value: '{colors.grayLight.100}' },
    },
    brand: {
      color: { value: '{colors.brand.400}' },
      colorHover: { value: '{colors.brand.500}' },
      bgHover: { value: '{colors.brand.100}' },
    },
    error: {
      color: { value: '{colors.error.400}' },
      colorHover: { value: '{colors.error.500}' },
      bgHover: { value: '{colors.error.100}' },
    },
    success: {
      color: { value: '{colors.success.400}' },
      colorHover: { value: '{colors.success.500}' },
      bgHover: { value: '{colors.success.100}' },
    },
    warning: {
      color: { value: '{colors.warning.400}' },
      colorHover: { value: '{colors.warning.500}' },
      bgHover: { value: '{colors.warning.100}' },
    },
    pink: {
      color: { value: '{colors.pink.400}' },
      colorHover: { value: '{colors.pink.500}' },
      bgHover: { value: '{colors.pink.100}' },
    },
    purple: {
      color: { value: '{colors.purple.400}' },
      colorHover: { value: '{colors.purple.500}' },
      bgHover: { value: '{colors.purple.100}' },
    },
    blue: {
      color: { value: '{colors.blue.400}' },
      colorHover: { value: '{colors.blue.500}' },
      bgHover: { value: '{colors.blue.100}' },
    },
    rose: {
      color: { value: '{colors.rose.400}' },
      colorHover: { value: '{colors.rose.500}' },
      bgHover: { value: '{colors.rose.100}' },
    },
    teal: {
      color: { value: '{colors.teal.400}' },
      colorHover: { value: '{colors.teal.500}' },
      bgHover: { value: '{colors.teal.100}' },
    },
  },
  tag: {
    default: {
      bg: { value: '{colors.white}' },
      border: { value: '{colors.grayLight.300}' },
      fg: { value: '{colors.grayLight.700}' },
    },
    hover: {
      bg: { value: '{colors.grayLight.50}' },
      border: { value: '{colors.grayLight.300}' },
      fg: { value: '{colors.grayLight.700}' },
    },
    pressed: {
      bg: { value: '{colors.grayLight.100}' },
      border: { value: '{colors.grayLight.400}' },
      fg: { value: '{colors.grayLight.700}' },
    },
    selected: {
      bg: { value: '{colors.white}' },
      border: { value: '{colors.grayLight.700}' },
      fg: { value: '{colors.grayLight.700}' },
    },
  },
  tab: {
    basic: {
      default: {
        bg: { value: '{colors.transparent}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgFocus: { value: '{colors.white}' },
        scrollButtonsBg: { value: '{colors.grayNeutral.100}' },
      },
      current: {
        bg: { value: '{colors.grayLight.50}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgFocus: { value: '{colors.grayLight.50}' },
      },
    },
    border: {
      bg: { value: '{colors.grayLight.50}' },
      border: { value: '{colors.grayLight.200}' },
      default: {
        bg: { value: '{colors.transparent}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgFocus: { value: '{colors.white}' },
      },
      current: {
        bg: { value: '{colors.white}' },
        bgHover: { value: '{colors.grayLight.50}' },
        bgFocus: { value: '{colors.grayLight.50}' },
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
  modal: {
    bgOverlay: { value: '{colors.alphaDark.70}' },
  },
  gameCard: {
    bgOverlay: { value: '{colors.alphaLight.70}' },
  },
  timer: {
    bgTransparent: { value: '{colors.alphaLight.80}' },
  },
  navItem: {
    gray: {
      fg: { value: '{colors.grayLight.50}' },
      hover: {
        bg: { value: '{colors.grayLight.50}' },
      },
      selected: {
        bg: { value: '{colors.grayLight.100}' },
        color: { value: '{colors.grayLight.700}' },
      },
    },
    teal: {
      fg: { value: '{colors.teal.500}' },
      hover: {
        bg: { value: '{colors.teal.100}' },
        color: { value: '{colors.teal.600}' },
      },
      pressed: {
        bg: { value: '{colors.teal.100}' },
        color: { value: '{colors.teal.600}' },
      },
      selected: {
        bg: { value: '{colors.teal.50}' },
        color: { value: '{colors.teal.600}' },
      },
    },
    rose: {
      fg: { value: '{colors.rose.500}' },
      hover: {
        bg: { value: '{colors.rose.100}' },
        color: { value: '{colors.rose.600}' },
      },
      pressed: {
        bg: { value: '{colors.rose.100}' },
        color: { value: '{colors.rose.600}' },
      },
      selected: {
        bg: { value: '{colors.rose.50}' },
        color: { value: '{colors.rose.600}' },
      },
    },
    purple: {
      fg: { value: '{colors.purple.500}' },
      hover: {
        bg: { value: '{colors.purple.100}' },
        color: { value: '{colors.purple.600}' },
      },
      pressed: {
        bg: { value: '{colors.purple.100}' },
        color: { value: '{colors.purple.600}' },
      },
      selected: {
        bg: { value: '{colors.purple.50}' },
        color: { value: '{colors.purple.600}' },
      },
    },
  },
  marker: {
    bg: { value: '{colors.orangeDark.600}' },
    fg: { value: '{colors.white}' },
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
  datePicker: {
    fgFocus: { value: '{colors.white}' },
    bgFocus: { value: '{colors.brand.400}' },
  },
  featuredCard: {
    bg: { value: '{colors.brand.50}' },
    borderHover: { value: '{colors.brand.300}' },
  },
  tabBar: { fg: { value: '{colors.fg.quinary}' } },
});
