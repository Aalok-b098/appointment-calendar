import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import AddEvent from "./AddAppointment";
import DialogBox from "./DialogBox";
import { getAppointmentService } from "../../services/api";

const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [dialogBox, setDialogBox] = useState(false);
  const [calendarWeekends, setCalendarWeekends] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [manuallyAddAppointment, setManuallyAddAppointment] = useState([]);

  useEffect(() => {
    const getAppointmentApiCall = async () => {
      try {
        const eventsData = await getAppointmentService();
        setAppointmentList(eventsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAppointmentApiCall();
  }, []);

  const appointments = appointmentList.appointments;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOPenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    setManuallyAddAppointment([
      {
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay,
        time: arg.dateStr,
      },
    ]);
    setDialogBox(true);
  };

  const handleCloseDialogBox = (arg) => {
    setDialogBox(false);
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
      <div className="font-bold text-xl  my-3 mx-3">Calendar</div>
      <div className="flex justify-end space-x-4 mx-3 my-3 ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOPenModal}
        >
          Add Appointment
        </button>
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
          &nbsp; (Click week, add event and drag and drop event)
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            editable={true}
            defaultView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            weekends={calendarWeekends}
            events={appointments}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
          />
          {isModalOpen && (
            <AddEvent
              closeModal={handleCloseModal}
              manuallyAddAppointment={manuallyAddAppointment}
            />
          )}
          {dialogBox && (
            <DialogBox
              onClose={handleCloseDialogBox}
              open={dialogBox}
              openAddModal={handleOPenModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
