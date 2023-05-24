const aws=require('aws-sdk')

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1" //server
 })
 
 let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
  
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });
 
 // Check file size
 const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit in bytes
 if (file.size > fileSizeLimit) {
   return reject({ "error": "File size exceeds the allowed limit" });
 }

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "abc/" + file.originalname,
            Body: file.buffer
        }
 
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
 
            //console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
 
    })
}

 module.exports={uploadFile}