import type { FC } from 'react';
import { useId } from 'react-aria';
import type { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { Switch as AriaSwitch } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { switchIndicatorRecipe, switchRecipe } from '#styled-system/recipes';

import { Spinner } from '../Loader';

export interface SwitchProps extends AriaSwitchProps, DataAttributes {
  description?: string;
  isPending?: boolean;
  reverse?: boolean;
  fullWidth?: boolean;
}

/**
 *  Переключатели позволяют пользователям включать или выключать отдельную опцию.
 *  Обычно они используются для активации или деактивации определенной настройки.
 *
 *  ## Содержание
 *  - Переключатели принимают дочерние элементы, которые отображаются как ярлык (label).
 *  - Переключатели, не могут иметь состояние ошибки.
 *
 *  ## Значение
 * - Переключатели по умолчанию не выбраны.
 * - для установки состояния по умолчанию используйте свойство **defaultSelected** можно.
 * - Переключатель по умолчанию неконтролируемый.
 * - **isSelected** используется для передачи управления состоянием.
 */

export const Switch: FC<SwitchProps> = (props) => {
  const [variantProps, otherProps] = switchRecipe.splitVariantProps(props);
  const { children, description } = otherProps;
  const { isPending, isDisabled } = variantProps;

  const classNames = switchRecipe(variantProps);
  const descriptionId = useId();
  const isDisabledSwitch = isPending || isDisabled;
  const hasLabel = !!children;

  return (
    <div>
      <AriaSwitch
        {...props}
        className={classNames.root}
        isDisabled={isDisabledSwitch}
      >
        {(renderProps) => {
          const [indicatorVariantProps] =
            switchIndicatorRecipe.splitVariantProps(renderProps);

          const indicatorClassNames = switchIndicatorRecipe({
            ...indicatorVariantProps,
            isPending,
          });

          return (
            <>
              <div slot="indicator" className={indicatorClassNames.root}>
                <span className={indicatorClassNames.handle}>
                  {isPending && <Spinner size="sm" />}
                </span>
              </div>
              {hasLabel && (
                <div className={indicatorClassNames.label}>
                  {typeof children === 'function'
                    ? children(renderProps)
                    : children}
                </div>
              )}
            </>
          );
        }}
      </AriaSwitch>
      {description && (
        <span id={descriptionId} className={classNames.description}>
          {description}
        </span>
      )}
    </div>
  );
};
