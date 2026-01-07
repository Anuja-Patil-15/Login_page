const validateLogin = function(req,res,next) {
    const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ 
        message: "Missing credentials" });
    next();
  }}

  module.exports=validateLogin;