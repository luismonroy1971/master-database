import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateDistrictSchema = z.object({
  body: z.object({
    department: z
      .string()
      .nonempty('El nombre del departamento es un campo requerido'),
    province: z
      .string()
      .nonempty('El nombre de la provincia es un campo requerido'),
    district: z
      .string()
      .nonempty('El nombre del distrito es un campo requerido'),
  }),
});

export type CreateDistrict = z.infer<typeof CreateDistrictSchema>["body"];
