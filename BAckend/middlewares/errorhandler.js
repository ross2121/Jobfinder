const CustomAPIError = require('../errors/customerror')
// const {StatusCodes}=require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  const status = err.status || 500; 
  if (err instanceof CustomAPIError) {
    return res.status(status).json({ msg: err.message })
  }
   
   
  return res.status(500).send('Something went wrong try again later')
  
   }

  


module.exports = errorHandlerMiddleware
