const Ticket = require('../models/Ticket');

// Obtener todos los tickets (GET /api/tickets)
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ fechaCreacion: -1 });
        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: error.message });
    }
};

// Obtener un ticket por ID (GET /api/tickets/:id)
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, mensaje: 'Ticket no encontrado' });
        }
        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: error.message });
    }
};

// Crear un nuevo ticket (POST /api/tickets)
exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        // Manejo de errores de validación
        if (error.name === 'ValidationError') {
            const mensajes = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, errores: mensajes });
        }
        res.status(500).json({ success: false, mensaje: error.message });
    }
};

// Actualizar un ticket (PUT /api/tickets/:id)
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // devuelve el documento actualizado y valida
        );
        if (!ticket) {
            return res.status(404).json({ success: false, mensaje: 'Ticket no encontrado' });
        }
        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const mensajes = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, errores: mensajes });
        }
        res.status(500).json({ success: false, mensaje: error.message });
    }
};

// Eliminar un ticket (DELETE /api/tickets/:id)
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, mensaje: 'Ticket no encontrado' });
        }
        res.status(200).json({ success: true, mensaje: 'Ticket eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: error.message });
    }
};