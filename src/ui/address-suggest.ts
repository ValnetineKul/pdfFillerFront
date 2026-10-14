export type AddressSuggestion = {
  id: string;
  label: string;
};

type NominatimAddress = {
  house_number?: string;
  road?: string;
  pedestrian?: string;
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  state?: string;
  country?: string;
  country_code?: string;
};

type NominatimPlace = {
  place_id: number;
  display_name?: string;
  address?: NominatimAddress;
};

function formatAddress(address: NominatimAddress): string {
  const place = address.city || address.town || address.village || address.hamlet || '';
  const street = address.road || address.pedestrian || '';
  const house = address.house_number?.trim() ?? '';
  if (!place || !street || !house) {
    return '';
  }

  const region = address.state && address.state !== place ? address.state : '';
  return [region, place, street, `д. ${house}`].filter(Boolean).join(', ');
}

function formatWorldAddress(address: NominatimAddress): string {
  const place = address.city || address.town || address.village || address.hamlet || '';
  const street = address.road || address.pedestrian || '';
  const house = address.house_number?.trim() ?? '';
  if (!place || !street || !house) {
    return '';
  }

  return [`${house} ${street}`.trim(), place, address.country ?? '']
    .filter(Boolean)
    .join(', ');
}

function suggestionLabel(place: NominatimPlace, scope: 'ru' | 'world'): string {
  const address = place.address;
  const structured = address
    ? address.country_code === 'ru' || scope === 'ru'
      ? formatAddress(address)
      : formatWorldAddress(address)
    : '';
  return structured || place.display_name?.trim() || '';
}

export function suggestionsFromPlaces(
  places: Array<NominatimPlace>,
  scope: 'ru' | 'world',
): Array<AddressSuggestion> {
  const seen = new Set<string>();
  const suggestions: Array<AddressSuggestion> = [];

  for (const place of places) {
    if (scope === 'ru' && place.address && place.address.country_code !== 'ru') {
      continue;
    }
    const label = suggestionLabel(place, scope);
    if (!label || seen.has(label)) {
      continue;
    }
    seen.add(label);
    suggestions.push({ id: String(place.place_id), label });
  }

  return suggestions;
}

export async function searchAddresses(
  query: string,
  signal: AbortSignal,
  scope: 'ru' | 'world',
): Promise<Array<AddressSuggestion>> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '6');
  url.searchParams.set('q', query);
  if (scope === 'ru') {
    url.searchParams.set('countrycodes', 'ru');
  }

  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/json',
      'Accept-Language': scope === 'ru' ? 'ru' : 'en',
      'User-Agent': 'pdfFiller/0.1 (address suggestions)',
    },
  });
  if (!response.ok) {
    throw new Error('Address search failed.');
  }

  const places = (await response.json()) as Array<NominatimPlace>;
  return suggestionsFromPlaces(places, scope);
}
