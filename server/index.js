 const express = require('express');
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/auth')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts')
const commentRoute=require('./routes/comments')
const multer=require('multer')
const path=require("path")
const dotenv=require('dotenv')
const port =  5000;



const connectDB=async()=>{
  try{
      await mongoose.connect("mongodb://localhost:27017/blog2")
      console.log("database is connected successfully!")

  }
  catch(err){
      console.log(err)
  }
}

app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: true,
  })
);


  // app.use(cors({origin:"http://localhost:5173",credentials:true}))


  app.use(express.json())
  app.use(cookieParser())

  app.use("/",(req,res)=>{
    res.send("server running")

})


  app.use("/images",express.static(path.join(__dirname,"/images")))
  app.use('/api/auth',authRoute)

  app.use("/api/users",userRoute)

  app.use("/api/posts",postRoute)

  app.use("/api/comments",commentRoute)





  //image upload
  const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})



const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})



app.listen(port,()=>{
  connectDB()
  console.log("app is running on port "+ port)
})