const asyncHandler = (func) => async(req,res,next) => {
    try {
        return await func(req, res, next)
    } catch (error) {
       res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
        next(error); // Call next with the error to pass it to the error handling middleware
       }
    }


export default asyncHandler;