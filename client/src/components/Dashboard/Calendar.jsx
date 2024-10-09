// Calendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import default styles
// import './Calendar.css'; // Import calendar styles
import AdminDashboard from "./Sidebar";
const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(), title: 'Meeting with team' },
    { date: new Date(2024, 7, 10), title: 'Project Deadline' },
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const renderEvents = () => {
    const selectedDate = date.toDateString();
    const eventsForDate = events.filter(
      (event) => new Date(event.date).toDateString() === selectedDate
    );
    return eventsForDate.length ? (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {eventsForDate.map((event, index) => (
          <li key={index} style={eventStyle}>
            {event.title}
          </li>
        ))}
      </ul>
    ) : (
      <p>No events for this date</p>
    );
  };

  return (
    <div style={containerStyle}>
      <AdminDashboard />
      <h2 style={headerStyle}>Calendar</h2>
      <div style={calendarWrapperStyle}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={({ date, view }) => {
            if (events.some((event) => new Date(event.date).toDateString() === date.toDateString())) {
              return 'event-day';
            }
          }}
        />
      </div>
      <div style={eventsWrapperStyle}>
        {renderEvents()}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  maxWidth: '600px',
  margin: 'auto'
};

const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'center',
};

const calendarWrapperStyle = {
  marginBottom: '20px',
};

const eventsWrapperStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
};

const eventStyle = {
  padding: '5px',
  marginBottom: '5px',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default CalendarComponent;
