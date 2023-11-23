import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addAppointmentService,
  updateAppointmentService,
} from "../../services/api";
import Toastify from "../Toastify/Toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SVG from "../../constant";

const AddEvent = ({ closeModal, isEdit, setIsEdit, getAppointmentApiCall }) => {
  const [patientName, setPatientName] = useState("");
  const [title, setTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setPatientName(isEdit?.patientName);
      setTitle(isEdit?.title);
      setSelectedDay(isEdit?.selectedDay);
    }
  }, [isEdit]);

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatientName(patientName);
    setTitle(title);
  };

  const handleAddAppointment = async () => {
    try {
      // Check if all required fields are filled
      if (!patientName || !title || !selectedDay) {
        toast.error("Please fill in all fields.");
        return;
      }
      const eventData = {
        title: title,
        patientName: patientName,
        start: selectedDay,
      };
      if (isEdit) {
        const editEvent = await updateAppointmentService(
          isEdit?._id,
          eventData
        );
        toast.success(editEvent?.message);
      } else {
        const addEvent = await addAppointmentService(eventData);
        toast.success(addEvent?.message);
      }
      closeModal();
      setIsEdit(null);
      getAppointmentApiCall();
    } catch (error) {
      toast.error(error?.message);
      console.error("Error adding event:", error);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-11"
      style={{ zIndex: 4 }}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <button
          onClick={closeModal}
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-300 dark:hover:text-white float-right"
          data-modal-toggle="crud-modal"
        >
          <img src={SVG.closeSvg} width={16} height={16} alt="close" />
          <span class="sr-only"></span>
        </button>
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-100 ">
            <h3 className="text-lg text-gray-400 font-semibold text-sky-700 font-medium text-gray-900">
              {isEdit ? "Edit Appointment" : "Add Appointment"}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-2 px-7 py-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 float-left font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 float-left font-semibold mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 float-left font-semibold mb-1">
                  Select Date & Time
                </label>
                <div className="w-full">
                  <DatePicker
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-300 focus:border-green-500 focus:ring-green-500"
                    selected={selectedDay}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy HH:mm"
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                  />
                </div>
              </div>
            </div>
            <div className="items-center flex gap-2 px-4 py-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Close
              </button>
              <button
                onClick={handleAddAppointment}
                type="submit"
                className="px-4 py-2 bg-sky-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toastify />
    </div>
  );
};

export default AddEvent;
