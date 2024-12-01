import React from 'react';
import "../../Styles/Admin.css";
import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format,
  isSameDay 
} from 'date-fns';
import { es } from 'date-fns/locale';

const WeekView = React.memo(({ 
  currentDate, 
  appointments, 
  onAppointmentClick,
  getAppointmentsForDay 
}) => {
  const start = startOfWeek(currentDate, { locale: es });
  const end = endOfWeek(currentDate, { locale: es });
  const days = eachDayOfInterval({ start, end });
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM a 8 PM

  return (
    <div className="week-view">
      <div className="week-header">
        <div className="time-gutter"></div>
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`week-day-header ${isSameDay(day, new Date()) ? 'today' : ''}`}
          >
            <span className="day-name">{format(day, 'EEE', { locale: es })}</span>
            <span className="day-number">{format(day, 'd')}</span>
          </div>
        ))}
      </div>

      <div className="week-grid">
        <div className="time-gutter">
          {hours.map(hour => (
            <div key={hour} className="time-slot">
              {`${hour}:00`}
            </div>
          ))}
        </div>

        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="day-column">
            {hours.map(hour => (
              <div key={`${dayIndex}-${hour}`} className="hour-cell">
                {getAppointmentsForDay(day)
                  .filter(apt => parseInt(apt.time.split(':')[0]) === hour)
                  .map(apt => (
                    <div
                      key={apt.id}
                      className={`appointment-block ${apt.status}`}
                      onClick={() => onAppointmentClick(apt)}
                    >
                      <div className="appointment-time">{apt.time}</div>
                      <div className="appointment-title">{apt.service}</div>
                      <div className="appointment-client">{apt.client}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default WeekView;