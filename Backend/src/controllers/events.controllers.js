import apiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import apiResponse from "../utils/apiResponse.utils.js"
import Event from "../models/events.models.js";
import uploadeToCloudinary from "../utils/cloudinary.utils.js";


//get event
const getEvent = asyncHandler(async (req, res, next) => {
    //get the events by using event id
    const {id}  = req.params
    if (!id) {
        throw new apiError('event id is required')
    }
    const event = await Event.findById(id )
    if (!event) {
        throw new apiError(400, 'wrong event id or event is missing')
    }
    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                event,
                'event fetched successfully'
            )
        )
})

//create event (only admin)
const createEvent = asyncHandler(async (req, res, next) => {
    //get the data from body
    const { title, description, category, difficulty, startDate, endDate, duration, maxParticipants } = req.body
    if ([title, description, category, difficulty, startDate, endDate, duration, maxParticipants].some((fields) => fields.trim() === " ")) {
        throw new apiError(400, 'all fields are required')
    }
    //validate data
    const existedEvent = await Event.findOne({
        $or: [{ title},{ description }]
    })
    if (existedEvent) {
        throw new apiError(400, 'event is allready existed')
    }
    //check the owner is admin
    if (req.user.role != "admin") {
        throw new apiError(400, 'only admin can create a event ')
    }

    //image upload to multer
    const imagePath = req.files?.image?.[0]?.path
    if (!imagePath) {
        throw new apiError(400, 'image is required')
    }

    const thumbnail = await uploadeToCloudinary(imagePath)
    if (!thumbnail) {
        throw new apiError(400, 'something went wrong while thumbnail uploading on cloudinary')
    }
    //create event in db
    const event = await Event.create({
        title,
        description,
        category,
        difficulty,
        startDate,
        endDate,
        duration,
        maxParticipants,
        createdBy:req.user.id,
        image: thumbnail?.url
    })
    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                event,
                'event is created successfully'
            )
        )
})

//update event(only admin)
const updateEvent = asyncHandler(async (req, res, next) => {
    //get the event
    const { title, description, category, difficulty, startDate, endDate, duration, maxParticipants ,currentParticipants} = req.body
    const  {id} = req.params
    if (!id) {
        throw new apiError(400, 'provide correct event id')
    }
      if ([title, description, category, difficulty, startDate, endDate, duration, maxParticipants,currentParticipants].some((fields) => fields.trim() === " ")) {
        throw new apiError(400, 'all fields are required')
    }
    //check admin
    if (req.user.role != "admin") {
        throw new apiError(400, 'only admin can update the event')
    }
    //update event
    const event = await Event.findByIdAndUpdate(id, {
        $set: {
            title,
            description,
            category,
            difficulty,
            startDate,
            endDate,
            duration,
            maxParticipants,
            currentParticipants,
            createdBy:req.user.id
        }
    },
        { new: true })
    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                event,
                'event details updated succesfully'
            )
        )
})

//delete event (only admin)
const deleteEvent = asyncHandler(async(req,res,next)=>{ 
    //get the event
    const {id} = req.params
    if(!id){
        throw new apiError(400,'event not found')
    }
    //check admin
    
    if(req.user.role != "admin"){
        throw new apiError(400,'only admin can delete the event')
    }
    //delete event
    const event = await Event.findByIdAndDelete(id)
    if(!event){
        throw new apiError(400,'something went wrong while deleting event')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            'event deleted successfully'
        )
    )
})

//get events by category
const getEventsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query; // optional pagination

  // validate category
  const allowedCategories = ["Technical", "Logical", "Verbal", "Numerical", "General"];
  if (!allowedCategories.includes(category)) {
    throw new apiError(400, "Invalid category");
  }

  // fetch events
  const events = await Event.find({ category, isActive: true })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  if (!events.length) {
    throw new apiError(404, `No events found in ${category} category`);
  }

  // total count for pagination
  const total = await Event.countDocuments({ category, isActive: true });

  return res.status(200).json(
    new apiResponse(200, {
      events,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Events fetched successfully")
  );
});

//get event by difficulty
const getEventsByDifficulty = asyncHandler(async(req,res,next)=>{
    //get the dificulty from params
    const { difficulty } = req.params
     const { page = 1, limit = 10 } = req.query; // optional pagination

    //check is it in our enum
    const allowedEnum = ["easy","medium","hard"]
    if(!allowedEnum.includes(difficulty)){
        throw new apiError(400,'Invalid difficulty')
    }

    //paginate 
    const events = await Event.find({ difficulty, isActive: true })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({createdAt: - 1 })

    if(!events.length){
        throw new apiError(400,`no events found in ${difficulty} difficulty`)
    }

    const total = await Event.countDocuments({ difficulty, isActive: true })
    //send res
   return res.status(200).json(
    new apiResponse(200, {
      events,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Events fetched successfully")
  );
})

//get events by search
const searchEventsByTitle = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 10 } = req.query;

  if (!title || title.trim() === "") {
    throw new apiError(400, "Title query is required");
  }

  // case-insensitive regex search
  const filter = {
    title: { $regex: title, $options: "i" },
    isActive: true,
  };

  const events = await Event.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Event.countDocuments(filter);

  if (!events.length) {
    throw new apiError(404, "No events found with that title");
  }

  return res.status(200).json(
    new apiResponse(200, {
      events,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Events fetched successfully")
  );
});

//get all events
const getAllEvents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // ✅ fetch events
  const events = await Event.find({ isActive: true })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // latest first

  const total = await Event.countDocuments({ isActive: true });

  if (!events.length) {
    throw new apiError(404, "No events found");
  }

  return res.status(200).json(
    new apiResponse(200, {
      events,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Events fetched successfully")
  );
});

export { getEvent, 
        createEvent, 
        updateEvent,
        deleteEvent, 
        getEventsByCategory, 
        getEventsByDifficulty,
        searchEventsByTitle,
        getAllEvents  }