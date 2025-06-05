import {Request,Response} from 'express'
import User from '../../../database/models/user.models'
import bcrypt from 'bcrypt'
class AuthController{


  // we can directly export the registerUser Models by putting static in front of model
  static async registerUser(req:Request,res:Response){

  
    
    const {username,password,email}=req.body

    console.log(username);
    
  
    

    if(!username || !password || !email){
      res.status(400).json({
        message:'Please provide username,password and email'
      })
      
    }
    else{
      await User.create({
        username:username,
        password:bcrypt.hashSync(password,12),
        email:email

      })

      res.status(201).json({
        message:'User Register Successfully'
      })
    }

  }

}

export default AuthController

//WE can create object from class Authcontroller  and hold in any constant variable auth and export that object 

// const auth= new AuthController

// export default auth