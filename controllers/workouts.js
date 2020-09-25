const MusclesGroup = require('../models/MusclesGroup');
const Workout = require('../models/Workout');
const errorHandler = require('../util/errorHandlers');

module.exports.getAll = async (req, res) => {
    try {
        const workout = await Workout.find({user: req.user.id});
        res.status(200).json(workout);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getById = async (req, res) => {
    console.log(req.params.id);
    try {
        const workout = await Workout.findById(req.params.id);
        res.status(200).json(workout);
    } catch (error) {
        errorHandler(res, error);
    }
};

// module.exports.remove = async (req, res) => {
//     try {
//         await MusclesGroup.remove({_id: req.params.id});
//         await Muscle.remove({musclesGroup: req.params.id});
//         res.status(200).json({
//             message: 'Категория удалена!'
//         });
//     } catch (error) {
//         errorHandler(res, error)
//     }
// };

module.exports.create = async (req, res) => {
    const candidate = await Workout.findOne({name: req.body.name});
    console.log(candidate)
    if (candidate) {
        res.status(409).json({
            message: 'Тренировка с таким названием существует! Поменяйте название тренировки.'
        })
    } else {
        const workout = new Workout({
            name: req.body.name,
            user: req.user.id,
            exercises: req.body.exercises
        });
        try {
            await workout.save();
            res.status(201).json({
                message: 'Тренировка успешно создана!'
            })
        } catch (error) {
            errorHandler(res, error);
        }
    }


};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        exercises: req.body.exercises
    };

    try {
        const workout = await Workout.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json({
            message: 'Тренировка успешно сохраненная!'
        })
    } catch (error) {
        errorHandler(res, error)
    }
};
