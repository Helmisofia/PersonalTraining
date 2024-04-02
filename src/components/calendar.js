import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../App.css';
import moment from 'moment';

export default function Calendar() {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
      fetchTrainings();
      console.log(trainings)
  }, [])

  const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
          .then(response => {
              return response.json()
          })
          .then(res => {
            setTrainings(res.content)   
          })
          .catch(err => console.error(err))
  }

  const events = [];
  if (trainings) {
    for (var i = 0; i < trainings.length; i++) {
      const newEvent = {

        title: trainings[i].activity,
        start: moment.utc(trainings[i].date)._d,
        end: moment.utc(trainings[i].date).add(trainings[i].duration, 'minutes')._d
      };
      events.push(newEvent);
    }
    console.log(events)
  }


  return (
    <FullCalendar
      defaultView="dayGridMonth"
      timeZone='UTC'
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek'
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      weekends={false}
      events={events} />
  )


}