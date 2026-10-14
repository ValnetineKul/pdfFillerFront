import type { ReactElement } from 'react';

import type { LoaderRecipeVariantProps } from '#styled-system/recipes';
import { loaderRecipe, spinnerRecipe } from '#styled-system/recipes';

import { Spinner } from './Spinner';

export type LoaderProps = {
  text?: string;
} & LoaderRecipeVariantProps;

/**
 * ## Loader
 *
 * Компонент загрузчика представляет собой элементы индикатора загрузки или предварительной загрузки, используемые для отображения процесса загрузки или извлечения данных. Этот компонент также может использоваться в кнопках, когда кнопка находится в состоянии `isPending`, показывая пользователям, что операция в процессе выполнения.
 *
 * ### Особенности
 *
 * - **Разнообразные размеры** — Компонент загрузчика поддерживает различные размеры, позволяя пользователям выбрать подходящий вариант для их интерфейса.
 * - **Текстовое сообщение** — Загрузчик может принимать текст для отображения, чтобы предоставить пользователям дополнительный контекст о процессе загрузки.
 * - **Использование** — Используется для отображения состояния загрузки при выполнении асинхронных операций, таких как загрузка данных с сервера или отправка форм.
 *
 * Loader помогает улучшить пользовательский интерфейс, предоставляя визуальные подсказки о текущем состоянии загрузки и ожидая, пока процесс завершится.
 *
 */
export function Loader(props: LoaderProps): ReactElement {
  const { text } = props;
  const classNames = loaderRecipe(props);
  const [spinnerProps] = spinnerRecipe.splitVariantProps(props);
  return (
    <div className={classNames.root}>
      <Spinner {...spinnerProps} />
      {text && <span className={classNames.text}>{text}</span>}
    </div>
  );
}
