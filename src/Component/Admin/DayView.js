import React from 'react';
import { format} from 'date-fns';
import { es } from 'date-fns/locale';
import "../../Styles/Admin.css";

const DayView = React.memo(({ 
  currentDate, 
  appointments, 
  onAppointmentClick,
  getAppointmentsForDay 
}) => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM a 8 PM
  const dayAppointments = getAppointmentsForDay(currentDate);

  console.log('DayView - Current Date:', format(currentDate, 'yyyy-MM-dd'));
  console.log('DayView - Appointments:', dayAppointments);

  return (
    <div className="day-view">
      <div className="day-header">
        <h2>{format(currentDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}</h2>
      </div>

      <div className="day-grid">
        <div className="time-gutter">
          {hours.map(hour => (
            <div key={hour} className="time-slot">
              {`${hour}:00`}
            </div>
          ))}
        </div>

        <div className="appointments-column">
          {hours.map(hour => (
            <div key={hour} className="hour-cell">
              {dayAppointments
                .filter(apt => parseInt(apt.time.split(':')[0]) === hour)
                .map(apt => (
                  <div
                    key={apt.id}
                    className={`appointment-block ${apt.status}`}
                    onClick={() => onAppointmentClick(apt)}
                  >
                    <div className="appointment-time">{apt.time}</div>
                    <div className="appointment-title">{apt.service}</div>
                    <div className="appointment-provider">{apt.provider}</div>
                    <div className="appointment-client">{apt.client}</div>
                    <div className="appointment-price">S/ {apt.price}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default DayView;
