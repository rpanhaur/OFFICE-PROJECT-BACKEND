import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import User from '../../../database/models/user.models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



class AuthController {


  // we can directly export the registerUser Models by putting static in front of model
  static async registerUser(req: Request, res: Response) {



    const { userName, password, email } = req.body






    if (!userName || !password || !email) {
      res.status(400).json({
        message: 'Please provide username,password and email'
      })

    }
    else {
      await User.create({
        userName: userName,
        password: bcrypt.hashSync(password, 12),
        email: email

      })

      res.status(201).json({
        message: 'User Register Successfully'
      })
    }

  }


  static async loginUser(req: Request, res: Response) {


    const { email, password } = req.body




    if (!email || !password) {

      res.status(400).json({
        message: 'Enter your Email and password'
      })


    } else {

      const user = await User.findOne({
        where: {
          email: email
        }
      })

      console.log(user, 'check user data');


      if (!user) {

        res.json({
          message: 'Please enter correct Email '
        })
      } else {

        const isPasswordMatch = bcrypt.compareSync(password, user.password)




        if (isPasswordMatch) {
          //TOKEN GENERATION

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_IN!,
            { expiresIn: '1d' })
          res.json({
            token: token,
            message: 'Congratulation your are Successfully login'
          })

        } else {
          res.json({
            message: 'Enter your Valid Credentials'
          })
        }



      }





    }










  }




}






export default AuthController

//WE can create object from class Authcontroller  and hold in any constant variable auth and export that object

// const auth= new AuthController

// export default auth