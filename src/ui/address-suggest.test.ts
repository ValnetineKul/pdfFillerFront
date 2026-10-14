import { describe, expect, it } from 'vitest';

import { suggestionsFromPlaces } from '@/ui/address-suggest';

describe('russian address suggestions', () => {
  it('shows a city result when the response has no house number', () => {
    const suggestions = suggestionsFromPlaces(
      [
        {
          place_id: 167377565,
          display_name: 'Санкт-Петербург, Северо-Западный федеральный округ, Россия',
          address: {
            state: 'Санкт-Петербург',
            country: 'Россия',
            country_code: 'ru',
          },
        },
        {
          place_id: 167394315,
          display_name: 'Санкт-Петербург, Северо-Западный федеральный округ, Россия',
          address: {
            city: 'Санкт-Петербург',
            state: 'Санкт-Петербург',
            country: 'Россия',
            country_code: 'ru',
          },
        },
      ],
      'ru',
    );

    expect(suggestions).toEqual([
      {
        id: '167377565',
        label: 'Санкт-Петербург, Северо-Западный федеральный округ, Россия',
      },
    ]);
  });

  it('keeps a full russian address with the house number', () => {
    const suggestions = suggestionsFromPlaces(
      [
        {
          place_id: 1,
          display_name: 'ignored',
          address: {
            state: 'Санкт-Петербург',
            city: 'Санкт-Петербург',
            road: 'Невский проспект',
            house_number: '1',
            country_code: 'ru',
          },
        },
      ],
      'ru',
    );

    expect(suggestions[0]?.label).toBe('Санкт-Петербург, Невский проспект, д. 1');
  });
});
