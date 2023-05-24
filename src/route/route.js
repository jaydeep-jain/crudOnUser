const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')



//-----------------------|| USER API'S ||---------------------------
router.post('/register',userController.userCreate)
router.get('/user/getAllData',userController.getAllUser)
router.get('/user/:userId/profile',userController.getUserDetails)
router.put('/user/:userId/profile',userController.updateUser)
router.delete('/user/:userId/profile',userController.deleteUser)


module.exports=router 


