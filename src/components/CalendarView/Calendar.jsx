import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEvent from "./AddAppointment";
import DialogBox from "./DialogBox";
import {
  deleteAppointmentService,
  getAppointmentService,
} from "../../services/api";
import ViewDelete from "./ViewDelete";
import { toast } from "react-toastify";

const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [dialogBox, setDialogBox] = useState(false);
  const [calendarWeekends, setCalendarWeekends] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [manuallyAddAppointment, setManuallyAddAppointment] = useState([]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [appointmentId, setApointmentId] = useState(null);

  useEffect(() => {
    const getAppointmentApiCall = async () => {
      try {
        const eventsData = await getAppointmentService();
        setAppointmentList(eventsData?.data?.appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAppointmentApiCall();
  }, []);
  const handleOPenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseDelete = () => {
    setIsOpenDelete(false);
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
        title: null,
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

  const handleEventRemove = (info) => {
    setIsOpenDelete(true);
    const eventId = info.event._def.extendedProps._id;
    setApointmentId(eventId);
  };

  const handleDeleteAppointment = async () => {
    try {
      const data = await deleteAppointmentService(appointmentId);
      setApointmentId(null);
      handleCloseDelete()
      getAppointmentService()
      toast.success(data?.message)
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };
  return (
    <>

      <div className="demo-app mb-6">
        <div className="demo-app-top flex items-center justify-center gap-3">
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={toggleWeekends}>Toggle Weekends</button>
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={gotoPast}>Go to a date in the past</button>
          (Click week, add event and drag and drop event)
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOPenModal}
          >
            Add Appointment
          </button>
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
            events={appointmentList}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            eventClick={handleEventRemove}
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
          {isOpenDelete && (
            <ViewDelete
              onClose={handleCloseDelete}
              open={isOpenDelete}
              onDelete={handleDeleteAppointment}
              onEdit={handleOPenModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
