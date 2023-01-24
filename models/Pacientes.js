const mongoose = require('mongoose');

// Esquema para pacientes
const PacientesSchema = new mongoose.Schema({
    idPaciente: {
        type: Number,
        required: true,
    },
    tipoDocumentoPaciente: {
        type: String,
        required: true,
    },
    nombrePaciente: {
        type: String,
        required: true,
    },
    direccionPaciente: {
        type: String,
        required: true,
    },
    epsPaciente: {
        type: String,
        required: true,
    },
    statusPaciente: {
        type: Boolean,
        required: true,
    }
})

const Pacientes = mongoose.model("pacientes", PacientesSchema);
module.exports = Pacientes;
