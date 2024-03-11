import { Response, Request, NextFunction } from "express";
import Church from "../models/church.model";
import { CreateChurch } from "../schema/church.schema";

export const createChurch = async (
  req: Request<unknown, unknown, CreateChurch>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      nombreIglesia,
      direccionIglesia,
      referenciaDireccion,
      latitud,
      longitud,
      obreroCargo,
      numeroZona,
      personaContacto,
      telefono1,
      telefono2,
      nombreRedes,
      linkFacebook,
      linkInstagram,
      DiasAtencion,
      horarioAtencion,
      departamento,
      provincia,
      distrito,
      imagen,
    } = req.body;

    const ChurchFound = await Church.findOne({ nombreIglesia });
    // if a food with the same title is found
    if (ChurchFound)
      return res
        .status(400)
        .json({ message: "El mombre ya existe en otra iglesia" });

    // create a new food
    const newChurch = new Church({
      nombreIglesia,
      direccionIglesia,
      referenciaDireccion,
      latitud,
      longitud,
      obreroCargo,
      numeroZona,
      personaContacto,
      telefono1,
      telefono2,
      nombreRedes,
      linkFacebook,
      linkInstagram,
      DiasAtencion,
      horarioAtencion,
      departamento,
      provincia,
      distrito,
      imagen,
    });

    const savedChurch = await newChurch.save();

    res.json(savedChurch);
  } catch (error) {
    next(error);
  }
};

export const getChurchs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const churchs = await Church.find();
    return res.json(churchs);
  } catch (error) {
    next(error);
  }
};

export const getChurchsPart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const texto = req.query.iglesia;
    const churchs = await Church.find({
      $or: [
        { nombreIglesia: { $regex: `.*${texto}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
        { direccionIglesia: { $regex: `.*${texto}.*` , $options: 'i' } }  // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
      ]
    });
    return res.json(churchs);
  } catch (error) {
    res.status(500).json({ error: 'No se encontraron iglesias' });
    next(error);
  }
};


  export const getChurchsDep = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departamento = req.query.departamento;
      const churchs = await Church.find({
        $and: [
          { departamento: { $regex: `.*${departamento}.*` , $options: 'i' } },
        ]
      });
      return res.json(churchs);
    } catch (error) {
      res.status(500).json({ error: 'No se encontraron iglesias' });
      next(error);
    }
  };

  export const getChurchsProv = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departamento = req.query.departamento;
      const provincia = req.query.provincia;
      const churchs = await Church.find({
        $and: [
          { departamento: { $regex: `.*${departamento}.*` , $options: 'i' } },
          { provincia: { $regex: `.*${provincia}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
            // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
        ]
      });
      return res.json(churchs);
    } catch (error) {
      res.status(500).json({ error: 'No se encontraron iglesias' });
      next(error);
    }
  };

  export const getChurchsDist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departamento = req.query.departamento;
      const provincia = req.query.provincia;
      const distrito = req.query.distrito;
      let query: any = { departamento: { $regex: `.*${departamento}.*`, $options: 'i' } };
      if (provincia) {
        query.provincia = { $regex: `.*${provincia}.*`, $options: 'i' };
      }
      if (distrito) {
        query.distrito = { $regex: `.*${distrito}.*`, $options: 'i' };
      }
      const churchs = await Church.find(query);
      // const churchs = await Church.find({
      //   $and: [
      //     { departamento: { $regex: `.*${departamento}.*` , $options: 'i' } },
      //     { provincia: { $regex: `.*${provincia}.*` , $options: 'i' } }, // Busca el texto en campo1 (insensible a mayúsculas/minúsculas)
      //     { distrito: { $regex: `.*${distrito}.*` , $options: 'i' } }
      //       // Busca el texto en campo2 (insensible a mayúsculas/minúsculas)
      //   ]
      // });
      return res.json(churchs);
    } catch (error) {
      res.status(500).json({ error: 'No se encontraron iglesias' });
      next(error);
    }
  };

export const getChurch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const churchFound = await Church.findById(req.params.id);
    if (!churchFound) return res.status(204).json();
    return res.json(churchFound);
  } catch (error) {
    next(error);
  }
};

export const deleteChurch = async (req: Request, res: Response) => {
  const churchFound = await Church.findByIdAndDelete(req.params.id);

  if (!churchFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateChurch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ChurchUpdated = await Church.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!ChurchUpdated) return res.status(204).json();
  return res.json(ChurchUpdated);
};