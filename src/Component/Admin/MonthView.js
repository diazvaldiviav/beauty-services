import React from 'react';
import "../../Styles/Admin.css";
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  format 
} from 'date-fns';


const MonthView = React.memo(({ 
    currentDate, 
    appointments, 
    onAppointmentClick,
    getAppointmentsForDay,
    onDayClick 
  }) => {
    // Agregar logs para depuración
    console.log('MonthView Props:', {
      currentDate,
      appointments,
      totalAppointments: appointments.length
    });
  
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
  return (
    <div className="month-view">
      <div className="weekday-header">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="weekday-cell">{day}</div>
        ))}
      </div>

      

      <div className="month-grid">
        {days.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div 
              key={index}
              className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
              onClick={()=> onDayClick(day)}
              style={{cursor: 'pointer'}}
            >
              <span className="day-number">{format(day, 'd')}</span>
              <div className="day-appointments">
                {dayAppointments.map(apt => (
                  <div 
                    key={apt.id}
                    className={`appointment-chip ${apt.status}`}
                    onClick={() => onAppointmentClick(apt)}
                  >
                    {apt.time} - {apt.client}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default MonthView;
