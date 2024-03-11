import { Response, Request, NextFunction } from "express";
import District from "../models/district.model";
import { CreateDistrict } from "../schema/district.schema";

export const createDistrict = async (
  req: Request<unknown, unknown, CreateDistrict>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      department,
      province,
      district
    } = req.body;
    const DistrictFound = await District.findOne({
      $and: [
        { department: { $regex: `.*${department}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
        { province: { $regex: `.*${province}.*` , $options: 'i' } },
        { district: { $regex: `.*${district}.*` , $options: 'i' } }  // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
      ]
    });
    // if a food with the same title is found
    if (DistrictFound)
      return res
        .status(400)
        .json({ message: "Distrito ya existe" });

    // create a new food
    const newDistrict = new District({
      department,
      province,
      district
    });

    const savedDistrict = await newDistrict.save();

    res.json(savedDistrict);
  } catch (error) {
    next(error);
  }
};

export const getDistricts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departamento = req.query.department;
    const provincia = req.query.province;

    const districts = await District.find({
      department: { $regex: `.*${departamento}.*`, $options: 'i' },
      province: { $regex: `.*${provincia}.*`, $options: 'i' },
    });

    return res.json(districts);
  } catch (error) {
    next(error);
  }
};


export const getDistricts1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departamento = req.query.department;
    const provincia = req.query.province;

    // Realizamos el JOIN usando agregación
    const districtsWithChurches = await District.aggregate([
      {
        $match: {
          department: { $regex: `.*${departamento}.*`, $options: 'i' },
          province: { $regex: `.*${provincia}.*`, $options: 'i' },
        },
      },
      {
        $lookup: {
          from: 'churches', // Nombre de la colección de iglesias (en minúsculas)
          localField: 'district', // Campo local que coincide con el campo 'district' de la otra colección
          foreignField: 'distrito', // Campo de la otra colección que coincide con el campo local
          as: 'churches', // Nombre del nuevo campo que contendrá el resultado del JOIN (puedes usar el nombre que desees)
        },
      },
      {
        $match: {
          churches: { $exists: true, $not: { $size: 0 } }, // Filtramos solo los distritos con iglesias asociadas
        },
      },
      {
        $project: {
          _id: 1, // Proyectamos el campo '_id' (ID del distrito)
          department: 1, // Proyectamos el campo 'department' (Nombre del departamento)
          province: 1, // Proyectamos el campo 'province' (Nombre de la provincia)
          district: 1, // Proyectamos el campo 'district' (Nombre del distrito)
        },
      },
    ]);

    return res.json(districtsWithChurches);
  } catch (error) {
    next(error);
  }
};

