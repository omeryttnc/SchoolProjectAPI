const router = require('express').Router()
const UserController = require('../users/controllers/UserController');



router.post(
    '/register',
    UserController.register
)

router.get(
    '/alluser',
    UserController.getAllUser
)
router.get(
    '/user',
    UserController.findUser
)

router.delete(
    '/delete',
    UserController.deleteUser
)

module.exports =router