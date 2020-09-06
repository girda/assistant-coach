const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musclesGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('muscles-group', musclesGroupSchema)