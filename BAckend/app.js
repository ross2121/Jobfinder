require("dotenv").config();
require("express-async-errors");
const express=require("express");
const app=express();
const connectDB=require("./db/connect")
const authincateuser=require("./middlewares/auth")
app.use(express.json());
const authrouter=require("./routes/auth");
const jobsrouter=require("./routes/jobs")
const notFound=require("./middlewares/notfound")
const errorHandlerMiddleware=require("./middlewares/errorhandler")


app.use("/api/v1/auth",authrouter);
app.use("/api/v1/jobs",authincateuser,jobsrouter)
app.use(notFound);
app.use(errorHandlerMiddleware);
const port=process.env.PORT||4000;
const start=async()=>{
    try{
        // await connectDB(process.env.MONGO_URL)
        connectDB();
        app.listen(port,console.log(`server is running at ${port}`))

}catch(error){
    console.log(error);
}}
start();

