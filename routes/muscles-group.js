const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/muscles-group');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/muscles', passport.authenticate('jwt', {session: false}), controller.getAllMuscles);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single(), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single(), controller.update);

module.exports = router;