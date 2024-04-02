import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import AddTraining from './addtraining';

const Traininglist = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
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
            .then(formattedTrainings => setTrainings(formattedTrainings))
            .catch(err => console.error(err))
    }

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
            filterable: false,
            sortable: false,
            width: 100,
        },
    ]

    return (
        <div>
            <AddTraining saveTraining={saveTraining} />
            <ReactTable filterable={true} columns={columns} data={trainings} />
        </div>
    );
}

export default Traininglist;