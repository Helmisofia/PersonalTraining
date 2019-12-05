import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ReactTable from 'react-table';
import moment from 'moment';
import AddTraining from './addtraining';
import Snackbar from '@material-ui/core/Snackbar';
import Calendarpage from './calendar';

export default function ShowTrainings(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [training, setTraining] = useState(
    { date: '', duration: '', activity: '' }
  );

  const fetchTrainings = () => {
    fetch(props.customer.links[2].href)
      .then(response => {
        return response.json()
      })
      .then(res => {
        let content = res.content.map(training => {
          var date = moment(training.date)
          return { ...training, date: date.format("MMM Do YY, h:mm:ss a") }
        })
        return content
      })
      .then(formattedTraining => setTraining(formattedTraining))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchTrainings();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const saveTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
      }
    )
      .then(res => fetchTrainings())
      .catch(err => console.error(err))
  } 

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, { method: 'DELETE' })
        .then(res => fetchTrainings())
        .then(res => setMessage('Training deleted'))
        .then(res => setOpen(true))
        .catch(err => console.error(err))
    }
  }

  const columns = [
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Duration',
      accessor: 'duration'
    },
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      Cell: ({ value }) => <Button size="small" color="secondary" onClick={() => deleteTraining(value)}>Delete</Button>
    },

  ]

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen} TransitionComponent={Transition}>
        Trainings
    </Button>
      <Dialog open={open} onClose={handleClose} >
        <AppBar position='relative' >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" >
              Trainings
            </Typography>
            <AddTraining saveTraining={saveTraining} link= {props.customer.links[1].href}/>
          </Toolbar>
        </AppBar>
        <div>
          <ReactTable filterable={true} columns={columns} data={training} />
        </div>
      </Dialog>
    </div>
  )
}