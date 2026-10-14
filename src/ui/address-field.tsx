import { useEffect, useRef, useState } from 'react';

import { TextArea } from '@/design-system';
import { searchAddresses, type AddressSuggestion } from '@/ui/address-suggest';
import {
  addressFieldClass,
  addressSuggestionClass,
  addressSuggestionsClass,
} from '@/ui/styles';

export function AddressField({
  label,
  value,
  invalid,
  error,
  scope,
  autoFocus,
  isDisabled = false,
  isRequired = true,
  onValue,
  onCommit,
  onBlur,
}: {
  label: string;
  value: string;
  scope: 'ru' | 'world';
  invalid?: boolean;
  error?: string;
  autoFocus?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onValue: (value: string) => void;
  onCommit: (value: string) => void;
  onBlur?: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<Array<AddressSuggestion>>([]);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    const textarea = rootRef.current?.querySelector('textarea');
    if (!textarea) {
      return;
    }
    textarea.style.height = '0px';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 96)}px`;
  }, [value]);

  useEffect(() => {
    const query = value.trim();
    if (isDisabled || query.length < 3) {
      setSuggestions([]);
      setLookupError('');
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void searchAddresses(query, controller.signal, scope)
        .then((next) => {
          setSuggestions(next);
          setLookupError('');
        })
        .catch((reason: unknown) => {
          if (reason instanceof DOMException && reason.name === 'AbortError') {
            return;
          }
          setSuggestions([]);
          setLookupError('Не удалось загрузить подсказки адресов.');
        });
    }, 700);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isDisabled, scope, value]);

  return (
    <div ref={rootRef} className={addressFieldClass}>
      <TextArea
        label={label}
        value={value}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        isRequired={isRequired}
        necessityIndicator={isRequired}
        validationBehavior="aria"
        isInvalid={invalid}
        errorMessage={error || lookupError || undefined}
        description={
          scope === 'ru'
            ? 'Адрес в России: начните вводить и выберите вариант с номером дома.'
            : 'Адрес за рубежом: начните вводить и выберите вариант с номером дома.'
        }
        onChange={onValue}
        onBlur={() => {
          onCommit(value);
          onBlur?.();
        }}
      />
      {suggestions.length > 0 ? (
        <ul className={addressSuggestionsClass}>
          {suggestions.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={addressSuggestionClass}
                onMouseDown={(event) => {
                  event.preventDefault();
                  onValue(item.label);
                  onCommit(item.label);
                  setSuggestions([]);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
