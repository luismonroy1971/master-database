import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string(),
    correo: z.string(),
    password: z.string(),
  }),
});

export type CreateUser = z.infer<typeof CreateUserSchema>["body"];
