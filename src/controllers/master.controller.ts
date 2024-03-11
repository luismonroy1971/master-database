import { Response, Request, NextFunction } from "express";
import Master from "../models/master.model";
import { CreateMaster } from "../schema/master.schema";

export const createMaster = async (
  req: Request<unknown, unknown, CreateMaster>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      Surname1,
      Surname2,
      Name1,
      Name2,
      Name3,
      DNINumber,
      DNIType,
      BirthDate,
    } = req.body;

    const MasterFound = await Master.findOne({ DNINumber });
    // if a food with the same title is found
    if (MasterFound)
      return res
        .status(400)
        .json({ message: "El documento ya existe en la Master DataBase" });

    // create a new food
    const newMaster = new Master({
      Surname1,
      Surname2,
      Name1,
      Name2,
      Name3,
      DNINumber,
      DNIType,
      BirthDate,
    });

    const savedMaster = await newMaster.save();

    res.json(savedMaster);
  } catch (error) {
    next(error);
  }
};

export const getMasters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const masters = await Master.find();
    return res.json(masters);
  } catch (error) {
    next(error);
  }
};

export const getMastersSurname = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const texto = req.query.master;
    const masters = await Master.find({
      $or: [
        { Surname1: { $regex: `.*${texto}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
        { Surname2: { $regex: `.*${texto}.*` , $options: 'i' } }  // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
      ]
    });
    return res.json(masters);
  } catch (error) {
    res.status(500).json({ error: 'No se encontraron registros' });
    next(error);
  }
};

  export const getMastersDoc = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tipo = req.query.DNIType;
      const numero = req.query.DNINumber;
      const masters = await Master.find({
        $and: [
          { DNIType: { $regex: `.*${tipo}.*` , $options: 'i' } },
          { DNINumber: { $regex: `.*${numero}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
            // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
        ]
      });
      return res.json(masters);
    } catch (error) {
      res.status(500).json({ error: 'No se encontraron registros' });
      next(error);
    }
  };

  
export const getMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const masterFound = await Master.findById(req.params.id);
    if (!masterFound) return res.status(204).json();
    return res.json(masterFound);
  } catch (error) {
    next(error);
  }
};

export const deleteMaster = async (req: Request, res: Response) => {
  const masterFound = await Master.findByIdAndDelete(req.params.id);

  if (!masterFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateMaster = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const MasterUpdated = await Master.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!MasterUpdated) return res.status(204).json();
  return res.json(MasterUpdated);
};