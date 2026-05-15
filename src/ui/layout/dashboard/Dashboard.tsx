import { AreaChart } from '@mui/icons-material';
import { SectionTitle, Tittle, TittleHelperInfo } from '../../core/SectionTitle';

export default function Dashboard() {
  return (
    <SectionTitle>
      <Tittle icon={<AreaChart />} displayText='Dashboard' />
      <TittleHelperInfo displayText='Display charts related to withdrawals' />
    </SectionTitle>
  );
}
