import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateProvinceSchema = z.object({
  body: z.object({
    department: z
      .string()
      .nonempty('El nombre del departamento es un campo requerido'),
    province: z
      .string()
      .nonempty('El nombre de la provincia es un campo requerido'),
  }),
});

export type CreateProvince = z.infer<typeof CreateProvinceSchema>["body"];
