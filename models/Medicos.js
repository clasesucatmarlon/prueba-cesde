const mongoose = require('mongoose');

// Esquema para médicos
const MedicosSchema = new mongoose.Schema({
    idMedico: {
        type: Number,
        required: true,
    },
    tipoDocumentoMedico: {
        type: String,
        required: true,
    },
    nombreMedico: {
        type: String,
        required: true,
    },
    especialidadMedico: {
        type: String,
        required: true,
    },
    statusMedico: {
        type: Boolean,
        required: true,
    }
})

const Medicos = mongoose.model("medicos", MedicosSchema);
module.exports = Medicos;
