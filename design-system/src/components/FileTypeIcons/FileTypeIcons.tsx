import { Icon } from '@front/icons';
import type { FC } from 'react';

import { css } from '#styled-system/css';
import type { FileTypeIconsRecipeVariantProps } from '#styled-system/recipes';
import { fileTypeIconsRecipe } from '#styled-system/recipes';

import { additionalImageMimeTypes, iconMap } from './mock';

type DocumentIconProps = {
  fileType?: string;
} & FileTypeIconsRecipeVariantProps;

export const FileTypeIcons: FC<DocumentIconProps> = (props) => {
  const [variantProps, otherProps] =
    fileTypeIconsRecipe.splitVariantProps(props);
  const classNames = fileTypeIconsRecipe(variantProps);

  const lowerType = otherProps?.fileType?.toLowerCase() || '';

  let iconName = iconMap[lowerType];

  if (
    !iconName &&
    lowerType.startsWith('image/') &&
    additionalImageMimeTypes.includes(lowerType)
  ) {
    iconName = 'images/image-01';
  }

  if (!iconName) {
    iconName = 'files/file-question-01';
  }

  return (
    <div {...otherProps} className={classNames.root}>
      <Icon name={iconName} className={css({ iconSize: 'md' })} />
    </div>
  );
};
