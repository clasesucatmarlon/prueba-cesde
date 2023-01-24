const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || '5000';

// Importar modelos
const PacientesModel = require('./models/Pacientes');
const MedicosModel = require('./models/Medicos');
const CitasModel = require('./models/Citas');


app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://admin:admin12345@cesde.vjnvlqq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})


// Endpoint para insertar nueva cita
app.post('/insert', async(req, res) => {
    // Capturando valores enviados desde el fronted - Formulario
    // console.log(req.body)
    const codigoCita = req.body.codigoCita;
    // const fechaCita = req.body.fechaCita;
    const idPaciente = req.body.idPaciente;
    const idMedico = req.body.idMedico;
    const diagnosticoPaciente = req.body.diagnosticoPaciente;
    const statusCita = req.body.statusCita;

    const cita = new CitasModel({
        codigoCita: codigoCita, 
        fechaCita: new Date(), 
        idPaciente: idPaciente,
        idMedico: idMedico,
        diagnosticoPaciente: diagnosticoPaciente,
        statusCita: statusCita
    });
    try {
        await cita.save();
        res.send("Insertado registro en la tabla citas");
    } catch {
        console.log(err);
    }
})


// Endpoint para consultar citas
app.get('/read', async(req, res) => {
    CitasModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
})


// Endpoint para actualizar citas
app.put('/update', async(req, res) => {
    // Capturando valores enviados desde el fronted - Formulario
    //console.log(req.body)
    const codigoCita = req.body.codigoCita;
    const idMedico = req.body.idMedico;
    const newFechaCita = req.body.fechaCita;
    const newIdPaciente = req.body.idPaciente;
    const newIdMedico = req.body.idMedico;
    const NewDiagnosticoPaciente = req.body.diagnosticoPaciente;
    const newStatusCita = req.body.statusCita;
    try {
        MedicosModel.findById(idMedico, (error)  => {
            try {
                res.send("El médico existe en la Base de datos....");
            } catch (error) {
                console.log(err)
            }
        })
        PacientesModel.findById(codigoCita, (err, updatedCita) => {
            updatedCita.codigoCita = codigoCita
            updatedCita.fechaCita = newFechaCita
            updatedCita.idPaciente = newIdPaciente
            updatedCita.idMedico = newIdMedico
            updatedCita.diagnosticoPaciente = NewDiagnosticoPaciente
            updatedCita.statusCita = newStatusCita
            updatedCita.save()
            res.send("Actualizado el registro correctamente....");
        } )
    } catch (err) {
        console.log(err)
    }
})


// Endpoint para eliminar cita
app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    await CitasModel.findByIdAndRemove(id).exec();
    res.send("Eliminada correctamente la cita....");
})


app.listen(PORT, () => {
    console.log("Server running in port...... ", PORT);
})

