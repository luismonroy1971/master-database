import { Response, Request, NextFunction } from "express";
import Province from "../models/province.model";
import Church from "../models/church.model";
import { CreateProvince } from "../schema/province.schema";

export const createProvince = async (
  req: Request<unknown, unknown, CreateProvince>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      department,
      province,
    } = req.body;
    const ProvinceFound = await Province.findOne({
      $and: [
        { department: { $regex: `.*${department}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
        { province: { $regex: `.*${province}.*` , $options: 'i' } }  // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
      ]
    });
    // if a food with the same title is found
    if (ProvinceFound)
      return res
        .status(400)
        .json({ message: "Provincia ya existe" });

    // create a new food
    const newProvince = new Province({
      department,
      province
    });

    const savedProvince = await newProvince.save();

    res.json(savedProvince);
  } catch (error) {
    next(error);
  }
};

export const getProvinces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departamento = req.query.department;
    const provinces = await Province.find({
      department: { $regex: `.*${departamento}.*`, $options: 'i' },
    });

    return res.json(provinces);
  } catch (error) {
    next(error);
  }
};

export const getProvinces1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departamento = req.query.department;
    const provincesWithChurches = await Province.aggregate([
      {
        $match: {
          department: { $regex: `.*${departamento}.*`, $options: 'i' },
        },
      },
      {
        $lookup: {
          from: 'churches', // Nombre de la colección de iglesias (en minúsculas)
          localField: 'province', // Campo local que coincide con el campo 'province' de la otra colección
          foreignField: 'provincia', // Campo de la otra colección que coincide con el campo local
          as: 'churches', // Nombre del nuevo campo que contendrá el resultado del JOIN (puedes usar el nombre que desees)
        },
      },
      {
        $match: {
          churches: { $exists: true, $not: { $size: 0 } }, // Filtramos solo las provincias con iglesias asociadas
        },
      },
      {
        $project: {
          _id: 1, // Proyectamos el campo '_id' (ID de la provincia)
          department: 1, // Proyectamos el campo 'department' (Nombre del departamento)
          province: 1, // Proyectamos el campo 'province' (Nombre de la provincia)
        },
      },
    ]);

    return res.json(provincesWithChurches);

  } catch (error) {
    next(error);
  }
};

