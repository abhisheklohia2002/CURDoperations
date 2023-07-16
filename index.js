const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const AllRoute = require("./routes/Allroutes")
app.use(cors());



mongoose.connect(`mongodb+srv://king:king@cluster0.addnvdz.mongodb.net/register?retryWrites=true&w=majority`,{
    
    useNewUrlParser: true
}).then((res)=>{

   
    console.log(`DB is Connected`,)
})
.catch((er)=>{
    console.log(`Err========= at DB`,er)
})


app.use(express.json());
app.use("/api",AllRoute)

app.listen(8000,()=>{
    console.log("sever is running  ")
})



