import React, { useState, useEffect } from "react";
import { getUpcommingAppointmentService } from "../../services/api";
import Loader from "../Loader/Loader";

const Summary = () => {
  const [upcomingEventsList, setUpcomingEventsList] = useState([]);

  useEffect(() => {
    const getAppointmentApiCall = async () => {
      try {
        const eventsData = await getUpcommingAppointmentService();
        setUpcomingEventsList(eventsData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAppointmentApiCall();
  }, []);

  const formatDateString = (dateString, format = 'datetime') => {
    const date = new Date(dateString);

    if (format === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } else if (format === 'date') {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } else {
      // Default: Display both date and time
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    }
  };

  return (
    <div className="mx-auto max-w-[1150px] px-4">
      <div className="font-bold text-sky-600 text-xl mt-2 mb-6">
        Upcoming Appointments
      </div>
      <div className="flex flex-col items-center">
        {upcomingEventsList?.length === 0 ? (
          <Loader />
        ) : !upcomingEventsList ? (
          <div className="text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-700 dark:border-gray-700">
            <svg className="mx-auto my-auto w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
            </svg>

            <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">There are currently no upcoming appointments.</h5>

          </div>
        ) : (
          <div className="flex flex-wrap">
            {upcomingEventsList?.map((appointment, index) => (
              <div className="w-3/12 px-2 mb-4" key={index}>
                <div className="border-r border-b border-l bg-gray-400 border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <div className="text-gray-900 font-bold text-lg text-sky-600 mb-2">
                      Date and Time- {formatDateString(appointment.start)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="text-gray-900 leading-none mb-1">
                        <strong>Patient Name -</strong>{" "}
                        <span className="text-sky-600">
                          {appointment?.patientName}
                        </span>
                      </p>
                      <p className="text-gray-600"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
