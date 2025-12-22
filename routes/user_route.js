const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getAllUsers,getUserById,updateUser,deleteUser}= require("../controllers/user_controller")

router.post('/',registerUser);            // route for user register
router.post('/login',loginUser);          // route for user login
router.get('/',getAllUsers);              // route for list user
router.get('/:id',getUserById);           // route for get user detail by id
router.put('/:id',updateUser);            // route for update user detail 
router.delete('/:id',deleteUser);         // route for delete user 

module.exports = router;
