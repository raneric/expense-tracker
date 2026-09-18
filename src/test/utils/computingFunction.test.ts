import { describe, expect, it } from 'vitest';
import type { Withdrawal, WithdrawalDetail } from '../../type/AppType';
import { getAmountsByReason } from '../../utils/computingFunction';

const makeWithdrawal = (
  details: WithdrawalDetail[],
  isForecast = false
): Withdrawal => ({
  reasons: details.map(({ reason }) => reason),
  date: new Date('2026-09-10'),
  amount: details.reduce((total, { price }) => total + price, 0),
  location: 'Antananarivo',
  isForecast,
  details,
});

describe('getAmountsByReason', () => {
  it('sums prices of the same reason across multiple withdrawals', () => {
    const withdrawals = [
      makeWithdrawal([{ reason: 'Openrouter credit', price: 25000 }]),
      makeWithdrawal([{ reason: 'Openrouter credit', price: 10000 }]),
      makeWithdrawal([{ reason: 'Food', price: 30000 }]),
    ];

    expect(getAmountsByReason(withdrawals)).toEqual([
      { label: 'Openrouter credit', amount: 35000 },
      { label: 'Food', amount: 30000 },
    ]);
  });

  it('sums every detail of a single withdrawal', () => {
    const withdrawal = makeWithdrawal([
      { reason: 'Groceries', price: 20000 },
      { reason: 'Food', price: 15000 },
    ]);

    expect(getAmountsByReason([withdrawal])).toEqual([
      { label: 'Groceries', amount: 20000 },
      { label: 'Food', amount: 15000 },
    ]);
  });

  it('ignores withdrawals without details and empty input', () => {
    expect(getAmountsByReason([makeWithdrawal([])])).toEqual([]);
    expect(getAmountsByReason([])).toEqual([]);
  });

  it('excludes reasons that sum to 0', () => {
    const withdrawals = [
      makeWithdrawal([
        { reason: 'Food', price: 0 },
        { reason: 'Gas', price: 42000 },
      ]),
    ];

    expect(getAmountsByReason(withdrawals)).toEqual([
      { label: 'Gas', amount: 42000 },
    ]);
  });

  it('sorts amounts in descending order', () => {
    const withdrawals = [
      makeWithdrawal([{ reason: 'Rent', price: 13500 }]),
      makeWithdrawal([{ reason: 'Medical', price: 315000 }]),
      makeWithdrawal([{ reason: 'Food', price: 30000 }]),
    ];

    const amounts = getAmountsByReason(withdrawals).map(({ amount }) => amount);

    expect(amounts).toEqual([315000, 30000, 13500]);
  });

  it('treats reasons with different casing as separate entries', () => {
    const withdrawals = [
      makeWithdrawal([{ reason: 'Food', price: 10000 }]),
      makeWithdrawal([{ reason: 'food', price: 5000 }]),
    ];

    expect(getAmountsByReason(withdrawals)).toEqual([
      { label: 'Food', amount: 10000 },
      { label: 'food', amount: 5000 },
    ]);
  });

  it('returns every reason, leaving the top-5 selection to the caller', () => {
    const withdrawals = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(
      (reason, index) => makeWithdrawal([{ reason, price: (index + 1) * 1000 }])
    );

    expect(getAmountsByReason(withdrawals)).toHaveLength(7);
  });

  it('keeps insertion order for tied amounts', () => {
    const withdrawals = [
      makeWithdrawal([{ reason: 'First', price: 10000 }]),
      makeWithdrawal([{ reason: 'Second', price: 10000 }]),
      makeWithdrawal([{ reason: 'Third', price: 30000 }]),
    ];

    expect(getAmountsByReason(withdrawals).map(({ label }) => label)).toEqual([
      'Third',
      'First',
      'Second',
    ]);
  });

  it('includes forecast withdrawals, filtering is the caller responsibility', () => {
    const withdrawals = [
      makeWithdrawal([{ reason: 'Rent', price: 13500 }], true),
    ];

    expect(getAmountsByReason(withdrawals)).toEqual([
      { label: 'Rent', amount: 13500 },
    ]);
  });
});
