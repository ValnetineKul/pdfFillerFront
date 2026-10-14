import { defineSemanticTokens } from '@pandacss/dev';

export const radii = defineSemanticTokens.radii({
  none: { value: '0' },
  full: { value: '100%' },
  button: { value: '{radii.2}' },
  tabs: {
    wrapper: {
      buttonWhiteBorder: { value: '{radii.2.5}' },
      buttonFilledGray: { value: '{radii.2}' },
      modern: { value: '{radii.2}' },
    },
    item: {
      buttonWhiteBorder: { value: '{radii.1.5}' },
      buttonFilledGray: { value: '{radii.1.5}' },
      modern: { value: '{radii.2}' },
    },
    leftButton: {
      buttonWhiteBorder: { value: '{radii.2}' },
      buttonFilledGray: { value: '{radii.2}' },
      modern: { value: '{radii.2}' },
      modernScroll: { value: '8px 0px 0px 8px' },
    },
    rightButton: {
      buttonWhiteBorder: { value: '{radii.2}' },
      buttonFilledGray: { value: '{radii.2}' },
      modern: { value: '{radii.2}' },
      modernScroll: { value: '0px 8px 8px 0px' },
    },
  },
  checkbox: {
    control: {
      value: '{radii.1}',
    },
  },
  featuredIcon: {
    square: {
      value: '{radii.1.5}',
    },
    modern: {
      value: '{radii.2.5}',
    },
    circle: {
      value: '{radii.full}',
    },
  },
  disclosure: {
    trigger: {
      value: '{radii.1.5}',
    },
  },
  otpField: {
    input: {
      value: '{radii.2}',
    },
  },
  glowPulseBorder: {
    value: '{radii.2}',
  },
  textField: {
    input: {
      value: '{radii.2}',
    },
    inputWrapper: {
      value: '{radii.2}',
    },
    addon: {
      value: '{radii.2}',
    },
  },
  dropDownListItem: {
    root: {
      value: '{radii.2}',
    },
  },
  select: {
    list: {
      value: '{radii.2}',
    },
    dropdown: {
      value: '{radii.2}',
    },
    trigger: {
      value: '{radii.2}',
    },
  },
  combobox: {
    list: {
      value: '{radii.2}',
    },
    dropdown: {
      value: '{radii.2}',
    },
    group: {
      value: '{radii.2}',
    },
  },
  multiSelect: {
    fieldGroup: {
      value: '{radii.2}',
    },
    tag: {
      value: '{radii.2}',
    },
    button: {
      value: '{radii.2}',
    },
    popover: {
      value: '{radii.2}',
    },
    listBoxItem: {
      value: '{radii.2}',
    },
  },
  datePicker: {
    wrapper: {
      value: '{radii.2}',
    },
    input: {
      default: { value: '{radii.2}' },
      focused: { value: '{radii.1}' },
    },
    popover: {
      value: '{radii.4}',
    },
  },
  calendarMultiMonth: {
    value: '{radii.2}',
  },
  tagGroup: {
    item: {
      value: '{radii.1.5}',
    },
  },
  tooltip: {
    root: {
      value: '{radii.2}',
    },
  },
  modal: {
    root: {
      value: '{radii.3}',
    },
  },
  badge: {
    badgeType: {
      value: '{radii.1.5}',
    },
  },
  navigationItem: {
    item: {
      value: '{radii.1.5}',
    },
  },
  pagination: {
    default: {
      button: {
        value: '{radii.2}',
      },
    },
    group: {
      start: { value: '{radii.1.5}' },
      end: { value: '{radii.1.5}' },
    },
  },
  featuredCard: {
    root: {
      value: '{radii.2}',
    },
  },
  closeButton: {
    value: '{radii.1}',
  },
  removeButton: {
    root: {
      value: '{radii.1}',
    },
  },
  tabBar: {
    item: {
      before: {
        value: '0 0 1px 1px',
      },
    },
  },
  menu: { root: { value: '{radii.2}' } },
  popover: { root: { value: '{radii.2}' }, content: { value: '{radii.2}' } },
  pickerField: {
    control: { value: '{radii.2}' },
    option: { value: '{radii.2}' },
    menuList: { value: '{radii.2}' },
    multiValue: { value: '{radii.1.5}' },
    noOptionsIcon: { value: '{radii.2}' },
    dropdownIndicator: { value: '{radii.2}' },
    clearIndicator: { value: '{radii.2}' },
  },
  fileUploadCard: { root: { value: '{radii.3}' } },
  dropZone: { root: { value: '{radii.2}' } },
  timer: {
    big: { value: '{radii.2}' },
    small: { value: '{radii.1.5}' },
    solid: { value: '{radii.2}' },
  },
});
