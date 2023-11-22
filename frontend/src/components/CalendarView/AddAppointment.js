import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const AddEvent = () => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDay(date);
    console.log(date, "date");
  };
  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ patientName, doctorName });
    setPatientName(patientName);
    setDoctorName(doctorName);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full"
      id="my-modal"
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
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
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
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                />
              </div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Select Time
                </label>
                <DatePicker
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-300 focus:border-green-500 focus:ring-green-500"
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Add Event
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Close
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
