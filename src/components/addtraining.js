import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(
    {date: '', duration: '', activity: '', customer: props.link}
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value })
    console.log(training);
  }

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  }

  return(
    <div style={{margin: 10}}>
    <Button variant="outlined" color="info" onClick={handleClickOpen}>
      Add Training
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New training</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the information for new training
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="date"
          value={training.date}
          onChange={e => handleChange(e)}
          label="Date"
          fullWidth
        />
        <TextField
          margin="dense"
          name="duration"
          value={training.duration}
          onChange={e => handleChange(e)}
          label="Duration"
          fullWidth
        />
        <TextField
          margin="dense"
          name="activity"
          value={training.activity}
          onChange={e => handleChange(e)}
          label="Activity"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addTraining} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}