import { z } from "zod";

export const CreateMasterSchema = z.object({
  body: z.object({
    Surname1: z.string().nonempty('El apellido paterno es un campo requerido'),
    Surname2: z.string().nonempty('El apellido materno es un campo requerido'),
    Name1: z.string().nonempty('El primer nombre es un campo requerido'),
    Name2: z.string().optional(), // Campo opcional
    Name3: z.string().optional(), // Campo opcional
    DNIType: z.string().nonempty('El tipo de documento es un campo requerido'),
    DNINumber: z.string().nonempty('El número de documento es un campo requerido'),
    BirthDate: z.string().nonempty('La fecha de nacimiento es un campo requerido')
  }),
});

export type CreateMaster = z.infer<typeof CreateMasterSchema>["body"];
