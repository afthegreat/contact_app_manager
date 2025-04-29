const{constants}=require('../constants')

const erroHandler=(err,req,res,next)=>{
    const statsCode=res.statusCode ? res.statusCode : 500;
    switch(statsCode){
        case constants.NOT_FOUND:
    res.json({title: "Not found", message: err.message,
         stackTrace:err.stack})
         break;
         case constants.VALIDATION_ERROR:
    res.json({title:"validation failed", message:err.message,
        stackTrace:err.stack})
        break;
        case constants.FORBIDDEN:
    res.json({title:"forbidden ", message:err.message,
        stackTrace:err.stack})
        break;
        case constants.UNAUTHORIZED:
    res.json({title:"unauthorized access", message:err.message,
        stackTrace:err.stack})
        break;
        case constants.SERVER_ERROR:
    res.json({title:"internal server error", message:err.message,
        stackTrace:err.stack})
        break; 
    default:
        console.log("no error all is good")
        break;       
}}
module.exports=erroHandler;
