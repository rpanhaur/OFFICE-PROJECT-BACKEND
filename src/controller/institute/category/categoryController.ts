import { Response } from "express";
import { IRequest } from "../../../middleware/types";

import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";


class categoryController {

  static async createCategory(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const { categoryName, categoryDescription } = req.body

    if (!categoryName || !categoryDescription) {
      return res.status(400).json({
        message: "Please provide categoryName and categoryDescription"
      })
    }

    await sequelize.query(`INSERT INTO category_${instituteNumber} (categoryName,categoryDescription) VALUES(?,?)`, {
      type: QueryTypes.INSERT,
      replacements: [categoryName, categoryDescription]
    })

    const [categoryData]: { id: string, createdAt: Date }[] = await sequelize.query(`SELECT id,createdAt FROM category_${instituteNumber} WHERE categoryName=?`, {
      type: QueryTypes.SELECT,
      replacements: [categoryName]
    })
    res.status(200).json({
      message: `Category Added Successfully of Institute_${instituteNumber}`,
      data: {
        categoryName,
        categoryDescription,
        id: categoryData.id,
        createdAt: categoryData.createdAt
      }

    })



  }

  static async getCategory(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const categories = await sequelize.query(`SELECT * FROM category_${instituteNumber} `)
    res.status(200).json({
      message: 'Categories Fetched Successfully',
      data: categories
    })


  }

  static async deleteCategory(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const id = req.params.id

    await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id=?`, {
      type: QueryTypes.DELETE,
      replacements: [id]
    })

    res.status(200).json({
      message: 'Category deleted Successfully'
    })
  }






}

export default categoryController