import { ADMINS } from "../config/admin.js";

const isAdmin = (req, res, next) => {
  if (!req.user || !ADMINS.includes(req.user?.email)) {
    // console.log("User email:", req.user?.email);

    return res.status(403).json({
      success: false,
      message: "Access denied. Only fixed admins can access this resource."
    });
  }
  next();
};

export default isAdmin;
