import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { deleteCertificate, getCertificate, getCertificateByUserId, updateCertificates, uploadCertificate } from "../controllers/certificates.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";




const certificateRouter = Router()
 
certificateRouter.route('/:id').get(verifyJWT,getCertificate)
certificateRouter.route('/user/:userId').get(verifyJWT,getCertificateByUserId)
certificateRouter.route('/generate').post(verifyJWT,isAdmin,
    upload.single("certificate"),
   uploadCertificate)
certificateRouter.route('/:id').put(verifyJWT,isAdmin,updateCertificates)
certificateRouter.route('/:id').delete(verifyJWT,isAdmin,deleteCertificate)


export default certificateRouter