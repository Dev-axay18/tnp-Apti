import asyncHandler from '../utils/asyncHandler.utils.js'
import User from '../models/user.models.js'
import Event from '../models/events.models.js'
import Registration from '../models/registartion.models.js'
import apiResponse from '../utils/apiResponse.utils.js'
import apiError from '../utils/apiError.utils.js'

//get registered by using google form
 const createRegistrationFromGoogleForm = asyncHandler(async (req, res) => {
  const { email, eventId } = req.body; // Data sent from Google Form webhook

  if (!email || !eventId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  const event = await Event.findOne({ _id:eventId });

  //  console.log(user);
  //  console.log(event);
   
   
  if (!user || !event) {
    return res.status(404).json({ message: "User or Event not found" });
  }

  // Prevent duplicate registrations
  const exists = await Registration.findOne({ userId: user._id, eventId: event._id });
  if (exists) {
    if (exists.status === "cancelled") {
      // ✅ reactivate cancelled registration
      exists.status = "registered";
      exists.registrationDate = new Date();
      await exists.save();

      return res
        .status(200)
        .json(new apiResponse(200, exists, "Registration re-activated successfully"));
    }

    // ✅ already registered case
    return res
      .status(200)
      .json(new apiResponse(200, exists, "User already registered"));
  }

const registartion = await Registration.create({
    userId: user._id,
    eventId: event._id,
    status: "registered",
    registrationDate: new Date(),
  });
await registartion.save()
 return res
 .status(201)
 .json(
     new apiResponse(200,registartion,'user registered successfully')    
);
});

//get uer registation
const getUserRegistartion = asyncHandler(async(req,res)=>{
    //get the id
    const {userId} = req.params
    if(!userId){
        throw new apiError(400,'user id is required')
    }
    //validate it
    const user = await User.findById(userId)
    if(!user){
        throw new apiError(400,'user id is in correct')
    }
    // console.log(user);
    
    //get the registartion
    const reg = await Registration.find({userId})
    if(!reg){
        throw new apiError(400,'user is not registerd with any event')
    }
    //send res
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            reg,
            'registartion fetchd successfully'
        )
    )
})

//get event participants
const getEventRegistrations = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) {
    throw new apiError(400, "Event ID is required");
  }

  // Validate the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new apiError(404, "Event not found");
  }

  // Get all registrations for this event
  const registrations = await Registration.find({ eventId })
    .populate("userId", "fullName email collegeName department year avatar") // participant info
    .populate("eventId", "title date location"); // event basic info

  if (!registrations || registrations.length === 0) {
    throw new apiError(404, "No participants found for this event");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      registrations,
      "Event participants fetched successfully"
    )
  );
});

//update registration
const updateRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    throw new apiError(400, "Registration ID is required");
  }

  // Validate registration exists
  let registration = await Registration.findById(id);
  if (!registration) {
    throw new apiError(404, "Registration not found");
  }

  // Apply updates
  Object.keys(updates).forEach((key) => {
    registration[key] = updates[key];
  });

  await registration.save();

  return res.status(200).json(
    new apiResponse(
      200,
      registration,
      "Registration updated successfully"
    )
  );
});

//cancel reg
const cancelRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new apiError(400, "Registration ID is required");
  }

  // Find registration
  const registration = await Registration.findById(id);
  if (!registration) {
    throw new apiError(404, "Registration not found");
  }

  // If already cancelled
  if (registration.status === "cancelled") {
    throw new apiError(400, "Registration is already cancelled");
  }

  // Update status instead of deleting
  registration.status = "cancelled";
  await registration.save();

  return res.status(200).json(
    new apiResponse(
      200,
      registration,
      "Registration cancelled successfully"
    )
  );
});

export {
    createRegistrationFromGoogleForm,
    getUserRegistartion,
    getEventRegistrations,
    updateRegistration,
    cancelRegistration
}