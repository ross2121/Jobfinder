const CustomAPIError=require("./customerror")
const {StatusCodes}=require("http-status-codes")

class unauthonticated extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statuscode=StatusCodes.UNAUTHORIZED
    }
  }
  
  module.exports = unauthonticated