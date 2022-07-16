import Button from "@mui/material/Button";
const Boton = ({ text, icon, active, onClick }: IProps) => {
  return (
    <Button
      className={`${active ? `` : `disabledButton`}`}
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

type IProps = {
  onClick: () => void;
  icon: any;
  active: boolean;
  text: string;
};

export { Boton };
