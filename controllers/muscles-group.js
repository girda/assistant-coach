const MusclesGroup = require('../models/MusclesGroup');
const Muscle = require('../models/Muscle');
const errorHandler = require('../util/errorHandlers');

module.exports.getAll = async (req, res) => {
    try {
        const musclesGroup = await MusclesGroup.find({user: req.user.id});
        res.status(200).json(musclesGroup);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getAllMuscles = async (req, res) => {
    try {
        const musclesGroup = await MusclesGroup.find({user: req.user.id});
        const muscles = await Muscle.find({user: req.user.id})
        const dataMusclesGroupWithChildren = []

        musclesGroup.map((group, i) => {

            dataMusclesGroupWithChildren[i] = {
                _id: group._id,
                name: group.name,
                user: group.user,
                children: []
            }

            muscles.forEach(muscle => {
                if (group._id.toString() == muscle.category.toString()) {
                    dataMusclesGroupWithChildren[i].children.push(muscle)
                }
            })
        })

        res.status(200).json(dataMusclesGroupWithChildren);
    } catch (error) {
        errorHandler(res, error);
    }
};


module.exports.getById = async (req, res) => {
    try {
        const musclesGroup = await MusclesGroup.findById(req.params.id);
        res.status(200).json(musclesGroup);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await MusclesGroup.remove({_id: req.params.id});
        await Muscle.remove({musclesGroup: req.params.id});
        res.status(200).json({
            message: 'Категория удалена!'
        });
    } catch (error) {
        errorHandler(res, error)
    }
};

module.exports.create = async (req, res) => {
    const musclesGroup = new MusclesGroup({
        name: req.body.name,
        user: req.user.id
    });
    try {
        await musclesGroup.save();
        res.status(201).json(musclesGroup)
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name
    };

    if (req.file) {
        updated.imageSrc = req.body.path
    }
    
    try {
        const musclesGroup = await MusclesGroup.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(musclesGroup)
    } catch (error) {
        errorHandler(res, error)
    }
};