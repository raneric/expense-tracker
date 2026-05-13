import type { GasEvent } from '../../type/PropsType';

export function gasLoader(): GasEvent[] {
  return [
    {
      startDate: '2024-10-03',
      endDate: '2024-11-18',
      totalDays: 46,
      type: 'done',
    },
    {
      startDate: '2024-11-18',
      endDate: '2025-01-02',
      totalDays: 45,
      type: 'done',
    },
    {
      startDate: '2025-01-02',
      endDate: '2025-02-14',
      totalDays: 43,
      type: 'done',
    },
    {
      startDate: '2025-02-14',
      endDate: '2025-03-31',
      totalDays: 45,
      type: 'done',
    },
    {
      startDate: '2025-03-31',
      endDate: '2025-05-16',
      totalDays: 46,
      type: 'done',
    },
    {
      startDate: '2025-05-16',
      endDate: '2025-06-30',
      totalDays: 45,
      type: 'done',
    },
    {
      startDate: '2025-06-30',
      endDate: '2025-08-13',
      totalDays: 44,
      type: 'done',
    },
    {
      startDate: '2025-08-13',
      endDate: '2025-09-28',
      totalDays: 46,
      type: 'done',
    },
    {
      startDate: '2025-09-28',
      endDate: '2025-11-12',
      totalDays: 45,
      type: 'done',
    },
    {
      startDate: '2025-11-12',
      endDate: '2026-01-16',
      totalDays: 65,
      type: 'done',
    },
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
