import React, { Component } from 'react'  
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
import timeGridPlugin from "@fullcalendar/timegrid";  
import interactionPlugin from '@fullcalendar/interaction';
  
import "@fullcalendar/core/main.css";  
import "@fullcalendar/daygrid/main.css";  
import "@fullcalendar/timegrid/main.css";  
  
const events = [{ title: "Today", date: new Date() }];  
export class Calendar extends Component {  
    render() {  
        return (  
            <div className="container">  
                  <div className="row title" style={{ marginTop: "20px" }} >  
                    <div class="col-sm-12 btn btn-info">  
                        Calendar 
               </div>  
                </div>  
                 <FullCalendar  
              initialView="dayGridMonth"  
             headerToolbar={{  
            start: "prev,next",  
            center: "title",  
           end: "dayGridMonth,timeGridWeek,timeGridDay"  
        }}  
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}  
        events={events}
        selectable={true}
      />  
            </div>  
        )  
    }  
}  
  
export default Calendar  