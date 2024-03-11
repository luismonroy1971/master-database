import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class District {
  @prop({ type: String, required: [true, 'El nombre del departamento es un campo requerido'] })
  department: string;
  @prop({ type: String, required: [true, 'El nombre de la provincia es un campo requerido'] })
  province: string;
  @prop({ type: String, required: [true, 'El nombre del distrito es un campo requerido'] })
  district: string;
}

const DistrictsModel = getModelForClass(District);
export default DistrictsModel;
