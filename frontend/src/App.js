import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/ CalendarView/Calendar';
import Summary from './components/SummaryPage/Summary';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Calendar />} />
     <Route path="/Summary" element={<Summary />} />
    </Routes>
  </Router>
  );
}

export default App;
