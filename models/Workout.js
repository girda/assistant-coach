const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sets: {
        type: [Number],
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    exercises: {
        type: [exerciseSchema],
        required: true
    },

    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('workouts', workoutSchema);
