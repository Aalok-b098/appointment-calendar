import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addAppointmentService,
  getAppointmentService,
} from "../../services/api";
import Toastify from "../Toastify/Toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = ({ closeModal, onEdit }) => {
  const [patientName, setPatientName] = useState("");
  const [title, setTitle] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);

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
      const eventData = {
        title: title,
        patientName: patientName,
        start: selectedDay,
      };
      closeModal();
      const addedEvent = await addAppointmentService(eventData);
      toast.success(addedEvent?.message);
      getAppointmentService();
    } catch (error) {
      console.error("Error adding event:", error.message);
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
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="crud-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 ">
            <h3 className="text-lg font-medium text-gray-900">
              Add Appointment
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-2 px-7 py-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
                  Select Date & Time
                </label>
                <div className="w-full">
                  <DatePicker
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-300 focus:border-green-500 focus:ring-green-500"
                    selected={selectedDay}
                    showTimeSelect
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
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
                onClick={handleAddAppointment}
                type="submit"
                className="px-4 py-2 bg-sky-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Add Event
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Close
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
