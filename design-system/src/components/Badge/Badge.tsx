import type { PropsWithChildren, ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { makeColorLighter } from '#shared/utils/makeColorLighter';
import type { BadgeRecipeVariantProps } from '#styled-system/recipes';
import { badgeRecipe } from '#styled-system/recipes';
import { token } from '#styled-system/tokens';

export type BadgeProps = PropsWithChildren<
  BadgeRecipeVariantProps & {
    customColor?: string;
  }
> &
  DataAttributes;

/**
 * Бейджи – это небольшие визуальные элементы, которые представляют собой метки информации, такую как уведомления, статус или категории.
 * Бейджи могут использоваться отдельно.
 *
 * ## Использование
 *
 * Бейджи часто применяются для отображения краткой информации, такой как количество уведомлений, статусы или метки на элементах интерфейса. Они могут быть использованы как самостоятельные компоненты, чтобы привлечь внимание к важной информации или дополнить другие элементы интерфейса.
 *
 * В отличие от бейджей, теги (Tag) предназначены для использования только в коллекции TagGroup, что делает их более специфичными для определённых случаев использования, таких как отображение выбранных фильтров или категорий.
 *
 * ## Особенности
 *
 * - **Гибкость**: Бейджи могут использоваться отдельно, обеспечивая больше возможностей для кастомизации и стилизации.
 * - **Информативность**: Бейджи могут содержать текст, иконки или другие визуальные элементы, чтобы эффективно передавать информацию пользователю.
 * - **Стилизация**: Бейджи можно настраивать по цвету, размеру и форме, что позволяет им хорошо вписываться в общий стиль приложения.
 * - **Динамичность**: Бейджи могут изменяться в зависимости от состояния или контекста, например, меняя цвет при наличии новых уведомлений.
 *
 * ## Примечание
 *
 * Хотя бейджи могут использоваться отдельно, теги предназначены только для использования в коллекции TagGroup, что придаёт им определённый контекст и цель. Убедитесь, что вы используете бейджи и теги в соответствии с их предназначением для достижения наилучшего пользовательского опыта.
 */

export function Badge(props: BadgeProps): ReactElement {
  const { customColor, ...rest } = props;
  const [variantProps, otherProps] = badgeRecipe.splitVariantProps(rest);

  const className = badgeRecipe(variantProps);

  const isLabel = variantProps.type === 'label';

  const customStyle =
    variantProps.colorScheme === 'custom' && customColor
      ? isLabel
        ? {
            color: token('colors.white'),
            backgroundColor: customColor,
            borderColor: customColor,
          }
        : {
            color: customColor,
            backgroundColor: makeColorLighter(customColor, 80),
            borderColor: makeColorLighter(customColor, 50),
          }
      : {};

  return <div {...otherProps} className={className} style={customStyle} />;
}
