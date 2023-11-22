import React, { useState, useEffect } from "react";
import { getAppointmentService } from "../../services/api";

const Summary = () => {
  const [upcomingEventsList, setUpcomingEventsList] = useState([]);

  useEffect(() => {
    const getAppointmentApiCall = async () => {
      try {
        const eventsData = await getAppointmentService();
        setUpcomingEventsList(eventsData?.data?.appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAppointmentApiCall();
  }, []);

  return (
    <>
      <div className="bg-sky-500 px-4 py-2 mb-4">
        <div className="mx-auto max-w-[1150px] px-4">
          <div className="font-bold text-xl text-white">Summary</div>
        </div>
      </div>

      <div className="mx-auto max-w-[1150px] px-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-sky-600 text-xl mt-2 mb-6">
            Upcoming Appointments
          </div>
          <div className="flex flex-wrap">
            {upcomingEventsList?.map((item) => {
              return (
                <>
                  <div className="w-3/12 px-2 mb-4">
                    <div className="border-r border-b border-l bg-gray-400 border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8">
                        <div className="text-gray-900 font-bold text-lg text-sky-600 mb-2">
                          Date - 22 November 2023
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="text-gray-900 leading-none mb-1">
                            <strong>Patient Name -</strong>{" "}
                            <span className="text-sky-600">
                              {item?.patientName}
                            </span>
                          </p>
                          <p className="text-gray-600"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
