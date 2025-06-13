import {Request,Response} from 'express'
import sequelize from '../../database/connection'

import generateRandomInstituteNumber from '../../services/generateRandomNumber'


class instituteController{

  static async createInstitute(req:Request,res:Response){

    const {instituteName,instituteAddress,instituteEmail,institutePhone}=req.body
    const instituteVatNo=req.body.instituteVatNo || null 
    const institutePanNo=req.body.instituteVatNo || null 

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

    res.status(200).json({
      message:'Institute Table is Successfully Created'
    })






  }


  
}

export default instituteController