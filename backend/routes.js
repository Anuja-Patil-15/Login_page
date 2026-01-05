const express=require('express');
const app=express();

const router=express.Router();
const admin= require("./adminController");

router.post("/create",admin.createAdmin);
router.post("/login",admin.createAdmin);
router.post("/agent",admin.createAgent);
router.post("/desk",admin.createDesk);

module.exports= router;