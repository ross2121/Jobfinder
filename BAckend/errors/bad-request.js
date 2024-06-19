const CustomAPIError=require("./customerror")
const {StatusCodes}=require("http-status-codes")

class badrequest extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statuscode=StatusCodes.BAD_REQUEST
    }
  }
  
  module.exports = badrequest