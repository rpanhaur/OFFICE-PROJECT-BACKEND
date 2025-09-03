import { NextFunction, Response } from "express";
import sequelize from "../../database/connection";


import { IRequest } from "../../middleware/types";
import User from "../../database/models/user.models";

import { QueryTypes } from "sequelize";


class employeeController {

  static async createEmployee(req: IRequest, res: Response) {




    const {
      employeeName,
      employeePhone,
      employeeDesignation,
      employeeAddress,
      employeeJoiningDate,
      employeeEmail
    } = req.body;


    console.log(req.body, 'check check ');


    if (
      !employeeName ||
      !employeePhone ||
      !employeeDesignation ||
      !employeeAddress ||
      !employeeJoiningDate ||
      !employeeEmail
    ) {
      res.status(401).json({
        message:
          "Enter your Employee Detials",
      });
      return;
    }



    await sequelize.query(`CREATE TABLE IF NOT EXISTS employee (

    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    employeeName VARCHAR(255) NOT NULL,
    employeePhone VARCHAR(255) NOT NULL,
    employeeDesignation VARCHAR(255) NOT NULL,
    employeeAddress VARCHAR(255) NOT NULL,
    employeeJoiningDate VARCHAR(255),
    employeeEmail VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

  )`);
    await sequelize.query(
      `INSERT INTO employee
  (employeeName,
      employeePhone,
      employeeDesignation,
      employeeAddress,
      employeeJoiningDate,
      employeeEmail) VALUES(?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          employeeName,
          employeePhone,
          employeeDesignation,
          employeeAddress,
          employeeJoiningDate,
          employeeEmail
        ],
      }
    );

    if (req.users) {
      // const users=await User.findByPk(req.users.id)
      // users?.currentInstituteNumber=instituteNumber
      // await users?.save()

      //or
      await User.update(
        { role: employeeDesignation },
        { where: { id: req.users.id } }
      );

      res.status(200).json({
        message: 'Employee Created successfully '
      })
    }

    // const users=await User.findByPk(req.users && req.users.id)  //this is called short circuit

    //   await sequelize.query(`CREATE TABLE IF NOT EXISTS employee_Data(
    //   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //   employeeId VARCHAR(255) REFERENCES users(id),      




    // )`);
    //   if (req.users) {
    //     await sequelize.query(
    //       `INSERT INTO employee_Data(employeeId) VALUES(?)`,
    //       {
    //         type: QueryTypes.INSERT,
    //         replacements: [req.users.id],
    //       }
    //     );
    //   }





  }









}

export default employeeController
