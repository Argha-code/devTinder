 const adminAuth = (req,res,next)=>{
    // Logic of checking if the request authorized
    console.log("Admin Auth getiing checked");  
   const Token = "xy"                       
    const isAdminAuthorized = Token == "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unathoreized")   // send me status code with a sms
    } 
    else {
        next()
    }
} 

module.exports = {
    adminAuth
}