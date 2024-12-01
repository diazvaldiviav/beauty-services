const mockAppointments = [
  {
    id: 1,
    client: "María García",
    service: "Corte de Cabello + Peinado",
    provider: "Maria Stylist",
    date: "2023-12-04", // Esta semana
    time: "09:00",
    duration: 60,
    price: "50",
    status: "confirmed"
  },
  {
    id: 2,
    client: "Ana López",
    service: "Manicure & Pedicure",
    provider: "Laura Nails",
    date: "2023-12-04",
    time: "11:00",
    duration: 90,
    price: "65",
    status: "pending"
  },
  {
    id: 3,
    client: "Carmen Ruiz",
    service: "Tinte + Mechas",
    provider: "Sofia Color",
    date: "2023-12-05",
    time: "14:00",
    duration: 120,
    price: "120",
    status: "confirmed"
  },
  {
    id: 4,
    client: "Julia Martínez",
    service: "Tratamiento Facial",
    provider: "Maria Stylist",
    date: "2023-12-06",
    time: "10:00",
    duration: 60,
    price: "80",
    status: "confirmed"
  },
  {
    id: 5,
    client: "Laura Sánchez",
    service: "Corte de Cabello + Peinado",
    provider: "Maria Stylist",
    date: "2023-12-07",
    time: "16:00",
    duration: 60,
    price: "50",
    status: "pending"
  },
  {
    id: 6,
    client: "Patricia Díaz",
    service: "Manicure & Pedicure",
    provider: "Laura Nails",
    date: "2023-12-11",
    time: "09:00",
    duration: 90,
    price: "65",
    status: "confirmed"
  },
  {
    id: 7,
    client: "Isabel Torres",
    service: "Tinte + Mechas",
    provider: "Sofia Color",
    date: "2023-12-12",
    time: "15:00",
    duration: 120,
    price: "120",
    status: "pending"
  },
  {
    id: 8,
    client: "Rosa Flores",
    service: "Tratamiento Facial",
    provider: "Maria Stylist",
    date: "2024-12-13",
    time: "11:00",
    duration: 60,
    price: "80",
    status: "confirmed"
  },
  {
    id: 9,
    client: "Elena Vargas",
    service: "Corte de Cabello + Peinado",
    provider: "Maria Stylist",
    date: "2024-12-14",
    time: "14:00",
    duration: 60,
    price: "50",
    status: "confirmed"
  },
  {
    id: 10,
    client: "Sofía Morales",
    service: "Manicure & Pedicure",
    provider: "Laura Nails",
    date: "2024-12-18",
    time: "10:00",
    duration: 90,
    price: "65",
    status: "pending"
  },
  {
    id: 11,
    client: "Lucía Herrera",
    service: "Tinte + Mechas",
    provider: "Sofia Color",
    date: "2024-12-19",
    time: "13:00",
    duration: 120,
    price: "120",
    status: "confirmed"
  },
  {
    id: 12,
    client: "Marina Castro",
    service: "Tratamiento Facial",
    provider: "Maria Stylist",
    date: "2024-12-01",
    time: "15:00",
    duration: 60,
    price: "80",
    status: "pending"
  },
  // Citas para noviembre
  // Citas para noviembre 2024
  {
    id: 13,
    client: "Valentina Ramos",
    service: "Corte de Cabello + Peinado",
    provider: "Maria Stylist",
    date: "2024-12-1",
    time: "09:00",
    duration: 60,
    price: "50",
    status: "confirmed"
  },
  {
    id: 14,
    client: "Carolina Ortiz",
    service: "Manicure & Pedicure",
    provider: "Laura Nails",
    date: "2024-11-1",
    time: "11:00",
    duration: 90,
    price: "65",
    status: "pending"
  },
  {
    id: 15,
    client: "Diana Mendoza",
    service: "Tinte + Mechas",
    provider: "Sofia Color",
    date: "2024-12-2",
    time: "14:00",
    duration: 120,
    price: "120",
    status: "completed"
  }
];

// Servicios disponibles
export const AVAILABLE_SERVICES = [
  {
    id: 1,
    name: "Corte de Cabello + Peinado",
    duration: 60,
    price: 50
  },
  {
    id: 2,
    name: "Manicure & Pedicure",
    duration: 90,
    price: 65
  },
  {
    id: 3,
    name: "Tinte + Mechas",
    duration: 120,
    price: 120
  },
  {
    id: 4,
    name: "Tratamiento Facial",
    duration: 60,
    price: 80
  }
];

// Proveedores de servicios
export const SERVICE_PROVIDERS = [
  {
    id: 1,
    name: "Maria Stylist",
    services: [1, 4]
  },
  {
    id: 2,
    name: "Laura Nails",
    services: [2]
  },
  {
    id: 3,
    name: "Sofia Color",
    services: [3]
  }
];

// Estados de las citas
export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed"
};

export default mockAppointments;