const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');
const validateAdmin=require("../Middleware/validateAdmin");
const validateLogin=require('../Middleware/validateLogin');

router.post('/create',validateAdmin, adminController.createAdmin);
router.post('/login',validateLogin, adminController.loginAdmin);



module.exports = router;

