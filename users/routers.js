const router = require('express').Router()
const UserController = require('../users/controllers/UserController');

// router.post(
//     '/signup',
//     (req,res)=>{
//         res.status(200).json({
//             status:true,
//             data:{
//                 user:"sign up"
//             }
//         })
//     }
// )

router.post(
    '/register',
    UserController.register
)

router.get(
    '/alluser',
    UserController.getAllUser
)

module.exports =router