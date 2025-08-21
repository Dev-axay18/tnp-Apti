import asyncHandler from "../utils/asyncHandler.utils.js";
import apiError from "../utils/apiError.utils.js";
import User from "../models/user.models.js";
import uploadeToCloudinary from "../utils/cloudinary.utils.js";
import { OAuth2Client } from "google-auth-library";
import { ADMINS } from "../config/admin.js";
import apiResponse from "../utils/apiResponse.utils.js";
import jwt from 'jsonwebtoken'

//generate JWT  token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validationBeforeSave:false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500,'internal server error')
    }
}

// register user
const registerUser = asyncHandler(async (req, res, next) => {

    //get all the data from the request body
    const { fullName, email, password, role, collegeName, department, year } = req.body;

    //check fields are empty
    if (!fullName || !email || !password || !collegeName || !department || !year) {
        return next(new apiError("Please fill all the fields", 400));
    }

    //check user allready exist
    const existedUser = await User.findOne({
        $or: [{ email: email }, { fullName: fullName.toLowerCase() }]
    })
    if (existedUser) {
        return next(new apiError("User already exists", 400));
    }

    //upload file on cloudi
    const filepath = req.files?.avatar?.[0]?.path;

    if (!filepath) {
        throw new apiError(404, "avatar is required")
    }
    const avatar = await uploadeToCloudinary(filepath)
    if (!avatar) {
        throw new apiError(500, "something went wrong while uploading avatar on cloudinary")
    }
    //check admin 
    const fixedRole = ADMINS.includes(email.toLowerCase()) ? "admin" : "user";
    //create user
    const user = await User.create({
        fullName: fullName.toLowerCase(),
        email: email.toLowerCase(),
        password,
        role: fixedRole,
        avatar: avatar?.url || ' ',
        collegeName,
        department,
        year
    })
    //send response
    res.status(201).json({
        user,
        success: true,
        message: "User registered successfully"
    })
})

//login user
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new apiError(400, 'All fields are required');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new apiError(401, "Invalid email or password");
    }

    
    // Check password
    const isCorrectPass = await user.isPasswordCorrect(password);
    if (!isCorrectPass) {
        throw new apiError(401, "Invalid email or password");
    }
    
    // Generate tokens
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password");
      user.refreshToken = refreshToken;
     await user.save({ validateBeforeSave: false });

    // Set cookies
    const cookieOptions = {
        httpOnly: true,
        secure: true,           // Ensure HTTPS is used
        sameSite: 'None',       // Needed for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };


    // Send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
            user: loggedInUser,
            message: "User logged in successfully"
        });
});


//logout user
const logoutUser = asyncHandler(async (req, res, next) => {

    //expire his token
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: { accessToken: undefined }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    //send res
    return res
        .status(200)
        .cookie("accessToken", options)
        .json(
            new apiResponse(
                200,
                {},
                'user loggedout successfully'
            )
        )
})

//refresh token
const regeneratedTokens = asyncHandler(async (req, res, next) => {
  // Get refresh token from cookie or body
  const incomingToken = req.cookies?.refreshToken || req.body.refreshToken  



  if (!incomingToken) {
    throw new apiError(401, 'Provide refresh token');
  }

  try {
    // Verify the refresh token
    const decodedToken = jwt.verify(incomingToken, process.env.JWT_REFRESH_SECRET);

    // Find user by id from token
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new apiError(401, 'User not found with this token');
    }
    // console.log(incomingToken);
    // console.log(user.refreshToken);
    
    
    // Check if token matches user's stored refresh token
    if (incomingToken !== user.refreshToken) {
      throw new apiError(401, 'Unauthorized token');
    }

    // Generate new tokens
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict', // recommended for security
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (adjust as needed)
    };

    // Set new tokens as cookies and send response
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Tokens regenerated successfully'
        )
      );
  } catch (error) {
    // Forward original error message for better debugging
    return next(new apiError(401, error.message || 'Invalid refresh token'));
  }
});



//get profile
const getProfile = asyncHandler(async (req, res, next) => {
    //get email from body
    const { userId } = req.body
    if (!userId) {
        throw new apiError(400, 'id is required')
    }
    //find profile 
    const user = await User.findById(userId)
    if (!user) {
        throw new apiError(40, 'user not found')
    }
    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                user,
                'profile fetched successfully'
            )
        )
})

//update profile
const updateProfile = asyncHandler(async (req, res, next) => {
    //get the data from body
    const {fullName,
            email,
            password,
            collegeName,
            department,
            year } = req.body
    if ([fullName, email].some((fields) => fields?.trim() === " ")) {
        throw new apiError(400, 'all fields are required')
    }
    //findbyid and update user
    const user = await User.findByIdAndUpdate(
        req.query.id, {
        $set: {
            fullName,
            email,
            collegeName,
            department,
            year
        }
    },
        { new: true })
        user.password = password;
        await user.save()
    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                user,
                'user details updaed successfully'
            )
        )
})

//update password
const updatePassword = asyncHandler(async (req, res, next) => {
    //get the old pass and new pass from body 
    const { oldPassword, newPassword } = req.body
    const userId = req.query._id 
    const user = await User.findById(userId)
    // console.log(user);
    
    if (!user) {
        throw new apiError(404, 'user not found')
    }
    if (!oldPassword || !newPassword) {
        throw new apiError(404, 'all field are required')
    }
    //check the old is correct
    const iscorrectPass = await user.isPasswordCorrect(oldPassword)
    if (!iscorrectPass) { throw new apiError(400, 'please provide correct password') }

    user.password = newPassword
     await user.save();

    //send res
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                {},
                'password updated successfully'
            )
        )
})

//google auth
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Google OAuth
// @route   POST /api/auth/google
// @access  Public
const googleAuth = asyncHandler(async (req, res, next) => {
    const { token } = req.body; // frontend sends Google ID token

    if (!token) {
        return next(new apiError("Google token is required", 400));
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
        return next(new apiError("Invalid Google token", 401));
    }

    const { sub: googleId, email, name, picture } = payload;

    // Find existing user or create new one
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            fullName: name.toLowerCase(),
            email: email.toLowerCase(),
            password: "", // no password for Google accounts
            avatar: picture,
            role: "user",
            googleId, // optional field in your schema
        });
    }

    // Generate JWT 
    const accessToken = user.generateAccessToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
        success: true,
        message: "Google login successful",
        user,
        accessToken,
    });
});


export { registerUser, loginUser, logoutUser, regeneratedTokens, getProfile, updateProfile, updatePassword, googleAuth };