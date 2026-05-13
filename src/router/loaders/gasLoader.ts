import type { GasEvent } from '../../type/PropsType';

export function gasLoader(): GasEvent[] {
  return [
    {
      startDate: '2026-01-16',
      endDate: '2026-03-01',
      totalDays: 44,
      type: 'done',
    },
    {
      startDate: '2026-03-01',
      endDate: '2026-04-15',
      totalDays: 46,
      type: 'previous',
    },
    {
      startDate: '2026-04-15',
      endDate: null,
      totalDays: 0,
      type: 'current',
    },
  ];
}
