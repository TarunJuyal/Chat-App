import React, {useState} from 'react';
import { IconButton,Tooltip,Button,TextField,Dialog,DialogActions,DialogContent, DialogTitle } from "@material-ui/core";
import { Add } from "@material-ui/icons";

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add Contact">
        <IconButton onClick={handleClickOpen}>
            <Add />
       </IconButton>
     </Tooltip>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          />
          <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Save
            </Button>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
    </Dialog>
    </>
  );
}