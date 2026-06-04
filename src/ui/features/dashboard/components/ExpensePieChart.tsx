import { PieChart } from '@mui/x-charts/PieChart';
import { fakePieChartData, valueFormatter } from '../../../../utils/Const';

export default function ExpensePieChart() {
  return (
    <PieChart
      series={[
        {
          data: fakePieChartData,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={140}
      width={140}
    />
  );
}
