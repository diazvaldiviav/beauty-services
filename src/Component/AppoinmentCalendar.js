import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, addDays } from 'date-fns';

const AppointmentCalendar = ({ onSelectDateTime, bookedTimes }) => {
  const [selectedDate, setSelectedDate] = useState(null);


  // Horario de trabajo: 9:00 AM a 6:00 PM
  const minTime = setHours(setMinutes(new Date(), 0), 9);
  const maxTime = setHours(setMinutes(new Date(), 0), 18);

  // Filtrar horarios disponibles (intervalos de 1 hora)
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onSelectDateTime) {
      onSelectDateTime(date);
    }
  };

  

  return (
    <div className="appointment-calendar">
      <h3>Selecciona fecha y hora</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={60}
        minTime={minTime}
        maxTime={maxTime}
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)} // Permite reservar hasta 30 días en adelante
        filterTime={filterPassedTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Selecciona fecha y hora"
        className="date-picker-input"
        timeCaption="Hora"
        excludeTimes={[
          setHours(setMinutes(new Date(), 0), 13), // Hora de almuerzo
        ]}
        highlightDates={bookedTimes}
        // Excluir domingos
        filterDate={date => date.getDay() !== 0}
      />
      
      {selectedDate && (
        <div className="selected-datetime">
          <p>Cita seleccionada para:</p>
          <p className="datetime-display">
            {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
