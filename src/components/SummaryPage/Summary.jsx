import React, { useState, useEffect } from "react";
import { getUpcommingAppointmentService } from "../../services/api";
import Loader from "../Loader/Loader";
import SVG from "../../constant";

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

  const formatDateString = (dateString, format = "datetime") => {
    const date = new Date(dateString);

    if (format === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else if (format === "date") {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else {
      // Default: Display both date and time
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  };

  const groupAppointmentsByDate = (appointments) => {
    const groupedAppointments = {};
    appointments.forEach((appointment) => {
      const date = formatDateString(appointment.start, 'date');
      if (!groupedAppointments[date]) {
        groupedAppointments[date] = [];
      }
      groupedAppointments[date].push(appointment);
    });
    return groupedAppointments;
  };

  const groupedAppointments = groupAppointmentsByDate(upcomingEventsList);

  return (
    <div className="mx-auto max-w-[1150px] px-4">
      <div className="font-bold text-sky-600 text-xl mt-2 mb-6">
        Upcoming appointments
      </div>
      <div className="flex flex-col items-center">
        {upcomingEventsList?.length === 0 ? (
          <Loader />
        ) : !upcomingEventsList ? (
          <div className="text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-700 dark:border-gray-700">
            <img width={35} className="mx-auto my-3 mb-6" src={SVG.noSummary} alt="loader" />
            <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              There are currently no upcoming appointments.
            </h5>
          </div>
        ) : (
          <div className="flex flex-wrap flex-col items-left w-full ">
            {Object.entries(groupedAppointments).map(([date, appointments], index) => (
              <div key={index} className="flex flex-col items-left w-100 shadow-sm my-3 p-4 rounded-md">
                <div className="text-gray-800 font-semibold text-md mb-2">{date}</div>
                <div className="flex flex-wrap">
                  {appointments.map((appointment, innerIndex) => (
                    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-5 mr-2" key={innerIndex}>
                      <h2 className="text-sm font-semibold text-gray-800 mb-2">{appointment.title}</h2>
                      <p className="text-gray-900 text-sm leading-none mb-1">
                        <span>Time -</span>{" "}
                        <span className="text-sky-600">
                          {formatDateString(appointment.start, 'time')}
                        </span>
                      </p>
                      <p className="text-gray-900 text-sm leading-none mb-1">
                        <span>Patient name -</span>{" "}
                        <span className="text-sky-600">
                          {appointment?.patientName}
                        </span>
                      </p>
                    </div>
                  ))}
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
