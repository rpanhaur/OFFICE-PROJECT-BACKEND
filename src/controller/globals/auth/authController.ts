import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import User from '../../../database/models/user.models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



class AuthController {


  // we can directly export the registerUser Models by putting static in front of model
  static async registerUser(req: Request, res: Response) {



    const { userName, password, email, role } = req.body






    if (!userName || !password || !email || !role) {
      res.status(400).json({
        message: 'Please provide username,password,email,role '
      })

    }
    else {
      const data = await User.create({
        userName: userName,
        password: bcrypt.hashSync(password, 12),
        email: email,
        role: role

      })

      res.status(201).json({
        message: 'User Register Successfully',
        data: data

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


  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ["id", "userName", "email", "role", "createdAt"]
      });




      res.status(200).json({
        message: "Users fetched successfully",
        data: users
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();

      res.status(200).json({
        message: "User deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error
      });
    }
  }






}






export default AuthController

