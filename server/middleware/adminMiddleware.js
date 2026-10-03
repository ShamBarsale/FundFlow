// Allows only admin users. Always use it after the protect middleware.
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied, admin only" });
  }
};

module.exports = { adminOnly };