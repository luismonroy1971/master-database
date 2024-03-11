import { Response, Request, NextFunction } from "express";
import Department from "../models/department.model";
import Churches from "../models/church.model";
import { CreateDepartment } from "../schema/department.schema";

export const createDepartment = async (
  req: Request<unknown, unknown, CreateDepartment>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      department,
    } = req.body;

    const DepartmentFound = await Department.findOne({ department });
    // if a food with the same title is found
    if (DepartmentFound)
      return res
        .status(400)
        .json({ message: "Departamento ya existe" });

    // create a new food
    const newDepartment = new Department({
      department,
    });

    const savedDepartment = await newDepartment.save();

    res.json(savedDepartment);
  } catch (error) {
    next(error);
  }
};


export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await Department.find();
    return res.json(departments);
  } catch (error) {
    next(error);
  }
};


export const getDepartments1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentsWithChurches = await Department.aggregate([
      {
        $lookup: {
          from: 'churches', // Nombre de la colección de iglesias (en minúsculas)
          localField: 'department', // Campo local que coincide con el campo 'department' de la otra colección
          foreignField: 'departamento', // Campo de la otra colección que coincide con el campo local
          as: 'churches', // Nombre del nuevo campo que contendrá el resultado del JOIN (puedes usar el nombre que desees)
        },
      },
      {
        $match: {
          churches: { $exists: true, $not: { $size: 0 } }, // Filtramos solo los departamentos que tienen al menos una iglesia
        },
      },
      {
        $project: {
          _id: 1, // Proyectamos el campo '_id' (ID del departamento)
          department: 1, // Proyectamos el campo 'departamento' (Nombre del departamento)
        },
      },
    ]);

    return res.json(departmentsWithChurches);

  } catch (error) {
    next(error);
  }
};

