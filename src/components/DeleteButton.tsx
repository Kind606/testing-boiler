import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface Props {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <IconButton
      aria-label="delete"
      color="error"
      size="small"
      onClick={onClick}
      sx={{ ml: 1 }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
