import { AreaChart, HelpTwoTone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { rows } from '../../../utils/Const';
import SectionTitle from '../../core/SectionTitle';
import Colors from '../../Theming/Colors';

const chartLineStyle = {
  '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
    stroke: Colors.lightBlue900,
    strokeWidth: '0.09rem',
  },
  '& .MuiChartsAxis-left .MuiChartsAxis-line': {
    stroke: Colors.lightBlue900,
    strokeWidth: '0.09rem',
  },
};

//TODO: FIX ERROR ON DATASET AND BOX
export default function Dashboard() {
  const titleBoxAlign = { display: 'flex', alignItems: 'center', gap: 1 };
  return (
    <>
      <SectionTitle>
        <Box sx={titleBoxAlign}>
          <AreaChart />
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
        </Box>
        <Box sx={titleBoxAlign}>
          <Typography variant='body2' sx={{ opacity: 0.88 }}>
            Display charts related to withdrawals
          </Typography>
          <HelpTwoTone sx={{ fontSize: '1.8rem' }} />
        </Box>
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
          dataset={rows}
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
              color: Colors.lightBlue200,
            },
          ]}
          height={300}
        />
      </Box>
    </>
  );
}
