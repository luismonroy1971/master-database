import { getModelForClass, modelOptions, prop, pre } from "@typegoose/typegoose";
import { z } from "zod";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Master {
  @prop({ type: String, required: [true, 'El apellido paterno es un campo requerido'] })
  Surname1: string;

  @prop({ type: String, required: [true, 'El apellido materno es un campo requerido'] })
  Surname2: string;

  @prop({ type: String, required: [true, 'El primer nombre es un campo requerido'] })
  Name1: string;

  @prop({ type: String, required: [true, 'El Tipo de documento es un campo requerido'] })
  DNIType: string;

  @prop({ type: String, required: [true, 'El Número de documento es un campo requerido'] })
  DNINumber: string;

  @prop({ type: Date, required: [true, 'La fecha de nacimiento es un campo requerido'] })
  BirthDate: Date;

  @prop({ type: String })
  Name2?: string;

  @prop({ type: String })
  Name3?: string;

}

const MastersModel = getModelForClass(Master);

export default MastersModel;
