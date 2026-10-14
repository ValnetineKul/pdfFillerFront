import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Form, WithTooltip } from 'storybook/internal/components';

import type { ColorPalette } from '../../utils/panda-preset';
import {
  Category,
  Color,
  ColorBox,
  ColorsRow,
  ColorTitle,
  Title,
  TooltipContent,
  Wrapper,
} from './ColorGallery.styled';

export const ColorGallery: FC<{ colors: ColorPalette }> = ({ colors }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onCopyToken = (tokenName: string): void => {
    navigator.clipboard.writeText(tokenName).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const filteredColors = useMemo(
    () =>
      colors.filter(({ key }) => {
        const searchValueLowered = searchValue.toLowerCase().trim();

        if (!searchValueLowered) return true;

        const keyIncludesSearch = key
          .toLowerCase()
          .includes(searchValueLowered);

        return keyIncludesSearch;
      }),
    [colors, searchValue],
  );

  return (
    <Wrapper>
      <Form.Input
        type="text"
        placeholder="Search colors..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      {filteredColors.map(({ key, value }) => (
        <Category key={key}>
          <Title>{key}</Title>
          <ColorsRow>
            {Object.entries(value).map(([colorGrade, hex]) => {
              const isPrimaryColor = colorGrade === '100%';
              const tokenName =
                key +
                (isPrimaryColor ? '' : colorGrade ? '.' + colorGrade : '');

              return (
                <WithTooltip
                  key={colorGrade}
                  tooltip={
                    <TooltipContent>
                      Copied: <b>{tokenName}</b>
                    </TooltipContent>
                  }
                  withArrows
                  closeOnOutsideClick
                  style={{ display: 'block', width: '100%' }}
                >
                  <Color onClick={() => onCopyToken(tokenName)}>
                    <ColorBox style={{ '--hex': hex }} />
                    <ColorTitle>
                      {!isPrimaryColor && (
                        <>
                          <strong>{colorGrade}</strong>
                          <br />
                        </>
                      )}
                      {hex}
                    </ColorTitle>
                  </Color>
                </WithTooltip>
              );
            })}
          </ColorsRow>
        </Category>
      ))}
    </Wrapper>
  );
};
