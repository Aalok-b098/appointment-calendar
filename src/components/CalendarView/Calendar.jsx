import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
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
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10)
    },
  
    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0)
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
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0)
    },
    {
      id: 14,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() + 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3))
    }
  ]);

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
      handleCloseModal()
      getAppointmentService()
      toast.success(data?.message)
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };
  return (
    <>
      <div className="bg-sky-500 px-4 py-2 mb-4">
        <div className="mx-auto max-w-[1150px] px-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl text-white">Calendar</div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-white hover:bg-gray-100 text-sky-500 font-bold py-2 px-4 rounded"
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
          </div>
        </div>
      </div>


      <div className="demo-app mb-6">
        <div className="demo-app-top flex items-center justify-center gap-3">
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={toggleWeekends}>Toggle Weekends</button>
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={gotoPast}>Go to a date in the past</button>
          (Click week, add event and drag and drop event)
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
              onClose={handleCloseModal}
              open={isOpenDelete}
              onDelete={handleDeleteAppointment}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
