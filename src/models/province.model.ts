import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Province {
  @prop({ type: String, required: [true, 'El nombre del departamento es un campo requerido'] })
  department: string;
  @prop({ type: String, required: [true, 'El nombre del departamento es un campo requerido'] })
  province: string;

}

const ProvincesModel = getModelForClass(Province);
export default ProvincesModel;
