import Certificate from "../models/certificates.models.js";
import Registration from "../models/registartion.models.js";
import User from "../models/user.models.js";
import Event from "../models/events.models.js";
import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import bcrypt from 'bcrypt'



//add or update rthe score
const updateScore = asyncHandler(async(req,res,next)=>{
//get the user and score from data
const {score,userId,certificateId} = req.body
//check admin
if(req.user.role != "admin"){
    throw new apiError(400,'only admin can update the score')
}
//chech fields not empty
if(!(score && userId && certificateId)){
    throw new apiError(400,'all fields are required')
}
//validfate certificate
const cert = await Certificate.findById(certificateId)
if(!cert){
    throw new apiError(400,'certificate is not available')
}
//update the score
const certificate = await Certificate.findByIdAndUpdate(
    certificateId,
    {
        $set:{
            score
        }
    },
    {new:true}
)
if(!certificate){
    throw new apiError(400,'something went wrong while updating the certificate')
}
//send res
return res
.status
.json(
    new apiResponse(
        200,
        certificate,
        'certificate score updated successfully'
    )
)
})

//update user
const updateUser = asyncHandler(async(req,res,next)=>{
  //get all the data from the request body
  const {id} = req.params;
    const { fullName, email, password, role, collegeName, department, year } = req.body;

    //check fields are empty
    if (!fullName || !email || !password || !collegeName || !department || !year ) {
        return next(new apiError("Please fill all the fields", 400));
    }

     // check if user exists
  const existedUser = await User.findById(id);
  if (!existedUser) {
    return next(new apiError("User does not exist", 404));
  }

  // build update object dynamically (only update provided fields)
  let updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (email) updateData.email = email.toLowerCase();
  if (role) updateData.role = role;
  if (collegeName) updateData.collegeName = collegeName;
  if (department) updateData.department = department;
  if (year) updateData.year = year;

  // handle password (if provided)
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password -refreshToken"); // hide sensitive fields

  if (!updatedUser) {
    throw new apiError(500, "Something went wrong while updating user");
  }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            updatedUser,
            'user updated successfully'
        )
    )
})

//delete user
const deleteUser = asyncHandler(async(req,res,next)=>{
    //get the data form body
    const {id} = req.params
    //check id
    const user = await User.findById(id)
    if(!user){
        throw new apiError(400,'userId is incorrect')
    }
    //delete user
    const delU = await User.findByIdAndDelete(id)
    if(delU){
        throw new apiError(500,'something went wrong while deleting the user')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            'user deleted successfully'

        )
    )
})

//get all events
const getAllEventsAdmin = asyncHandler(async (req, res) => {
  //  check role (only admin can access)
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can view all events");
  }

  //  fetch events with creator details
  const events = await Event.find()
    .populate("createdBy","-password -refreshToken") // show admin who created the event
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, events, "All events fetched successfully"));
});

//get all registration
const getAllRegistrationsAdmin = asyncHandler(async (req, res) => {
  // check role
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can view all registrations");
  }

    // Optional filters (by eventId, userId, status)
  const { eventId, userId, status } = req.query;

  const filter = {};
  if (eventId) filter.eventId = eventId;
  if (userId) filter.userId = userId;
  if (status) filter.status = status;

  // fetch with event + user details
  const registrations = await Registration.find()
    .populate("userId", "name email")   // show user details
    .populate("eventId", "title category difficulty") // show event details
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, registrations, "All registrations fetched successfully"));
});

//get all user
const getAllUsersAdmin = asyncHandler(async (req, res) => {
  // Ensure only admin can access
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can view all users");
  }

  // Optional filters (role, search by name/email)
  const { role, search } = req.query;

  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  // Fetch users
  const users = await User.find(filter)
    .select("-password -refreshToken") // never expose password
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, users, "All users fetched successfully"));
});

//get analytics data
const getAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can access analytics");
  }

  // Total counts
  const totalUsers = await User.countDocuments();
  const totalEvents = await Event.countDocuments();
  const totalRegistrations = await Registration.countDocuments();

  // Active events
  const activeEvents = await Event.countDocuments({ isActive: true });

  // Completed registrations
  const completedRegistrations = await Registration.countDocuments({
    status: "completed",
  });

  // Cancelled registrations
  const cancelledRegistrations = await Registration.countDocuments({
    status: "cancelled",
  });

  // Category-wise event count
  const eventsByCategory = await Event.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  // Difficulty-wise event count
  const eventsByDifficulty = await Event.aggregate([
    { $group: { _id: "$difficulty", count: { $sum: 1 } } },
  ]);

  // Registrations trend (last 7 days)
  const registrationTrends = await Registration.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$registrationDate" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const analytics = {
    totalUsers,
    totalEvents,
    totalRegistrations,
    activeEvents,
    completedRegistrations,
    cancelledRegistrations,
    eventsByCategory,
    eventsByDifficulty,
    registrationTrends,
  };

  return res
    .status(200)
    .json(new apiResponse(200, analytics, "Analytics fetched successfully"));
});

//admin dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can access dashboard stats");
  }

  // Summary counts
  const totalUsers = await User.countDocuments();
  const totalEvents = await Event.countDocuments();
  const totalRegistrations = await Registration.countDocuments();

  // Active events
  const activeEvents = await Event.countDocuments({ isActive: true });

  // Completed registrations
  const completedRegistrations = await Registration.countDocuments({
    status: "completed",
  });

  // Latest 5 users
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email role createdAt");

  // Latest 5 events
  const recentEvents = await Event.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title category difficulty startDate endDate createdAt");

  const stats = {
    totalUsers,
    totalEvents,
    totalRegistrations,
    activeEvents,
    completedRegistrations,
    recentUsers,
    recentEvents,
  };

  return res
    .status(200)
    .json(new apiResponse(200, stats, "Dashboard stats fetched successfully"));
});

