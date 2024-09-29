import Reservation from "../models/reservation.model.js";

export const GetAllReservation = async (req, res) => {
  const getAllReservations = await Reservation.findAll();
  return res.status(200).json({
    data: getAllReservations,
    message: "se obtienen todas las reservas",
  });
};

export const GetOneReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const CreateReservation = async (req, res) => {
  try {
    const { name, place, hour, date, duration, department } = req.body;
    const newReservation = await Reservation.create({
      name,
      place,
      hour,
      date,
      duration,
      department,
    });
    return res.status(201).json({
      data: newReservation,
      message: "Reserva creada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateReservationById = async (req, res) => {
  try {
    const { name, place, hour, date, duration, department } = req.body;
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reservation.name = name;
    reservation.place = place;
    reservation.hour = hour;
    reservation.date = date;
    reservation.duration = duration;
    reservation.department = department;

    await reservation.save();

    return res.status(200).json({
      data: reservation,
      message: "Reserva actualizada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const DeleteReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reservation.destroy();
    return res.status(200).json({
      message: "Reserva eliminada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
