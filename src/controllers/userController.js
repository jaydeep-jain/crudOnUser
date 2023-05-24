const userModel = require('../models/userModel')

const v = require('../validations/validation')
const { uploadFile } = require('../aws/aws')


const userCreate = async function (req, res) {
   try {
      let data = req.body
      if (!v.isvalidRequest(data)) return res.status(400).send({ status: false, message: `data is mandatory` })

      let { fname, lname, email, phone, } = data

      let files = req.files

      if (files.length == 0) return res.status(400).send({ status: false, message: "profileImage is mandatory" })

      if (files && files.length > 0) {
         if (!(v.isValidImg(files[0].mimetype))) { return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" }); }

         var photolink = await uploadFile(files[0])
      }

      if (!v.isValidSpace(fname)) return res.status(400).send({ status: false, message: `fname is mandatory` })

      if (!v.isValidName(fname)) return res.status(400).send({ status: false, message: `fname is must in char` })

      if (!v.isValidSpace(lname)) return res.status(400).send({ status: false, message: `lname is mandatory` })

      if (!v.isValidName(lname)) return res.status(400).send({ status: false, message: `lname is must in char` })

      if (!v.isValidSpace(email)) return res.status(400).send({ status: false, message: `email is mandatory` })

      if (!v.isValidEmail(email)) return res.status(400).send({ status: false, message: `email is in valid format` })

      if (await userModel.findOne({ email: email })) return res.status(400).send({ status: false, message: `email already exist` })

      if (!v.isValidSpace(phone)) return res.status(400).send({ status: false, message: `phone is mandatory` })

      if (!v.isValidMobile(phone)) return res.status(400).send({ status: false, message: `enter a valid phone number` })

      if (await userModel.findOne({ phone: phone })) return res.status(400).send({ status: false, message: `phone already exist` })

     
      data.profileImage = photolink
      
      let userData = await userModel.create(data)
      return res.status(201).send({ status: true, message: 'Success', data: userData })
   }
   catch (err) {
      return res.status(500).send({ status: false, message: err.message })
   }
}

// get allUsers Api

const getAllUser = async function (req,res){
   try{

    let findAllUserData = await userModel.find()
      return res.status(200).send({ status: true, message: "User profile details", data: findAllUserData })

   }catch (err) {
      console.log(err.message)
      return res.status(500).send({ status: false, message: err.message })
   }
}



// get param api
const getUserDetails = async function (req, res) {
   try {
      let userIdByparams = req.params.userId

      if (!v.isValidObjectId(userIdByparams)) return res.status(400).send({ status: false, message: ` not valid userId` })

      let findUserData = await userModel.findById({ _id: userIdByparams })
      return res.status(200).send({ status: true, message: "User profile details", data: findUserData })

   } catch (err) {
      console.log(err.message)
      return res.status(500).send({ status: false, message: err.message })
   }

}




// update user  

const updateUser = async function (req, res) {
   try {
      const { userId } = req.params
      let data = req.body
      const files = req.files
         
      if (!(v.isvalidRequest(data)|| files)) return res.status(400).send({ status: false, message: "please Enter data inside request body" })

      let updateData = {}

      const { fname, lname, email, phone } = data
      
      for(let key in req.body){
         if(req.body[key].trim().length==0){
             return res.status(400).send({status:false, message:`${key} can't be empty`})
         }
      }
      
      if (files.length != 0) {
         const uploadedFileURL = await uploadFile(files[0])
         if (!(v.isValidImg(files[0].mimetype))) { return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" }); }

         updateData['profileImage'] = uploadedFileURL;
      }

      if (fname) {
         if (!v.isValidName(fname)) {
            return res.status(400).send({ status: false, message: "fname should be in character" });
         }
         updateData['fname'] = fname
      }

      if (lname) {
         if (!v.isValidName(lname)) return res.status(400).send({ status: false, message: "lname should be in character" })
         updateData['lname'] = lname
      }

      if (email) {
         if (!v.isValidEmail(email)) return res.status(400).send({ status: false, message: "Provide Email in Proper format" })
         const ExistEmail = await userModel.findOne({ email: email })
         if (ExistEmail) return res.status(400).send({ status: false, message: 'give another email to update' })

         updateData['email'] = email
      }

      if (phone) {
         if (!v.isValidMobile(phone)) return res.status(400).send({ status: false, message: "Provide Phone number in Proper format" })
         const ExistPhone = await userModel.findOne({ phone: phone })
         if (ExistPhone)return  res.status(400).send({ status: false, message: 'give another phone to update' })

         updateData['phone'] = phone
      }

      const updateduserprofile = await userModel.findOneAndUpdate({ _id: userId }, updateData, { new: true })
      return res.status(200).send({ status: true, message: "Success", data: updateduserprofile })

   }
   catch (err) {
      return res.status(500).send({ status: false, message: err.message })
   }
}

const deleteUser = async function (req, res) {    
   try {
       let userId = req.params.userId
       if (!v.isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is not valid" })

       let userData = await userModel.findOne({ _id: userId })
       if (!userData) return res.status(404).send({ status: false, msg: "no data found by this userId" })

       
       let deletedUser = await userModel.findByIdAndDelete({ _id: userId })

       return res.status(200).send({ status: true, message: "Success"})

   } catch (err) {
       return res.status(500).send({ status: false, message: err.message })
   }
}



module.exports = { userCreate,getAllUser,getUserDetails,updateUser,deleteUser }
