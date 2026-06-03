import dayjs from 'dayjs';
import { useMemo } from 'react';
import { type Saving } from '../type/AppType';

export function useSavingData(saving: Saving[]) {
  const chartsData = useMemo(() => {
    const dimensions = saving.map((value) => dayjs(value.month).format('MMMM'));
    const seriesData = saving.map((value) => value.amount);

    const series = [
      {
        data: seriesData,
        label: 'Monthly saving',
        id: 'svs',
        showMark: true,
      },
    ];
    return { series, dimensions };
  }, [saving]);

  return { chartsData };
}
