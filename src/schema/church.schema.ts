import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateChurchSchema = z.object({
  body: z.object({
    nombreIglesia: z
      .string()
      .nonempty('El nombre es un campo requerido'),
    direccionIglesia: z
      .string()
      .nonempty('La dirección es un campo requerido'),
    referenciaDireccion: z
      .string(),
    latitud: z
      .number(),
    longitud: z
      .number(),
    obreroCargo: z
      .string(),
    numeroZona: z
      .string(),
    personaContacto: z
      .string(),
    telefono1: z
      .string(),
    telefono2: z
      .string(),
    nombreRedes: z
      .string(),    
    linkFacebook: z
      .string(),
    linkInstagram: z
      .string(),
    DiasAtencion: z
      .string(),
    horarioAtencion: z
      .string(),
    departamento: z
      .string()
      .nonempty('El departamento es un campo requerido'),
    provincia: z
      .string()
      .nonempty('La provincia es un campo requerido'),
    distrito: z
      .string()
      .nonempty('El distrito es un campo requerido'),
    imagen: z
    .string(),
  }),
});

export type CreateChurch = z.infer<typeof CreateChurchSchema>["body"];
