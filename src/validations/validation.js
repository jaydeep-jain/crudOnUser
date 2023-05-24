const mongoose=require('mongoose')

const isValidMobile=function(mobile){
    return /^[6-9]\d{9}$/.test(mobile)
}

const isValidString=function(string){
    if (typeof value == 'string' && value.trim().length === 0) return false;
      return true;
}

const isValidSpace = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidEmail=function(email){
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) //24
}

const isvalidRequest = function (body) {
    return Object.keys(body).length > 0 //plz enter the data in the body
}

const isValidName = function (name) {
    return /^([A-Za-z]+)$/.test(name) //atoz
}


const isValidImg = (img) => {
    return /image\/png|image\/jpeg|image\/jpg/.test(img)
}
      



module.exports={isValidMobile,isValidString,isValidEmail,isValidObjectId,isValidSpace,isvalidRequest,isValidName,isValidImg}
