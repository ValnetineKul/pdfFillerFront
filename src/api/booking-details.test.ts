import { describe, expect, it } from 'vitest';

import { hotelNameAboveAddress, readBookingDetails } from '@/api/extract-profile';

const VENICE = `ISEPO APARTMENT
Адрес: Castello 911, Кастелло, 30122 Венеция, Италия
Телефон: +39 349 499 8023
`;

const LISBON = `Lisabonna Guest House
Адрес: 5 Rua Ilha do Pico, 1675-128 Лиссабон,
Португалия
Телефон: +351 930 952 390
`;

const VENICE_COLUMNS = `ЗАЕЗД ОТЪЕЗД ЕДИНИЦЫ НОЧИ
ISEPO APARTMENT
26 1 1 / 5
Адрес: Castello 911, Кастелло, 30122 Венеция, Италия
Телефон: +39 349 499 8023
`;

const LISBON_COLUMNS = `ЗАЕЗД ОТЪЕЗД ЕДИНИЦЫ НОЧИ
Lisabonna Guest House
Адрес: 5 Rua Ilha do Pico, 1675-128 Лиссабон,
25 28 1 / 3
Португалия
Телефон: +351 930 952 390
`;

describe('booking hotel name', () => {
  it('reads the property name from the line above the address', () => {
    expect(readBookingDetails(VENICE)).toMatchObject({
      hotel: 'ISEPO APARTMENT',
      address: 'Castello 911, Кастелло, 30122 Венеция, Италия',
      phone: '+39 349 499 8023',
    });
    expect(readBookingDetails(LISBON)).toMatchObject({
      hotel: 'Lisabonna Guest House',
      address: '5 Rua Ilha do Pico, 1675-128 Лиссабон, Португалия',
      phone: '+351 930 952 390',
    });
    expect(readBookingDetails(VENICE_COLUMNS)).toMatchObject({
      hotel: 'ISEPO APARTMENT',
      address: 'Castello 911, Кастелло, 30122 Венеция, Италия',
    });
    expect(readBookingDetails(LISBON_COLUMNS)).toMatchObject({
      hotel: 'Lisabonna Guest House',
      address: '5 Rua Ilha do Pico, 1675-128 Лиссабон, Португалия',
    });
  });

  it('reads the property name from the text item above the address label', () => {
    expect(
      hotelNameAboveAddress([
        { x: 315.5, y: 570.42, text: 'ЗАЕЗД' },
        { x: 44.5, y: 566.67, text: 'ISEPO APARTMENT' },
        { x: 44.5, y: 552.42, text: 'Адрес:' },
        { x: 73.7, y: 552.42, text: 'Castello 911, Кастелло, 30122 Венеция, Италия' },
      ]),
    ).toBe('ISEPO APARTMENT');
    expect(
      hotelNameAboveAddress([
        { x: 350.2, y: 768.42, text: 'ЗАЕЗД' },
        { x: 118.8, y: 763.17, text: 'Lisabonna Guest House' },
        { x: 118.8, y: 748.92, text: 'Адрес:' },
        { x: 148, y: 748.92, text: '5 Rua Ilha do Pico, 1675-128 Лиссабон,' },
      ]),
    ).toBe('Lisabonna Guest House');
  });
});
