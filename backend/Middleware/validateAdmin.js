

const validateAdmin = function(req, res, next) {
  const { name, phone, email } = req.body || {};

  if (!name || !phone || !email) {
    return res.status(400).json({
      message: "Name, phone, and email are required"
    });
  }

  next();
};

module.exports= validateAdmin;
