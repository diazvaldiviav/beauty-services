const Appointment = [
    {
      id: 1,
      Name: "John Doe",
      Date: "2024-01-01",
      time: "10:00",
      services: ["Hair Treatment"],
      price: 100,
      person: 2,
      status: "pending" // Añadido estado de la cita
    },
    {
      id: 2,
      Name: "Jane Smith",
      Date: "2024-01-01",
      time: "10:00",
      services: ["Makeup"],
      price: 60,
      person: 2,
      status: "confirmed"
    },
    {
      id: 3,
      Name: "Alice Johnson",
      Date: "2024-01-01",
      time: "10:00",
      services: ["Facial Care", "Hair Treatment", "Haircut"],
      price: 50,
      person: 2,
      status: "pending"
    },
    {
      id: 4,
      Name: "Emma Wilson",
      Date: "2024-01-02",
      time: "14:30",
      services: ["Manicure"],
      price: 30,
      person: 1,
      status: "confirmed"
    },
    {
      id: 5,
      Name: "Sarah Davis",
      Date: "2024-01-02",
      time: "16:00",
      services: ["Pedicure", "Haircut"],
      price: 40,
      person: 1,
      status: "pending"
    }
  ];
  
  export default Appointment;