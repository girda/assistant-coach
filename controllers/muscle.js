const Muscle = require('../models/Muscle');
const errorHandler = require('../util/errorHandlers');

module.exports.getByCategoryId = async (req, res) => {
    try {
        const muscle = await Muscle.find({
            category: req.params.categoryId,
            user: req.user.id
        });
        res.status(200).json(muscle)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.create = async (req, res) => {
    const muscle = new Muscle({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })

    try {
        await muscle.save();
        res.status(201).json(muscle)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.remove = async (req, res) => {
    try {
        await Muscle.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена!'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.update = async (req, res) => {
    try {
        const muscle = await Muscle.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(muscle);
    } catch (error) {
        errorHandler(res, error)
    }
}