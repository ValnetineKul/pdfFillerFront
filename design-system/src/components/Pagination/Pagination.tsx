import { Icon } from '@front/icons';
import type { FocusEvent, KeyboardEvent, ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Key } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';

import { paginationRecipe } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import { Select, SelectItem } from '../Select';
import { TextField } from '../TextField';
import {
  DOTS,
  getPaginationRange,
  pageInputFromEventTarget,
  readSanitizedPageInputFromEvent,
} from './helpers';
import {
  createPageSizeItems,
  getProportionalPageIndex,
  normalizePageSizeOptions,
  normalizePaginationState,
  parsePageInputToPageNumber,
  sanitizeDigitsInput,
  toNonNegativeInt,
} from './logic';
import type { PaginationProps } from './types';

export const Pagination = (props: PaginationProps): ReactElement => {
  const [variantProps] = paginationRecipe.splitVariantProps(props);

  const {
    pageIndex = 0,
    pageCount = 0,
    siblingCount = 1,
    isLoading = false,
    theme = 'default',
    hidePageChanger = false,
    hideNavigationLabels = false,
    hidePageInput = false,
    pageSize,
    initialPageInputValue,
    pageSizeOptions,
    onPageSizeChange,
    messages,
    onPrevious,
    onPage,
    onNext,
    prevButtonProps,
    nextButtonProps,
    pageButtonProps,
  } = props;

  const {
    normalizedPageCount,
    lastPageIndex,
    normalizedPageIndex,
    normalizedSiblingCount,
    currentPageNumber,
    lastPageNumber,
    initialInputValue,
  } = useMemo(
    () =>
      normalizePaginationState({
        pageIndex,
        pageCount,
        siblingCount,
        initialPageInputValue,
      }),
    [initialPageInputValue, pageCount, pageIndex, siblingCount],
  );
  const normalizedPageSizeOptions = useMemo(
    () => normalizePageSizeOptions(pageSizeOptions),
    [pageSizeOptions],
  );
  const [inputPageValue, setInputPageValue] = useState<string>(
    initialInputValue ? String(initialInputValue) : '',
  );
  const [isPageInputFocused, setIsPageInputFocused] = useState(false);
  const isFirstInputSync = useRef(true);

  useEffect(() => {
    if (isFirstInputSync.current) {
      isFirstInputSync.current = false;
      return;
    }
    setInputPageValue(String(currentPageNumber));
  }, [currentPageNumber]);

  const normalizedPageSize = toNonNegativeInt(pageSize ?? 0);
  const hasPageSizeControl =
    normalizedPageSizeOptions.length > 0 && normalizedPageSize > 0;
  const pageSizeItems = useMemo(
    () =>
      createPageSizeItems(
        normalizedPageSizeOptions,
        messages?.pageSizeOptionLabel,
      ),
    [messages?.pageSizeOptionLabel, normalizedPageSizeOptions],
  );

  const classes = paginationRecipe({ ...variantProps, theme });
  const pageRange = useMemo(
    () =>
      getPaginationRange({
        pageIndex: normalizedPageIndex,
        pageCount: normalizedPageCount,
        siblingCount: normalizedSiblingCount,
      }),
    [normalizedPageCount, normalizedPageIndex, normalizedSiblingCount],
  );

  const isPaginationEmpty = normalizedPageCount === 0;
  const isPageInputDisabled = isLoading || isPaginationEmpty;
  const resolvedPageInputPlaceholder =
    messages?.pageInputPlaceholder ?? `1 - ${lastPageNumber}`;
  const resolvedPageInputValue = isPageInputFocused ? inputPageValue : '';

  const commitPageInputValue = useCallback(
    (rawValue: string): number | null => {
      if (isLoading || normalizedPageCount === 0) {
        return null;
      }

      const targetPageNumber = parsePageInputToPageNumber(
        rawValue,
        normalizedPageCount,
      );

      if (!targetPageNumber) {
        return null;
      }

      const targetPageIndex = targetPageNumber - 1;

      if (targetPageIndex !== normalizedPageIndex) {
        onPage?.(targetPageIndex);
      }

      return targetPageNumber;
    },
    [isLoading, normalizedPageCount, normalizedPageIndex, onPage],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      pageInputFromEventTarget(e.target)?.blur();
      return;
    }

    if (e.key === 'Escape') {
      setInputPageValue('');
      pageInputFromEventTarget(e.target)?.blur();
    }
  }, []);

  const handleFocus = (): void => {
    setIsPageInputFocused(true);
    setInputPageValue('');
  };

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLElement>): void => {
      setIsPageInputFocused(false);
      const raw = readSanitizedPageInputFromEvent(e.target);
      commitPageInputValue(raw);
      setInputPageValue('');
    },
    [commitPageInputValue],
  );

  const handlePageInput = useCallback((rawValue: string): void => {
    setInputPageValue(sanitizeDigitsInput(rawValue));
  }, []);

  const handlePageSizeChange = useCallback(
    (key: Key | null): void => {
      if (key === null) return;
      const nextPageSize = toNonNegativeInt(Number(key));
      if (nextPageSize <= 0) return;

      if (onPage && normalizedPageSize > 0 && normalizedPageCount > 0) {
        const nextPageIndex = getProportionalPageIndex({
          currentPageIndex: normalizedPageIndex,
          currentPageCount: normalizedPageCount,
          currentPageSize: normalizedPageSize,
          nextPageSize,
        });

        if (nextPageIndex !== normalizedPageIndex) {
          onPage(nextPageIndex);
        }
      }

      onPageSizeChange?.(nextPageSize);
    },
    [
      normalizedPageCount,
      normalizedPageIndex,
      normalizedPageSize,
      onPage,
      onPageSizeChange,
    ],
  );

  const handlePrevPress = useCallback(() => {
    if (isLoading || normalizedPageIndex <= 0) return;

    if (onPrevious) {
      onPrevious();
      return;
    }

    onPage?.(normalizedPageIndex - 1);
  }, [isLoading, normalizedPageIndex, onPage, onPrevious]);

  const handleNextPress = useCallback(() => {
    if (isLoading || normalizedPageIndex >= lastPageIndex) return;

    if (onNext) {
      onNext();
      return;
    }

    onPage?.(normalizedPageIndex + 1);
  }, [isLoading, lastPageIndex, normalizedPageIndex, onNext, onPage]);
  const handleFirstPress = useCallback(() => {
    if (isLoading || normalizedPageCount === 0 || normalizedPageIndex <= 0)
      return;
    onPage?.(0);
  }, [isLoading, normalizedPageCount, normalizedPageIndex, onPage]);
  const handleLastPress = useCallback(() => {
    if (
      isLoading ||
      normalizedPageCount === 0 ||
      normalizedPageIndex >= lastPageIndex
    ) {
      return;
    }
    onPage?.(lastPageIndex);
  }, [
    isLoading,
    lastPageIndex,
    normalizedPageCount,
    normalizedPageIndex,
    onPage,
  ]);

  const isFirstPage = normalizedPageIndex === 0;
  const isLastPage = normalizedPageIndex === lastPageIndex;
  const pageSizeControl = hasPageSizeControl ? (
    <div className={classes.pageSizeSelectWrapper}>
      <Select<{ id: string; label: string; value: number }>
        aria-label={messages?.pageSizeAriaLabel}
        selectedKey={String(normalizedPageSize)}
        onSelectionChange={handlePageSizeChange}
        items={pageSizeItems}
      >
        {(item) => (
          <SelectItem id={item.id} textValue={item.label}>
            <span className={classes.pageSizeSelectItemLabel}>
              {item.label}
            </span>
          </SelectItem>
        )}
      </Select>
    </div>
  ) : null;

  return (
    <nav
      className={classes.wrapper}
      aria-label={messages?.navigationAriaLabel}
      data-loading={isLoading}
    >
      <div className={classes.desktopOnly}>
        <div className={classes.prev}>
          <IconButton
            size="lg"
            variant="outline"
            colorScheme="secondary"
            isDisabled={isFirstPage || isLoading || isPaginationEmpty}
            onPress={handlePrevPress}
            aria-label={messages?.previousAriaLabel}
            className={classes.navButton}
            {...prevButtonProps}
          >
            <Icon name="arrows/chevron-left" className={classes.icon} />
            {!hideNavigationLabels && messages?.previousLabel}
          </IconButton>
        </div>
        <div className={classes.next}>
          <IconButton
            size="lg"
            variant="outline"
            colorScheme="secondary"
            isDisabled={isLastPage || isLoading || isPaginationEmpty}
            onPress={handleNextPress}
            aria-label={messages?.nextAriaLabel}
            className={classes.navButton}
            {...nextButtonProps}
          >
            {!hideNavigationLabels && messages?.nextLabel}
            <Icon name="arrows/chevron-right" className={classes.icon} />
          </IconButton>
        </div>
        {!hidePageChanger ? (
          <ul className={classes.changer}>
            {pageRange.map((page, index) => {
              if (page === DOTS) {
                return (
                  <li
                    key={`dots-${index}`}
                    className={classes.button}
                    data-dot="true"
                  >
                    <p>{DOTS}</p>
                  </li>
                );
              }

              if (typeof page !== 'number') {
                return null;
              }

              return (
                <li key={page} className={classes.pageItem}>
                  <AriaButton
                    type="button"
                    className={classes.button}
                    data-active={page === currentPageNumber}
                    isDisabled={isLoading}
                    onPress={() => onPage?.(page - 1)}
                    aria-label={messages?.pageAriaLabel?.(page)}
                    aria-current={
                      page === currentPageNumber ? 'page' : undefined
                    }
                    {...pageButtonProps?.(page)}
                  >
                    {page}
                  </AriaButton>
                </li>
              );
            })}
          </ul>
        ) : (
          <div
            className={classes.changer}
            slot="pageChangerInfo"
            aria-live="polite"
          >
            {messages?.shortPageInfo?.({
              pageIndex: normalizedPageIndex,
              pageCount: normalizedPageCount,
            })}
          </div>
        )}
        {!hidePageInput && (
          <div className={classes.pageInputGroup}>
            {messages?.goToPageLabel && (
              <span className={classes.goToPageLabel}>
                {messages.goToPageLabel}
              </span>
            )}
            <div className={classes.pageInputWrapper}>
              <TextField
                aria-label={messages?.goToPageLabel}
                className={classes.pageInput}
                value={resolvedPageInputValue}
                isDisabled={isPageInputDisabled}
                inputMode="numeric"
                onInput={(event) => {
                  handlePageInput(event.currentTarget.value);
                }}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder={resolvedPageInputPlaceholder}
              />
            </div>
          </div>
        )}
        {pageSizeControl}
      </div>

      <div className={classes.mobileOnly}>
        {pageSizeControl}
        <div className={classes.mobileControls}>
          <IconButton
            variant="link"
            colorScheme="secondary"
            isDisabled={isFirstPage || isLoading || isPaginationEmpty}
            onPress={handleFirstPress}
            aria-label={messages?.firstPageAriaLabel}
            size="sm"
            className={classes.mobileNavButton}
          >
            <Icon
              className={classes.mobileNavButtonIcon}
              name="arrows/chevron-left-double"
            />
          </IconButton>

          <IconButton
            variant="link"
            colorScheme="secondary"
            isDisabled={isFirstPage || isLoading || isPaginationEmpty}
            onPress={handlePrevPress}
            aria-label={messages?.previousAriaLabel}
            size="sm"
            className={classes.mobileNavButton}
            {...prevButtonProps}
          >
            <Icon
              className={classes.mobileNavButtonIcon}
              name="arrows/chevron-left"
            />
          </IconButton>

          <div className={classes.mobilePageFieldWrapper}>
            <TextField
              aria-label={messages?.goToPageLabel}
              className={classes.mobilePageInput}
              value={
                isPageInputFocused ? inputPageValue : String(currentPageNumber)
              }
              isDisabled={isPageInputDisabled}
              inputMode="numeric"
              onInput={(event) => {
                handlePageInput(event.currentTarget.value);
              }}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={String(currentPageNumber)}
            />
            <span className={classes.mobilePageTotalSeparator}>/</span>
            <span className={classes.mobilePageTotal}>{lastPageNumber}</span>
          </div>

          <IconButton
            variant="link"
            colorScheme="secondary"
            isDisabled={isLastPage || isLoading || isPaginationEmpty}
            onPress={handleNextPress}
            aria-label={messages?.nextAriaLabel}
            size="sm"
            className={classes.mobileNavButton}
            {...nextButtonProps}
          >
            <Icon
              className={classes.mobileNavButtonIcon}
              name="arrows/chevron-right"
            />
          </IconButton>

          <IconButton
            variant="link"
            colorScheme="secondary"
            isDisabled={isLastPage || isLoading || isPaginationEmpty}
            onPress={handleLastPress}
            aria-label={messages?.lastPageAriaLabel}
            size="sm"
            className={classes.mobileNavButton}
          >
            <Icon
              className={classes.mobileNavButtonIcon}
              name="arrows/chevron-right-double"
            />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};
