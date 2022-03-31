export default (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.user) {
    return res.redirect("/auth/login");
  } else {
    next();
  }
};
