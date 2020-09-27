const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const workoutsRoutes = require('./routes/workouts');
const clientsRoutes = require('./routes/clients');
const musclesGroupRoutes = require('./routes/muscles-group');
// const orderRoutes = require('./routes/order');
const muscleRoutes = require('./routes/muscle');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/muscles-group', musclesGroupRoutes);
app.use('/api/muscles', muscleRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/clients', clientsRoutes);

module.exports = app;
