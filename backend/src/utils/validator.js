const validateSignUpData=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if( !firstName ||! lastName){
        throw new Error("Name is not valid !!");
    }
    else if(firstName.length<4||firstName.length>20){
        throw new Error("Name must be 4-20 character");
    }
    else if(!email){
        throw new Error("please provide email id !!");
    }
    else if(!password){
        throw new Error("please provide password !!")
    }
}
module.exports=validateSignUpData;