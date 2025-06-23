import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";

import generateRandomInstituteNumber from "../../services/generateRandomNumber";
import { IRequest } from "../../middleware/types";
import User from "../../database/models/user.models";
import { log } from "console";

class instituteController {
  static async createInstitute(req: IRequest,res: Response,next: NextFunction  ) {
    
      const {
        instituteName,
        instituteAddress,
        instituteEmail,
        institutePhone,
      } = req.body;
      const instituteVatNo = req.body.instituteVatNo || null;
      const institutePanNo = req.body.institutePanNo || null;

      if (
        !instituteName ||
        !instituteAddress ||
        !instituteEmail ||
        !institutePhone
      ) {
        res.status(401).json({
          message:
            "Enter your instituteName,instituteAddress,instituteEmail,institutePhone",
        });
        return;
      }

      const instituteNumber = generateRandomInstituteNumber();

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

  )`);
      await sequelize.query(
        `INSERT INTO institute_${instituteNumber}
  (instituteName,instituteAddress,instituteEmail,institutePhone,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,
        {
          replacements: [
            instituteName,
            instituteAddress,
            instituteEmail,
            institutePhone,
            institutePanNo,
            instituteVatNo,
          ],
        }
      );

      if (req.users) {
        // const users=await User.findByPk(req.users.id)
        // users?.currentInstituteNumber=instituteNumber
        // await users?.save()

        //or
        await User.update(
          {
            currentInstituteNumber: instituteNumber,
            role: "institute",
          },
          {
            where: {
              id: req.users.id,
            },
          }
        );
      }

      // const users=await User.findByPk(req.users && req.users.id)  //this is called short circuit

      await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) REFERENCES users(id),      
    instituteNumber INT NOT NULL 

  

  )`);
      if (req.users) {
        await sequelize.query(
          `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
          {
            replacements: [req.users.id, instituteNumber],
          }
        );
      }

      if (req.users) {
        req.users.currentInstituteNumber = instituteNumber;
      }
     

    next();
  }

  static async createTeacher(req: IRequest, res: Response, next: NextFunction) {
    const instituteNumber = req.users?.currentInstituteNumber;

    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      teacherName VARCHAR(255) NOT NULL UNIQUE,
      teacherEmail VARCHAR(255) NOT NULL UNIQUE,
      teacherPhoneNumber VARCHAR(255) NOT NULL,
      teacherSubject VARCHAR(255) NOT NULL,
      teacherExperience VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    )`);

    next();
  }

  static async createStudent(req: IRequest, res: Response, next: NextFunction) {
    const instituteNumber = req.users?.currentInstituteNumber;

    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentName VARCHAR(255) NOT NULL,
    studentAddress VARCHAR(255) NOT NULL,
    studentPhone VARCHAR(255) NOT NULL,
    studentCourse VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL,
    studentBatch VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

  )`);
    next();
  }

  static async createCourse(req: IRequest, res: Response,next:NextFunction) {
    const instituteNumber = req.users?.currentInstituteNumber;

    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    courseName VARCHAR(255) NOT NULL ,
    coursePrice VARCHAR(255) NOT NULL,
    courseDetails VARCHAR(255) NOT NULL,
    courseDuration VARCHAR(255) NOT NULL,
    courseLevel VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

   

    next()
  }


  static async createCategory(req:IRequest,res:Response){

    const instituteNumber=req.users?.currentInstituteNumber

    await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      categoryName VARCHAR(255) NOT NULL,
      categoryDescription TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)

    res.status(200).json({
      message:"Table  is Successfully Created with its all necessary tables Happy Development!!!",
      instituteNumber: instituteNumber
    });

    
  }
}

export default instituteController;
