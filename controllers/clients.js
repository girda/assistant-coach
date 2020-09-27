const Client = require('../models/Client');
const errorHandler = require('../util/errorHandlers');

module.exports.getAll = async (req, res) => {
    try {
        console.log(req.user.id);
        const clients = await Client.find({user: req.user.id});
        console.log(clients);
        res.status(200).json(clients);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getById = async (req, res) => {
    console.log(req.params.id);
    try {
        const clients = await Client.findById(req.params.id);
        res.status(200).json(clients);
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
    const candidate = await Client.findOne({name: req.body.name});
    console.log(candidate)
    if (candidate) {
        res.status(409).json({
            message: 'Тренировка с таким названием существует! Поменяйте название тренировки.'
        })
    } else {
        const clients = new Client({
            name: req.body.name,
            user: req.user.id,
            price: req.body.price
        });
        try {
            await clients.save();
            res.status(201).json({
                message: 'Клиент успешно создан!'
            })
        } catch (error) {
            errorHandler(res, error);
        }
    }


};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        price: req.body.price
    };

    try {
        await Client.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json({
            message: 'Изменения успешно сохраненны!'
        })
    } catch (error) {
        errorHandler(res, error)
    }
};
