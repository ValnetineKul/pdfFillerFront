import assert from 'node:assert/strict';

import { describe, it } from 'vitest';

import { addZero, calculateTime, isTimeUp } from './utils.ts';

function timestamp(value: string): number {
  return Date.parse(value) / 1000;
}

const timeZone = 'Europe/Berlin';

function calculate(
  start: string,
  end: string,
  granularity: 'hours' | 'days' | 'months' | 'years',
) {
  return calculateTime({
    timestamp: timestamp(end),
    dateNow: timestamp(start),
    granularity,
    timeZone,
  });
}

describe('addZero', () => {
  it('pads single-digit numbers with a leading zero', () => {
    assert.equal(addZero(0), '00');
    assert.equal(addZero(5), '05');
    assert.equal(addZero(9), '09');
  });

  it('leaves numbers of two or more digits unchanged', () => {
    assert.equal(addZero(10), '10');
    assert.equal(addZero(42), '42');
    assert.equal(addZero(125), '125');
  });
});

describe('calculateTime', () => {
  it('returns zero without negative values for an expired timestamp', () => {
    assert.deepEqual(
      calculate('2024-01-02T00:00:00Z', '2024-01-01T00:00:00Z', 'years'),
      {
        years: '0',
        months: '0',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('keeps seconds for an interval shorter than a minute', () => {
    assert.deepEqual(
      calculate('2024-01-01T00:00:00Z', '2024-01-01T00:00:42Z', 'hours'),
      {
        hours: '0',
        minutes: '00',
        seconds: '42',
      },
    );
  });

  it('uses complete elapsed units for hours and days', () => {
    const start = '2024-01-01T00:00:00Z';
    const end = '2024-01-02T02:03:04Z';

    assert.deepEqual(calculate(start, end, 'hours'), {
      hours: '26',
      minutes: '03',
      seconds: '04',
    });
    assert.deepEqual(calculate(start, end, 'days'), {
      days: '1',
      hours: '02',
      minutes: '03',
      seconds: '04',
    });
  });

  it('returns every granularity shape', () => {
    const start = '2022-01-01T00:00:00Z';
    const end = '2023-03-04T05:06:07Z';

    assert.deepEqual(calculate(start, end, 'months'), {
      months: '14',
      days: '03',
      hours: '05',
      minutes: '06',
      seconds: '07',
    });
    assert.deepEqual(calculate(start, end, 'years'), {
      years: '1',
      months: '2',
      days: '03',
      hours: '05',
      minutes: '06',
      seconds: '07',
    });
  });

  it('counts many whole years and months over a long interval', () => {
    // Между зимним (UTC+1) и летним (UTC+2) временем в Берлине есть переход на
    // DST: этот лишний час оседает в остатке после вычета календарных единиц.
    assert.deepEqual(
      calculate('2000-01-01T00:00:00Z', '2023-07-01T00:00:00Z', 'years'),
      {
        years: '23',
        months: '6',
        days: '00',
        hours: '01',
        minutes: '00',
        seconds: '00',
      },
    );
    assert.deepEqual(
      calculate('2000-01-01T00:00:00Z', '2023-07-01T00:00:00Z', 'months'),
      {
        months: '282',
        days: '00',
        hours: '01',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('handles the end of a month', () => {
    assert.deepEqual(
      calculate('2024-01-31T11:00:00Z', '2024-03-01T11:00:00Z', 'months'),
      {
        months: '1',
        days: '01',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('handles February in a leap year', () => {
    assert.deepEqual(
      calculate('2024-02-28T11:00:00Z', '2024-03-01T11:00:00Z', 'years'),
      {
        years: '0',
        months: '0',
        days: '02',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('handles transitions between months of different lengths', () => {
    assert.deepEqual(
      calculate('2023-01-31T11:00:00Z', '2023-03-31T10:00:00Z', 'years'),
      {
        years: '0',
        months: '2',
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('handles a complete calendar year', () => {
    assert.deepEqual(
      calculate('2023-02-28T11:00:00Z', '2024-02-28T11:00:00Z', 'years'),
      {
        years: '1',
        months: '0',
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('uses the explicit time zone across daylight saving time', () => {
    assert.deepEqual(
      calculate('2024-03-30T11:00:00Z', '2024-03-31T10:00:00Z', 'years'),
      {
        years: '0',
        months: '0',
        days: '01',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('uses elapsed 24-hour days across spring-forward', () => {
    assert.deepEqual(
      calculate('2024-03-30T11:00:00Z', '2024-03-31T10:00:00Z', 'days'),
      {
        days: '0',
        hours: '23',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('uses elapsed 24-hour days across fall-back', () => {
    assert.deepEqual(
      calculate('2024-10-26T10:00:00Z', '2024-10-27T11:00:00Z', 'days'),
      {
        days: '1',
        hours: '01',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('constrains Feb 29 plus one calendar year to Feb 28', () => {
    assert.deepEqual(
      calculate('2020-02-29T11:00:00Z', '2021-02-28T11:00:00Z', 'years'),
      {
        years: '1',
        months: '0',
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });

  it('counts complete constrained months from the fixed anchor', () => {
    assert.deepEqual(
      calculate('2020-01-31T11:00:00Z', '2020-04-30T10:00:00Z', 'years'),
      {
        years: '0',
        months: '3',
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    );
  });
});

describe('isTimeUp', () => {
  it('is true when a calculated countdown reaches zero', () => {
    const expired = calculate(
      '2024-01-02T00:00:00Z',
      '2024-01-01T00:00:00Z',
      'years',
    );

    assert.equal(isTimeUp(expired), true);
  });

  it('is true when only the optional units are missing', () => {
    assert.equal(isTimeUp({ hours: '00', minutes: '00', seconds: '00' }), true);
  });

  it('is false while any unit is still running', () => {
    assert.equal(
      isTimeUp({ hours: '00', minutes: '00', seconds: '01' }),
      false,
    );
    assert.equal(
      isTimeUp({ days: '1', hours: '00', minutes: '00', seconds: '00' }),
      false,
    );
    assert.equal(
      isTimeUp({ years: '2', hours: '00', minutes: '00', seconds: '00' }),
      false,
    );
  });
});
