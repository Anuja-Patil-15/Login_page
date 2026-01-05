const express=require('express');
const db=require('./db');
const cors = require('cors');
const route=require('./routes');
const app=express();
app.use(cors());
app.use(express.json());




app.get("/",(req,res)=>{
    res.send("server is running");

})

app.use('/admin',route);

app.listen(5000,()=>{
    console.log("server running on port 5000");
})