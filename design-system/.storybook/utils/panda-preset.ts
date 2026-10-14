import type { Preset } from '@pandacss/dev';
import type { CSSProperties } from 'react';

export type ColorPalette = Array<{
  key: string;
  value: Record<string, string>;
}>;

export const getColorPaletteFromPreset = (preset: Preset): ColorPalette => {
  const { colors } = preset.theme?.tokens ?? {};

  if (!colors) {
    return [];
  }

  return Object.entries(colors).map(([key, value]) => {
    const colorGroupKeys = Object.keys(value);
    if (colorGroupKeys.includes('value')) {
      const singleColorValue = value as { value: string };
      return { key, value: { '100%': singleColorValue.value } };
    } else {
      const preparedColorGroups = colorGroupKeys.reduce(
        (result: Record<string, string>, colorItemKey) => {
          const groupColorValue = value as Record<string, { value: string }>;
          result[colorItemKey] = groupColorValue[colorItemKey].value;
          return result;
        },
        {},
      );
      return { key, value: preparedColorGroups };
    }
  });
};

export const getTextStylesFromPreset = (
  preset: Preset,
): {
  display: Record<string, CSSProperties>;
  regular: Record<string, CSSProperties>;
} => {
  const textStyles = preset.theme?.textStyles ?? {};
  const { display, ...regularTextStyles } = textStyles;

  return {
    display: Object.entries(display).reduce(
      (acc, [key, { value }]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
    regular: Object.entries(regularTextStyles).reduce(
      (acc, [key, { value }]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  };
};

export const getSpacingFromPreset = (
  spacing: Preset,
): {
  main: Array<Array<string>>;
  fractional: Array<Array<string>>;
} => {
  const spacingSteps = spacing.theme?.tokens?.spacing ?? {};

  const numericEntries: Array<Array<string>> = [];
  const fractionalEntries: Array<Array<string>> = [];

  Object.entries(spacingSteps).forEach(([key, { value }]) => {
    const entry = [key, value.toString()] as [string, string];
    if (key.includes('/')) {
      fractionalEntries.push(entry);
    } else {
      numericEntries.push([parseFloat(key).toString(), entry[1]]);
    }
  });

  numericEntries.sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB));

  return {
    main: numericEntries,
    fractional: fractionalEntries,
  };
};
