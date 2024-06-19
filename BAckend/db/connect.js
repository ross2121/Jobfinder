// const mongose=require('mongoose')
// const url=process.env.MONGO_URL;
// const connectDB = (url) => {
//     return mongose.connect(url, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     })
//   }
//   module.exports=connectDB;
const mongoose=require("mongoose");

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            //must add in order to not get any error masseges:
            // useUnifiedTopology:true,
            // useNewUrlParser: true,
            // useCreateIndex: true
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }
    catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

module.exports=connectDB;