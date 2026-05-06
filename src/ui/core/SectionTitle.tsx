import { Box } from '@mui/material';
import type { BasePropsType } from '../../type/PropsType';
import Colors from '../Theming/Colors';

function SectionTitle({ children }: BasePropsType) {
  const tittleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    mb: 2,
    borderRadius: 2,
    backgroundColor: Colors.lightBlue700,
    color: Colors.lightBlue50,
    boxShadow: '0 10px 30px rgba(1, 87, 155, 0.12)',
  };

  return (
    <>
      <Box sx={tittleStyle}>{children}</Box>
    </>
  );
}

export default SectionTitle;
