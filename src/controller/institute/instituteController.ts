import {NextFunction, Request,Response} from 'express'
import sequelize from '../../database/connection'

import generateRandomInstituteNumber from '../../services/generateRandomNumber'
import { IRequest } from '../../middleware/types'
import User from '../../database/models/user.models'


class instituteController{

  static async createInstitute(req:IRequest,res:Response,next:NextFunction){

    const {instituteName,instituteAddress,instituteEmail,institutePhone}=req.body
    const instituteVatNo=req.body.instituteVatNo || null 
    const institutePanNo=req.body.institutePanNo || null 

    if(!instituteName || !instituteAddress || !instituteEmail || !institutePhone){
      res.status(401).json({
        message:'Enter your instituteName,instituteAddress,instituteEmail,institutePhone'
      })
      return
    }

  

     

    const instituteNumber =generateRandomInstituteNumber()

    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (

      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL,
      institutePhone VARCHAR(255) NOT NULL,
      instituteVatNo VARCHAR(255),
      institutePanNo VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    )`)
    await sequelize.query(`INSERT INTO institute_${instituteNumber}
    (instituteName,instituteAddress,instituteEmail,institutePhone,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,
    {replacements:[instituteName,instituteAddress,instituteEmail,institutePhone,institutePanNo,instituteVatNo]})

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId VARCHAR(255) REFERENCES users(id),      
      instituteNumber VARCHAR(255) UNIQUE

    

    )`)

    if(req.users){

      await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
        replacements:[req.users.id,instituteNumber]
      })
    }


    // const users=await User.findByPk(req.users && req.users.id)  //this is called short circuit 

    
    if(req.users){  

      // const users=await User.findByPk(req.users.id)
      // users?.currentInstituteNumber=instituteNumber
      // await users?.save()

      //or 
      await User.update({
        currentInstituteNumber:instituteNumber,
        role:'institute'
       
      },{
        where:{
          id:req.users.id
        }
      })



    }
    req.instituteNumber=instituteNumber
    next()






  }

  static async createTeacher(req:IRequest,res:Response){
    const instituteNumber=req.instituteNumber

    // const {teacherName,teacherEmail,teacherPhoneNumber}=req.body
    // if(!teacherName || !teacherEmail ||!teacherPhoneNumber){
    //   res.status(402).json({
    //     message:'Send teacherName,teacherEmail,teacherPhoneNumber plz '
    //   })
    //   return
    // }

    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      teacherName VARCHAR(255) NOT NULL,
      teacherEmail VARCHAR(255) NOT NULL,
      teacherPhoneNumber VARCHAR(255) NOT NULL

    )`)

    // await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherPhoneNumber) VALUES(?,?,?) `,{
    //   replacements:[teacherName,teacherEmail,teacherPhoneNumber]
    // })



   
    res.status(200).json({
      message:'Teacher table is created'
    })

  }




  
}

export default instituteController