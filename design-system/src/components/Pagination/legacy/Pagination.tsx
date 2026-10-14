import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Button as AriaButton, Text } from 'react-aria-components';

import { css } from '#styled-system/css';
import { paginationLegacyRecipe as paginationRecipe } from '#styled-system/recipes';

import { Button } from '../../Button';
import { IconButton } from '../../IconButton';
import { NumberField } from '../../NumberField';
import { DEFAULT_PAGINATION_PAGE } from './constants';
import { DOTS, getPaginationRange } from './helpers';
import type { PaginationLegacyProps } from './types';

/**
 * @deprecated('Рекомендуется использовать компонент Pagination вместо PaginationLegacy')
 * @description
 * Пагинация часто используется для улучшения производительности и удобства работы пользователей с большими наборами данных. Вместо навигации между отдельными страницами пользователи взаимодействуют с различными частями одного и того же набора данных.
 *
 * Компонент пагинации включает элементы управления для навигации по подмножествам данных, такие как кнопки «Предыдущая» и «Следующая», а также номера страниц. Он может адаптироваться, обеспечивая удобство использования на различных устройствах и экранах.
 *
 ** ## Особенности
 *
 * - **Доступность**: Компоненты пагинации совместимы с вспомогательными технологиями. Навигация с клавиатуры и правильное управление фокусом.
 * - **Адаптивность**: Компоненты пагинации адаптируются к различным размерам экрана и устройствам.
 * - **Интерактивность**: Включает кнопки «Предыдущая» и «Следующая», номера страниц и кнопки для перехода к первым и последним подмножествам данных.
 *
 * ## Полезная информация
 * - Элемент выбора количества элементов на странице не является частью композиции компонента Pagination. Чтобы реализовать выбор количество элементов
 * для шага пагинации, например показать 20 элементов, необходимо использовать компонент Select отдельно.
 *
 */

export const Pagination = (props: PaginationLegacyProps): ReactElement => {
  const {
    pageIndex = 0,
    pageCount = 0,
    pageChangerPosition = 'center',
    countShowPageChanger = 3,
    theme = 'default',
    hidePageChanger = false,
    hideNavigationLabels = false,
    hidePageInput = false,
    messages = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      goToPageLabel: 'Page',
      goToPageButton: 'Go',
      pageInputPlaceholder: 'Page',
      previousAriaLabel: 'Go to previous page',
      nextAriaLabel: 'Go to next page',
      shortPageInfo: (pageInfo) =>
        `${pageInfo.pageIndex + 1} of ${pageInfo.pageCount}`,
    },
    onPrevious,
    onPage,
    onNext,
  } = props;

  const [pageValue, setPageValue] = useState<number>(DEFAULT_PAGINATION_PAGE);

  const classes = paginationRecipe({
    theme,
    pageChangerPosition,
  });

  const pageRange = useMemo(
    () =>
      getPaginationRange({
        pageIndex,
        pageCount,
      }),
    [pageIndex, pageCount, countShowPageChanger],
  );

  const isThemeDefault = theme === 'default';
  const buttonSize = isThemeDefault ? 'lg' : 'md';
  const hasGoToPageLabel = !!messages.goToPageLabel;

  return (
    <div className={classes.wrapper}>
      <div className={classes.prev}>
        {hideNavigationLabels ? (
          <IconButton
            colorScheme="secondary"
            onPress={onPrevious}
            variant={'outline'}
            isDisabled={pageIndex === 0}
            aria-label={messages.previousAriaLabel}
            size={buttonSize}
          >
            <Icon
              name="arrows/arrow-left"
              className={css({ iconSize: 'md' })}
            />
          </IconButton>
        ) : (
          <Button
            colorScheme="secondary"
            onPress={onPrevious}
            variant={'outline'}
            isDisabled={pageIndex === 0}
            aria-label={messages.previousAriaLabel}
            size={buttonSize}
          >
            <Icon
              name="arrows/arrow-left"
              className={css({ iconSize: 'md' })}
            />
            {messages.previousLabel}
          </Button>
        )}
      </div>
      <div className={classes.changer}>
        {hidePageChanger ? (
          <div slot={'pageChangerInfo'}>
            {messages.shortPageInfo?.({ pageIndex, pageCount })}
          </div>
        ) : (
          pageRange.map((page, index) => {
            if (page === DOTS) {
              return (
                <AriaButton
                  key={DOTS + '' + index}
                  className={classes.button}
                  data-dot
                >
                  {DOTS}
                </AriaButton>
              );
            }

            return (
              <AriaButton
                key={page + '' + index}
                className={classes.button}
                data-active={pageIndex + 1 === page}
                onPress={() => {
                  onPage?.(page - 1);
                }}
              >
                {page}
              </AriaButton>
            );
          })
        )}
      </div>
      {isThemeDefault && !hidePageInput && (
        <div className={classes.pageInputGroup}>
          <div className={classes.pageInputWrapper}>
            {hasGoToPageLabel && (
              <Text className={classes.goToPageLabel}>
                {messages.goToPageLabel}
              </Text>
            )}
            <div className={classes.pageInput}>
              <NumberField
                aria-label={messages.goToPageLabel}
                step={1}
                placeholder={messages.pageInputPlaceholder}
                minValue={1}
                maxValue={pageCount}
                onChange={(value) => setPageValue(value - 1)}
              />
            </div>
          </div>

          <Button
            colorScheme="secondary"
            size="lg"
            onPress={() => onPage?.(pageValue || DEFAULT_PAGINATION_PAGE)}
            variant={'outline'}
            noWrap
          >
            {messages.goToPageButton}
          </Button>
        </div>
      )}
      <div className={classes.next}>
        {hideNavigationLabels ? (
          <IconButton
            colorScheme="secondary"
            onPress={onNext}
            variant={'outline'}
            isDisabled={pageIndex === pageCount - 1}
            aria-label={messages.nextAriaLabel}
            size={buttonSize}
          >
            <Icon
              name="arrows/arrow-right"
              className={css({ iconSize: 'md' })}
            />
          </IconButton>
        ) : (
          <Button
            colorScheme="secondary"
            onPress={onNext}
            variant={'outline'}
            isDisabled={pageIndex === pageCount - 1}
            aria-label={messages.nextAriaLabel}
            size={buttonSize}
          >
            {messages.nextLabel}
            <Icon
              name="arrows/arrow-right"
              className={css({ iconSize: 'md' })}
            />
          </Button>
        )}
      </div>
    </div>
  );
};
