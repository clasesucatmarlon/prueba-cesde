const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || '5000';
const url = 'mongodb://localhost/cesde'

app.use(express.json());
app.use(cors());


mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then ( () => console.log('Conectado a la BD'))
    .catch( (error) => console.log('Error de conexión: ', error))


    
    
    const CitasSchema = new mongoose.Schema({
        codigoCita: Number,
        fechaCita: Date,
        idPaciente: Number,
        idMedico: Number,
        diagnosticoPaciente: String,
        statusCita: Boolean,
    }, {versionKey:false})
    
    const CitasModel = mongoose.model("citas", CitasSchema);
    
    
    // Consultar citas
    const ShowCitas = async () => {
        const citas = await CitasModel.find();
        console.log(citas);
    }
    // ShowCitas();
    

    // Insertar nueva cita
    const CreateCita = async () => {
        const cita = new CitasModel({
            codigoCita: 2, 
            fechaCita: new Date(), 
            idPaciente: 1,
            idMedico: 1,
            diagnosticoPaciente: 'Diagnostico 2',
            statusCita: false
        })
        const result = await cita.save();
        console.log(result)
    } 
    // CreateCita();


    
    // Actualizar citas
    const UpdateCita = async (id) => {
        const cita = await CitasModel.updateOne({_id: id},
            {
                $set: {
                    fechaCita: new Date(),
                    idPaciente: 2,
                    idMedico: 2,
                    diagnosticoPaciente: 'Diagnostico 22222',
                    statusCita: true
                }
            })
    }
// UpdateCita('63d0111c59aa0054b44599b2')


// Eliminar cita
const DeteleCita = async (id) => {
    const cita = await CitasModel.deleteOne({_id: id})
}
DeteleCita('63d0111c59aa0054b44599b2');



app.listen(PORT, () => {
    console.log("Server running in port...... ", PORT);
})

