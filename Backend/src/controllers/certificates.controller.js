import Certificate from "../models/certificates.models.js";
import User from "../models/user.models.js";
import Event from "../models/events.models.js"
import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import uploadeToCloudinary from "../utils/cloudinary.utils.js"

//get certificate
const getCertificate = asyncHandler(async(req,res)=>{
    //get id from body
    const {id} = req.params
    if(!id){
        throw new apiError(400,'certificate id is incorrect')
    }
    //find cert
    const cert = await Certificate.findById(id)
    if(!cert){
        throw new apiError(404,'certificate is missing')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            cert,
            'certificate fetched successfully'
        )
    )
})

//get certificate by user id
const getCertificateByUserId = asyncHandler(async(req,res)=>{
    //get id from body
    const {userId} = req.params
    if(!userId){
        throw new apiError(404,'wrong user id provided')
    }
    //find cert
   const cert =  await Certificate.findOne({userId})
    
    if(!cert){
        throw new apiError(404,'certificate is missing')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            cert,
            'certificate fetched successfully'
        )
    )
})

//upload certificate(only admin)
const uploadCertificate = asyncHandler(async(req,res,next)=>{
    //get the cert data 
    const {score,userId,eventId} = req.body
    if([score,userId,eventId].some((fields)=>fields.trim()=="")){
        throw new apiError(400,'all fields are required')
    }
    //validate data
    const existing = await Certificate.findOne({userId,eventId })
    if(existing){
        throw new apiError(404,'certificate is allready uploaded')
    }
    //check admin
    if(req.user.role!="admin"){
        throw new apiError(400,'only admin can upload certificate')
    }
    //get the user
    const user = await User.findById(userId)
    if(!user){
        throw new apiError(400,'user not found')
    }
    
    //get the event
    const event = await Event.findById(eventId)
    if(!event){
        throw new apiError(400,'event is missing')
    }
    //upload cert on multer
    const certPath = req.file?.path
    if(!certPath){
        throw new apiError(404,'certificate path is missing')
    }
    //upload on cloudinary
    const certificate = await uploadeToCloudinary(certPath)
    if(!certificate?.secure_url){
        throw new apiError(400,'something went wrong while uploading certificate on cloudinary')
    }
    //create cert in db
    const cert = await Certificate.create({
    
    userId,
    eventId,
    score,
    certificate: certificate.secure_url,

    })
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            cert,
            'certificate uploaded successfully'
        )
    )

})

//update cert (only admin)
const updateCertificates = asyncHandler(async(req,res,next)=>{
//get the data from body
const {score,isRevoked} = req.body
const {id} = req.params
if([score,isRevoked].some((fields) => fields?.trim() == "")){
    throw new apiError(400,'all fields are required')
}
//check admin
if(req.user.role != "admin"){
    throw new apiError(400,'only admin can update the certificate data')
}
//get the cert
const cert = await Certificate.findById(id)
if(!cert){
    throw new apiError(400,'certificate is not available on this is')
}

//update it
const certificate = await Certificate.findByIdAndUpdate(
    id,
{
    $set:{
        score,
        isRevoked
    }
},
{new:true})
//send res
return res
.status(200)
.json(
    new apiResponse(
        200,
       certificate,
       'certificate updated successfully'
    )
)
})

//delete cert(only admin)
const deleteCertificate = asyncHandler(async(req,res,next)=>{
    //get the cert
    const {id} = req.params
    //verify it
    const cert = await Certificate.findById(id)
    if(!cert){
        throw new apiError(400,'certificate is not available on this id')
    }
    console.log(req.user.role);
    
    //check admin
    if(req.user.role != 'admin'){
        throw new apiError(400,'only admin can access this')
    }
    //delete it
    const certificate = await Certificate.findByIdAndDelete(id)
    if(!certificate){
       throw new apiError(400,'certificate not deleted')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            'certificate deleted successfully'
        )
    )
})
export {
    getCertificate,
    getCertificateByUserId,
    uploadCertificate,
    updateCertificates,
    deleteCertificate
}