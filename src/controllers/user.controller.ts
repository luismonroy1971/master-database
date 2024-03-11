import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res
      .status(400)
      .json({ msg: "Por favor envíe su nombre, correo y clave" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "El correo ya existe" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const updateInitial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const InitialUpdated = await User.findById(req.params.id, req.body, {
    new: true,
  });
  if (!InitialUpdated) return res.status(204).json();
  console.log(InitialUpdated);
  if (InitialUpdated.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
  }
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json(req.body);
};


export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) return res.status(204).json();
    return res.json(userFound);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Por favor envíe su correo y clave correctos" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "El usuario no existe" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const {
      name,
      _id,
      email,
    } = user;
    return res.status(200).json({
      id: _id,
      name: name,
      email: email,
      token: createToken(user),
    });
  }

  return res.status(403).json({
    msg: "El correo y clave son incorrectas",
  });
};
