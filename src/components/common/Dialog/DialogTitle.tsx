import IconButton from '@material-ui/core/IconButton';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

interface DialogTitleProps {
  title: string;
  onClose?: () => void;
}

const DialogTitle: React.FunctionComponent<DialogTitleProps> = ({ title, onClose }) => {
  return (
    <MUIDialogTitle className="flex justify-between items-center" disableTypography>
      <Typography variant="h6">{title}</Typography>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MUIDialogTitle>
  );
};

export default DialogTitle;