// GET /api/analytics/events
const getEventPerformanceAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can access analytics");
  }

  const events = await Event.find().select("title category difficulty startDate endDate");

  // For each event, collect analytics
  const analytics = await Promise.all(
    events.map(async (event) => {
      const totalRegistrations = await Registration.countDocuments({ eventId: event._id });
      const completedRegistrations = await Registration.countDocuments({
        eventId: event._id,
        status: "completed",
      });
      const cancelledRegistrations = await Registration.countDocuments({
        eventId: event._id,
        status: "cancelled",
      });

      const avgScoreData = await Registration.aggregate([
        { $match: { eventId: event._id, score: { $ne: null } } },
        { $group: { _id: null, avgScore: { $avg: "$score" } } },
      ]);

      const avgScore = avgScoreData.length > 0 ? avgScoreData[0].avgScore : null;

      return {
        eventId: event._id,
        title: event.title,
        category: event.category,
        difficulty: event.difficulty,
        startDate: event.startDate,
        endDate: event.endDate,
        totalRegistrations,
        completedRegistrations,
        cancelledRegistrations,
        avgScore,
        completionRate:
          totalRegistrations > 0
            ? ((completedRegistrations / totalRegistrations) * 100).toFixed(2)
            : "0.00",
      };
    })
  );

  return res
    .status(200)
    .json(new apiResponse(200, analytics, "Event performance analytics fetched successfully"));
});

// GET /api/analytics/users
const getUserPerformanceAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can access analytics");
  }

  const users = await User.find().select("name email role");

  const analytics = await Promise.all(
    users.map(async (user) => {
      const totalRegistrations = await Registration.countDocuments({ userId: user._id });
      const completedEvents = await Registration.countDocuments({
        userId: user._id,
        status: "completed",
      });
      const cancelledEvents = await Registration.countDocuments({
        userId: user._id,
        status: "cancelled",
      });

      const scoreData = await Registration.aggregate([
        { $match: { userId: user._id, score: { $ne: null } } },
        {
          $group: {
            _id: null,
            avgScore: { $avg: "$score" },
            bestScore: { $max: "$score" },
          },
        },
      ]);

      const avgScore = scoreData.length > 0 ? scoreData[0].avgScore : null;
      const bestScore = scoreData.length > 0 ? scoreData[0].bestScore : null;

      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        totalRegistrations,
        completedEvents,
        cancelledEvents,
        avgScore,
        bestScore,
        completionRate:
          totalRegistrations > 0
            ? ((completedEvents / totalRegistrations) * 100).toFixed(2)
            : "0.00",
      };
    })
  );

  return res
    .status(200)
    .json(new apiResponse(200, analytics, "User performance analytics fetched successfully"));
});

// GET /api/analytics/categories
const getCategoryPerformanceAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new apiError(403, "Only admin can access analytics");
  }

  // Get all categories from events
  const categories = await Event.distinct("category");

  const analytics = await Promise.all(
    categories.map(async (category) => {
      const totalEvents = await Event.countDocuments({ category });

      const registrations = await Registration.find({ eventId: { $in: await Event.find({ category }).distinct("_id") } });

      const totalParticipants = registrations.length;
      const completedEvents = registrations.filter(r => r.status === "completed").length;

      const avgScore =
        registrations.length > 0
          ? (
              registrations
                .filter(r => r.score !== null && r.score !== undefined)
                .reduce((acc, r) => acc + r.score, 0) /
              registrations.filter(r => r.score !== null && r.score !== undefined).length
            ).toFixed(2)
          : null;

      return {
        category,
        totalEvents,
        totalParticipants,
        completedEvents,
        avgScore,
        completionRate:
          totalParticipants > 0
            ? ((completedEvents / totalParticipants) * 100).toFixed(2)
            : "0.00",
      };
    })
  );

  return res
    .status(200)
    .json(new apiResponse(200, analytics, "Category performance analytics fetched successfully"));
});

// GET /api/analytics/leaderboard
const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  // Aggregate registrations to calculate user performance
  const leaderboard = await Registration.aggregate([
    { $match: { status: "completed", score: { $ne: null } } },
    {
      $group: {
        _id: "$userId",
        totalEvents: { $sum: 1 },
        avgScore: { $avg: "$score" },
        totalScore: { $sum: "$score" },
      },
    },
    { $sort: { avgScore: -1 } },
    { $limit: limit },
  ]);

  // Populate user details
  const users = await User.find(
    { _id: { $in: leaderboard.map((l) => l._id) } },
    "name email role"
  );

  const result = leaderboard.map((entry) => {
    const user = users.find((u) => u._id.toString() === entry._id.toString());
    return {
      userId: entry._id,
      name: user?.name || "Unknown",
      email: user?.email || "N/A",
      role: user?.role || "user",
      totalEvents: entry.totalEvents,
      avgScore: entry.avgScore.toFixed(2),
      totalScore: entry.totalScore,
    };
  });

  return res
    .status(200)
    .json(new apiResponse(200, result, "Leaderboard fetched successfully"));
});

export {
    updateScore,
    updateUser,
    deleteUser,
    getAllEventsAdmin,
    getAllRegistrationsAdmin,
    getAllUsersAdmin,
    getAnalytics,
    getDashboardStats,
    getEventPerformanceAnalytics,
    getUserPerformanceAnalytics,
    getCategoryPerformanceAnalytics,
    getLeaderboard
}