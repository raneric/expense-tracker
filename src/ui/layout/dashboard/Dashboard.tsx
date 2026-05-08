import { AreaChart } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Gauge, LineChart } from '@mui/x-charts';
import { useLoaderData } from 'react-router-dom';
import Colors from '../../Theming/Colors';
import { SectionTitle, Tittle, TittleHelperInfo } from '../../core/SectionTitle';

const chartLineStyle = {
  '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
    stroke: Colors.tint900,
    strokeWidth: '0.09rem',
  },
  '& .MuiChartsAxis-left .MuiChartsAxis-line': {
    stroke: Colors.tint900,
    strokeWidth: '0.09rem',
  },
};

export default function Dashboard() {
  const withdrawalData = useLoaderData();

  return (
    <>
      <SectionTitle>
        <Tittle icon={<AreaChart />} displayText='Dashboard' />
        <TittleHelperInfo displayText='Display charts related to withdrawals' />
      </SectionTitle>
      <Box
        sx={{
          maxWidth: '32rem',
          height: '20rem',
          backgroundColor: Colors.paperBackground,
          borderRadius: '0.8rem',
        }}
      >
        <LineChart
          sx={chartLineStyle}
          dataset={withdrawalData}
          xAxis={[
            {
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: (date) =>
                new Intl.DateTimeFormat('en-US', {
                  weekday: 'short',
                  day: '2-digit',
                }).format(new Date(date)),
              tickLabelStyle: {
                angle: 45,
                textAnchor: 'start',
              },
              height: 60,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              label: 'Withdrawals (MGA)',
              color: Colors.tint200,
            },
          ]}
          height={300}
        />
      </Box>
      <Box
        sx={{
          maxWidth: '10rem',
          height: '10rem',
          backgroundColor: Colors.paperBackground,
          borderRadius: '0.8rem',
        }}
      >
        <Gauge
          value={30}
          startAngle={-110}
          endAngle={110}
          sx={{
            ['& .MuiGauge-valueText']: {
              fontWeight: 'bold',
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
      </Box>
    </>
  );
}
