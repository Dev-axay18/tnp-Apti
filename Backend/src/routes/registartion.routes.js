import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    cancelRegistration, createRegistrationFromGoogleForm,
    getEventRegistrations, getUserRegistartion,
    updateRegistration
} from "../controllers/registartion.controllers.js";
import isAdmin from "../middleware/isAdmin.middleware.js";



const registrationRouter = Router()

registrationRouter.route('/').post(verifyJWT,isAdmin, createRegistrationFromGoogleForm)
registrationRouter.route('/user/:userId').get(verifyJWT,isAdmin, getUserRegistartion)
registrationRouter.route('/event/:eventId').get(verifyJWT,isAdmin, getEventRegistrations)
registrationRouter.route('/:id').put(verifyJWT,isAdmin, updateRegistration)
registrationRouter.route('/:id').delete(verifyJWT,isAdmin, cancelRegistration)

export default registrationRouter





















































