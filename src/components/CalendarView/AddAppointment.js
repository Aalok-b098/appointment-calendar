import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointmentService } from "../../services/api";

const AddEvent = ({ closeModal, manuallyAddAppointment }) => {
  const [patientName, setPatientName] = useState("");
  const [title, setTitle] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
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
      const addedEvent = await addAppointmentService(eventData);
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
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Select Day
                </label>
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
            <div className="items-center px-4 py-3">
              <button
                onClick={handleAddAppointment}
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Add Event
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
