const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [5, 'El título debe tener al menos 5 caracteres'],
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['hardware', 'red', 'software'],
        default: 'software'
    },
    prioridad: {
        type: String,
        required: [true, 'La prioridad es obligatoria'],
        enum: ['alta', 'media', 'baja'],
        default: 'media'
    },
    estado: {
        type: String,
        enum: ['abierto', 'en progreso', 'resuelto', 'cerrado'],
        default: 'abierto'
    },
    tecnicoAsignado: {
        type: String,
        default: null
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaResolucion: {
        type: Date,
        default: null
    }
}, {
    timestamps: true // añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Ticket', ticketSchema);