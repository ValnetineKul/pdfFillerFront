/**
 * @deprecated
 * Реэкспорт компонентов из react-aria-components без "обвесов".
 * Нужно исключительно для CAP
 */

export type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
export {
  Button as AriaButton,
  Checkbox as AriaCheckbox,
  OverlayArrow as AriaOverlayArrow,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList as AriaTagList,
  type TagListProps as AriaTagListProps,
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components';
