const express = require('express');
const router = express.Router();
const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

// Definir rutas
router.get('/', getAllTickets);                 // GET /api/tickets
router.get('/:id', getTicketById);              // GET /api/tickets/:id
router.post('/', createTicket);                 // POST /api/tickets
router.put('/:id', updateTicket);               // PUT /api/tickets/:id
router.delete('/:id', deleteTicket);            // DELETE /api/tickets/:id

module.exports = router;