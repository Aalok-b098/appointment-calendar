import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentCalendar from './components/CalendarView/Calendar';
import Summary from './components/SummaryPage/Summary';
import AddAppointment from './components/CalendarView/AddAppointment';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<AppointmentCalendar />} />
     <Route path="/summary" element={<Summary />} />
     <Route path="/addAppointment" element={<AddAppointment />} />
     
    </Routes>
  </Router>
  );
}

export default App;
