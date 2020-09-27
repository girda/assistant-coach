const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    client:{
        type: String
    }
})

module.exports = mongoose.model('clients', clientSchema);