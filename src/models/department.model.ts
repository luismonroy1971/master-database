import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Department {
  @prop({ type: String, required: [true, 'El nombre del departamento es un campo requerido'] })
  department: string;

}

const DepartmentsModel = getModelForClass(Department);
export default DepartmentsModel;
