import { Router } from "express"
import { createEvent, deleteEvent, getAllEvents, getEvent, getEventsByCategory, getEventsByDifficulty, searchEventsByTitle, updateEvent } from "../controllers/events.controllers.js"
import verifyJWT from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import isAdmin from "../middleware/isAdmin.middleware.js"


const eventRouter = Router()

eventRouter.route('/').get(getAllEvents)
eventRouter.route('/:id').get(getEvent)
eventRouter.route('/').post(verifyJWT,isAdmin,
    upload.fields([{ name: 'image', maxCount: 1 }]),
   createEvent)
eventRouter.route('/:id').put(verifyJWT,isAdmin,updateEvent)
eventRouter.route('/:id').delete(verifyJWT,isAdmin,deleteEvent)
eventRouter.route('/category/:category').get(getEventsByCategory)
eventRouter.route('/difficulty/:difficulty').get(getEventsByDifficulty)
eventRouter.route('/search').get(searchEventsByTitle)

export default eventRouter