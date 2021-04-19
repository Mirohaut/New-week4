'use strict';
// userRoute
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator');


router.get('/', userController.user_list_get);
router.post('/',
    body('name').isLength({min: 3}).escape().blacklist(';'),
    body('email').isEmail(),
      body('passwd').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create);

router.get('/:id', userController.user_get_by_id);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

module.exports = router;
