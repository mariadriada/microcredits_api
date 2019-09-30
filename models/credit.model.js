let mongoose = require("mongoose")

let Schema = mongoose.Schema

let creditSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    valor: {
        type: Number,
        required: true
    },
    plazo: {
        type: Number,
        required: true
    },
    interes: {
        type: Number,
        default: 0.02
    },
    cuota_mensual: {
        type: Number
    },
    solicitud: {
        type: Boolean,
        default: true
    },
    aprobado: {
        type: Boolean,
        default: false
    },
    fecha_solicitud: {
        type: Date,
        default: Date.now
    },
    fecha_aprobacion: {
        type: Date
    }
})

module.exports = mongoose.model('Credit', creditSchema) 