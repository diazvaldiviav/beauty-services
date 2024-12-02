import React, { useState, useEffect } from "react";
import { 
  format,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlus, 
  FaFilter, 
  FaCog, 
} from "react-icons/fa";

// Importa los datos de prueba
import mockAppointments from '../../Data/mockAppointments'; // Nota el cambio aquí de mockAppointments a mockAppoiment


// Importación de componentes
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AppointmentModal from './AppoimentModal';
import ConfirmationModal from './ConfimationModal';
import { toast } from 'react-toastify';
import "../../Styles/Admin.css";

// Valores por defecto para el formulario de citas
const defaultAppointmentForm = {
  service: '',
  provider: '',
  client: '',
  date: new Date().toISOString().split('T')[0],
  time: '09:00',
  duration: 60,
  price: '',
  status: 'pending'
};

const Calendar = () => {
  // ================ ESTADOS ================
 
  
  // Estados de control del calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Estados relacionados con las citas
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Estados de los modales
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  // ================ EFECTOS ================

  // Cargar citas al montar el componente
  useEffect(() => {
    // Aquí podrías cargar las citas desde una API
    // Por ahora usamos un array vacío
    setAppointments([]);
  }, []);

  useEffect(() => {
    console.log('Current appointments state:', appointments);
    // Si los datos están vacíos, intentar cargarlos de nuevo
    if (appointments.length === 0) {
      setAppointments(mockAppointments);
    }
  }, [appointments]);

  console.log('Mock Appointments:', mockAppointments);


  // ================ MANEJADORES DE NAVEGACIÓN ================
  

  // Cambiar entre meses
  const handleDateChange = (direction) => {
    if (direction === "prev") {
      setCurrentDate(prev => subMonths(prev, 1));
    } else {
      setCurrentDate(prev => addMonths(prev, 1));
    }
  };

  // Ir al día actual
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // ================ MANEJADORES DE CITAS ================

 

  // Abrir modal para nueva cita
  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setIsEditing(false);
    setShowAppointmentModal(true);
  };

  // Manejar click en una cita existente
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setShowAppointmentModal(true);
  };


  


  // Iniciar proceso de eliminación de cita
  const handleDeleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (isEditing) {
      // Actualizar cita existente
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentData.id ? appointmentData : apt
        )
      );
      toast.success('Cita actualizada exitosamente');
    } else {
      // Crear nueva cita
      setAppointments(prev => [...prev, appointmentData]);
      toast.success('Cita creada exitosamente');
    }
    setShowAppointmentModal(false);
    setSelectedAppointment(null);
    setIsEditing(false);
  };


  // ================ MANEJADORES DE FORMULARIO ================


  
    // ================ FUNCIONES AUXILIARES ================

  // Verificar superposición de horarios
  const checkTimeOverlap = (newAppointment) => {
    const newStart = new Date(`${newAppointment.date}T${newAppointment.time}`);
    const newEnd = new Date(newStart.getTime() + newAppointment.duration * 60000);

    return appointments.some(existing => {
      if (existing.id === newAppointment.id) return false;
      
      const existingStart = new Date(`${existing.date}T${existing.time}`);
      const existingEnd = new Date(existingStart.getTime() + existing.duration * 60000);

      return (
        existing.provider === newAppointment.provider &&
        newStart < existingEnd &&
        newEnd > existingStart
      );
    });
  };

  // Función mejorada para obtener citas de un día específico
  const getAppointmentsForDay = (day) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    console.log('Buscando citas para:', formattedDay);
    
    const dayAppointments = appointments.filter(appointment => {
      // Asegurarse de que appointment.date es una cadena válida
      if (!appointment.date) {
        console.warn('Cita sin fecha:', appointment);
        return false;
      }

      try {
        const appointmentDate = parseISO(appointment.date);
        const isSame = format(appointmentDate, 'yyyy-MM-dd') === formattedDay;
        console.log('Comparando:', {
          appointmentDate: format(appointmentDate, 'yyyy-MM-dd'),
          dayToCheck: formattedDay,
          matches: isSame,
          appointment
        });
        return isSame;
      } catch (error) {
        console.error('Error al procesar la fecha de la cita:', appointment, error);
        return false;
      }
    });

    console.log('Citas encontradas para', formattedDay, ':', dayAppointments);
    return dayAppointments.sort((a, b) => {
      // Ordenar por hora
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
  };

  // ================ MANEJADORES DE MODALES ================

  // Confirmar eliminación de cita
  const handleConfirmDelete = () => {
    setAppointments(prev => 
      prev.filter(apt => apt.id !== selectedAppointment.id)
    );
    toast.success('Cita eliminada exitosamente');
    setShowConfirmModal(false);
    setSelectedAppointment(null);
  };
  // ================ RENDERIZADO ================

  return(
    <div className="calendar-container">
      {/* Barra de herramientas */}
      <div className="calendar-toolbar">
        <div className="toolbar-left">
          <button onClick={() => handleDateChange("prev")}>
            <FaChevronLeft />
          </button>
          <button onClick={() => handleDateChange("next")}>
            <FaChevronRight />
          </button>
          <button onClick={goToToday}>Hoy</button>
          <span className="current-date">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </span>
        </div>

        <div className="toolbar-center">
          <button
            className={viewMode === "month" ? "active" : ""}
            onClick={() => setViewMode("month")}
          >
            Mes
          </button>
          <button
            className={viewMode === "week" ? "active" : ""}
            onClick={() => setViewMode("week")}
          >
            Semana
          </button>
          <button
            className={viewMode === "day" ? "active" : ""}
            onClick={() => setViewMode("day")}
          >
            Día
          </button>
        </div>

        <div className="toolbar-right">
          <button className="new-appointment-btn" onClick={handleNewAppointment}>
            <FaPlus /> Nueva Cita
          </button>
          <button onClick={() => setShowSidebar(!showSidebar)}>
            <FaFilter />
          </button>
          <button>
            <FaCog />
          </button>
        </div>
      </div>

      {/* Contenido principal del calendario */}
      <div className="calendar-content">
        {/* Vista de Mes */}
        {viewMode === "month" && (
          <MonthView
            currentDate={currentDate}
            appointments={appointments} // Pasar todas las citas
            onAppointmentClick={handleAppointmentClick}
            onDeleteAppointment={handleDeleteAppointment}
            getAppointmentsForDay={getAppointmentsForDay}
          />
        )}

        {/* Vista de Semana */}
        {viewMode === "week" && (
          <WeekView
            currentDate={currentDate}
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
            getAppointmentsForDay={getAppointmentsForDay}
          />
        )}

        {/* Vista de Día */}
        {viewMode === "day" && (
          <DayView
            currentDate={currentDate}
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
            getAppointmentsForDay={getAppointmentsForDay}
          />
        )}
      </div>

    
         {/* Modal de Citas */}
      {showAppointmentModal && (
        <AppointmentModal
          isOpen={showAppointmentModal}
          onClose={() => {
            setShowAppointmentModal(false);
            setSelectedAppointment(null);
            setIsEditing(false);
          }}
          onSave={handleSaveAppointment}
          appointment={selectedAppointment}
          isEditing={isEditing}
        />
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <ConfirmationModal
          title="Eliminar Cita"
          message="¿Estás seguro de que deseas eliminar esta cita?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      
      



    </div>
  );
};

export default Calendar;
