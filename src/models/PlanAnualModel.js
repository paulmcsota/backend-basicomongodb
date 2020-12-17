const { Schema, model } = require('mongoose');

const estadosValidos = {
   values: ['Creado', 'Programado', 'Finalizado'],
   message: '{VALUE} no es un estado válido'
};

const PlanAnualSchema = Schema({
   anio: {
      type: Number,
      unique: true,
      required: true,
   },
   plazo: {
      type: Date,
      required: true,
   },
   fechaRegistro: {
      type: Date,
      required: true,
   },
   observaciones: {
      type: String,
      required: false
   },
   predeterminado: {
      type: Boolean,
      required: true,
   },
   estadoPlanAnual: {
      type: String,
      default: 'Creado',
      enum: estadosValidos
   }
});



module.exports = model('PlanAnual', PlanAnualSchema);