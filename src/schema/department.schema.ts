import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  body: z.object({
    department: z
      .string()
      .nonempty('El nombre es un campo requerido'),
  }),
});

export type CreateDepartment = z.infer<typeof CreateDepartmentSchema>["body"];
