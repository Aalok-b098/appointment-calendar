import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Link} from "react-router-dom";

const Calendar = () => {
  const calendarComponentRef = useRef(null);

  const [calendarWeekends, setCalendarWeekends] = useState(true);
  const [appointmentList,setAppointmentList]= useState([])
    const [calendarEvents, setCalendarEvents] = useState([
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2023, 3, 7),
        end: new Date(2023, 3, 10)
      },
      {
        id: 2,
        title: "Another Event",
        start: new Date(2023, 3, 14),
        end: new Date(2023, 3, 15)
      },
      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },
      {
        id: 4,
        title: "Some Event",
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 9, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(new Date().setHours(new Date().getHours() + 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() + 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ]);

    useEffect(() => {
      const getAppointmentApiCall = async () => {
        try {
          const eventsData = await getAppointmentApiCall();
          setAppointmentList(eventsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      getAppointmentApiCall();
    }, []);

  const toggleWeekends = () => {
    setCalendarWeekends(!calendarWeekends);
  };

  const gotoPast = () => {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      calendarApi.gotoDate("2000-01-01");
    }
  };

  const handleDateClick = (arg) => {
    if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      setCalendarEvents([...calendarEvents, { title: "New Event", start: arg.date, allDay: arg.allDay }]);
    }
  };

  const handleEventDrop = (info) => {
    const { start } = info.oldEvent._instance.range;

    const { start: newStart } = info.event._instance.range;

    if (new Date(start).getDate() === new Date(newStart).getDate()) {
      info.revert();
    }
  };

  return (
    <>
    <div className='font-bold text-xl  my-3 mx-3'>Calendar</div>
    <div className="flex justify-end space-x-4 mx-3 my-3 ">
  <Link to="/addAppointment">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add Appointment
    </button>
  </Link>
  <Link to="/summary">
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Summary
    </button>
  </Link>
</div>
    <div className="demo-app">
      <div className="demo-app-top">
        <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
        <button onClick={gotoPast}>go to a date in the past</button>
      </div>
      <div className="demo-app-calendar">
        <FullCalendar
          editable={true}
          defaultView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          weekends={calendarWeekends}
          events={calendarEvents}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
        />
      </div>
    </div>
    </>
  );
};

export default Calendar;