import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {
  createEventId
} from './event-utils'
import {
  API,
  createHeader
} from '../constants';
import './Calendar.css'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      events: []
    };
  }

  componentDidMount() {
    API.get('/@me/events', createHeader(this.props.token))
      .then(response => {
        this.setState({
          events: response.data
        })
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={this.state.events} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h4>Instructions</h4>
          <div>
            Select dates and you will be prompted to create a new event
            <div>Drag, drop, and resize events </div>
            Click an event to delete it
          </div>
        </div>
        <div className='demo-app-sidebar-section'>
        </div>
      </div>
    )
  }

  handleDateSelect = async (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      const token = window.localStorage.getItem('jwt');
      await API.post('/events', {
        id: createEventId(),
        title: title,
        start: selectInfo.startStr,
      }, createHeader(token));
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

