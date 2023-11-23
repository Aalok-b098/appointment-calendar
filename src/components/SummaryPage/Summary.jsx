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
            <img width={35} className="mx-auto my-3 mb-6" src={SVG.noSummary} alt="loader" />

            <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              There are currently no upcoming appointments.
            </h5>
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
