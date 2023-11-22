import React from "react";

const EventCard = ({ event, onDelete, onUpdate }) => {
  const handleDelete = () => {};

  const handleUpdate = () => {};

  return (
    <div className="event-card justify-between flex">
      <div>{event.title}</div>
      <div className="flex justify-end">
        <button className="text-sm mx-2" onClick={handleDelete}>
          <svg
            className="h-4 w-4 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
        <button className="text-sm" onClick={handleUpdate}>
          <svg
            className="h-4 w-4 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
