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
  getParticularAppointmentService,
  updateAppointmentService,
} from "../../services/api";
import ViewDelete from "./ViewDelete";
import { toast } from "react-toastify";

const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [dialogBox, setDialogBox] = useState(false);
  const [calendarWeekends] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [appointmentId, setApointmentId] = useState(null);
  const [editData, setEditData] = useState(null);
  const getAppointmentApiCall = async () => {
    try {
      const eventsData = await getAppointmentService();
      setAppointmentList(eventsData?.data?.appointments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAppointmentApiCall();
  }, []);

  const handleOPenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };
  const handleCloseDelete = () => {
    setIsOpenDelete(false);
  };

  const handleDateClick = (arg) => {
    const today = new Date();
    const clickedDate = new Date(arg.date);

    if (clickedDate < today) {
      toast.error("Cannot add an appointment for past dates");
    } else {
      setDialogBox(true);
    }
  };

  const handleCloseDialogBox = (arg) => {
    setDialogBox(false);
  };

  const handleEventDrop = async (info) => {
    try {
      const id = info.event._def.extendedProps._id;
      const start = info.event._instance?.range?.start;
      const data = await getParticularAppointmentService(id);
      const apiData = {
        ...data.data,
        start,
      };
      const res = await updateAppointmentService(id, apiData);
      toast.success(res?.message);
    } catch (err) {
      toast.error(err);
    }
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

  const handleEditAppointment = async () => {
    try {
      const data = await getParticularAppointmentService(appointmentId);
      setEditData(data.data);
      handleOPenModal();
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      const data = await deleteAppointmentService(appointmentId);
      getAppointmentApiCall();
      setApointmentId(null);
      handleCloseDelete();
      toast.success(data?.message);
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };
  return (
    <>
      <div className="demo-app mb-6">
        <div className="mx-auto max-w-[1150px] mb-6 text-right">
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
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            weekends={calendarWeekends}
            events={appointmentList}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            eventClick={handleEventRemove}
            eventContent={(arg) => {
              return (
                <div
                  className="p-2 text-white w-full"
                  style={{
                    backgroundColor: "#269cc8",
                    borderRadius: "5px",
                  }}
                >
                  <div>{arg.timeText}</div>
                  <div>
                    <b>{arg.event.title}</b>
                  </div>
                </div>
              );
            }}
          />
          {isModalOpen && (
            <AddEvent
              isEdit={editData}
              setIsEdit={setEditData}
              closeModal={handleCloseModal}
              getAppointmentApiCall={getAppointmentApiCall}
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
              onEdit={handleEditAppointment}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
