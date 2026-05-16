import { FilterList } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Colors from "../../Theming/Colors";
import { useDialogContext } from "../../../contexts/dialog/DialogContext";

export default function AppSpeedDial() {
  const { show } = useDialogContext();
  const speedDialAction = [
    { icon: <AddIcon />, name: "Add", action: show },
    { icon: <FilterList />, name: "Filter", action: show },
  ];

  return (
    <SpeedDial
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
      }}
      ariaLabel="SpeedDial for withdrawal and filter"
      icon={<SpeedDialIcon />}
    >
      {speedDialAction.map((dialAction) => (
        <SpeedDialAction
          key={dialAction.name}
          icon={dialAction.icon}
          sx={{
            backgroundColor: Colors.tint100,
            "&:hover": {
              backgroundColor: Colors.tint300,
            },
          }}
          slotProps={{
            tooltip: {
              title: dialAction.name,
            },
          }}
          onClick={dialAction.action}
        />
      ))}
    </SpeedDial>
  );
}
