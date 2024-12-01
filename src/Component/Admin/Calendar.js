import React, { useState, useEffect } from "react";
import { 
  format, 
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  getHours,
  getMinutes
} from "date-fns";
import { es } from "date-fns/locale";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlus, 
  FaFilter, 
  FaCog,
  FaEdit,
  FaTrash 
} from "react-icons/fa";

// Importa los datos de prueba
import mockAppointments, { 
  AVAILABLE_SERVICES, 
  SERVICE_PROVIDERS, 
  APPOINTMENT_STATUS 
} from '../../Data/mockAppointments'; // Nota el cambio aquí de mockAppointments a mockAppoiment


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
  const [appointmentForm, setAppointmentForm] = useState(defaultAppointmentForm);
  
  // Estados de los modales
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados de filtros
  const [selectedClient, setSelectedClient] = useState(null);
  const [showMyVisitsOnly, setShowMyVisitsOnly] = useState(false);

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


  

  // Abrir modal para editar cita
  const handleEditAppointment = (appointment) => {
    setIsEditing(true);
    setSelectedAppointment(appointment);
    setAppointmentForm(appointment);
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

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      ...appointmentForm,
      id: isEditing ? selectedAppointment.id : appointments.length + 1,
    };

    // Validar la cita antes de guardar
    if (!validateAppointment(newAppointment)) return;

    if (isEditing) {
      setAppointments(prev => 
        prev.map(apt => apt.id === newAppointment.id ? newAppointment : apt)
      );
      toast.success('Cita actualizada exitosamente');
    } else {
      setAppointments(prev => [...prev, newAppointment]);
      toast.success('Cita creada exitosamente');
    }

    handleCloseModal();
  };

    // ================ FUNCIONES AUXILIARES ================

  // Validar cita antes de guardar
  const validateAppointment = (appointment) => {
    // Validar que la fecha no sea en el pasado
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    if (appointmentDateTime < new Date()) {
      toast.error('No se pueden crear citas en el pasado');
      return false;
    }

    // Validar superposición de horarios
    if (checkTimeOverlap(appointment)) {
      toast.error('El horario se superpone con otra cita del mismo proveedor');
      return false;
    }

    return true;
  };

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

  // Cerrar modal de citas
  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setAppointmentForm(defaultAppointmentForm);
    setIsEditing(false);
    setSelectedAppointment(null);
  };

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
  return (
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