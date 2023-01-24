const mongoose = require('mongoose');

// Esquema para citas
const CitasSchema = new mongoose.Schema({
    codigoCita: {
        type: Number,
        required: true,
    },
    fechaCita: {
        type: Date,
        required: true,
    },
    idPaciente: {
        type: Number,
        required: true,
    },
    idMedico: {
        type: Number,
        required: true,
    },
    diagnosticoPaciente: {
        type: String,
        required: true,
    },
    statusCita: {
        type: Boolean,
        required: true,
    }
})

const Citas = mongoose.model("citas", CitasSchema);
module.exports = Citas;
