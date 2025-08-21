import { Router } from "express";
import { deleteUser, getAllEventsAdmin, getAllRegistrationsAdmin, getAllUsersAdmin, getAnalytics, getCategoryPerformanceAnalytics, getDashboardStats, getEventPerformanceAnalytics, getLeaderboard, getUserPerformanceAnalytics, updateScore, updateUser } from "../controllers/admin.controllers.js";
import verifyJWT from '../middleware/auth.middleware.js'
import isAdmin from "../middleware/isAdmin.middleware.js";


const adminRouter = Router()

adminRouter.route('/admin/dashboard').get(verifyJWT,isAdmin,getDashboardStats)
adminRouter.route('/admin/users').get(verifyJWT,isAdmin,getAllUsersAdmin)
adminRouter.route('/admin/users/:id').put(verifyJWT,isAdmin,updateUser)
adminRouter.route('/admin/users/:id').delete(verifyJWT,isAdmin,deleteUser)
adminRouter.route('/admin/events').get(verifyJWT,isAdmin,getAllEventsAdmin)
adminRouter.route('/admin/registrations').get(verifyJWT,isAdmin,getAllRegistrationsAdmin)
adminRouter.route('/admin/scores').post(verifyJWT,isAdmin,updateScore)
adminRouter.route('/admin/analytics').get(verifyJWT,isAdmin,getAnalytics)
adminRouter.route('/analytics/events').get(verifyJWT,isAdmin,getEventPerformanceAnalytics)
adminRouter.route('/analytics/users').get(verifyJWT,isAdmin,getUserPerformanceAnalytics)
adminRouter.route('/analytics/categories').get(verifyJWT,isAdmin,getCategoryPerformanceAnalytics)
adminRouter.route('/analytics/leaderboard').get(verifyJWT,getLeaderboard)

export default adminRouter