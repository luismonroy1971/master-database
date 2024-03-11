import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Church {
  @prop({ type: String, required: [true, 'El nombre es un campo requerido'] })
  nombreIglesia: string;

  @prop({ type: String, required: [true, 'La dirección es un campo requerido'] })
  direccionIglesia: string;

  @prop({ type: String })
  referenciaDireccion: string;

  @prop({ type: Number, required: [true, 'La latitud es un campo requerido'] })
  latitud: number;

  @prop({ type: Number, required: [true, 'La longitud es un campo requerido'] })
  longitud: number;

  @prop({ type: String})
  obreroCargo: string;

  @prop({ type: String})
  numeroZona: string;

  @prop({ type: String })
  personaContacto: string;

  @prop({ type: String })
  telefono1: string;

  @prop({ type: String })
  telefono2: string;

  @prop({ type: String })
  nombreRedes: string;

  @prop({ type: String })
  linkFacebook: string;

  @prop({ type: String })
  linkInstagram: string;

  @prop({ type: String })
  DiasAtencion: string;

  @prop({ type: String })
  horarioAtencion: string;

  @prop({ type: String, required: [true, 'El departamento es un campo requerido'] })
  departamento: string;

  @prop({ type: String, required: [true, 'La provincia es un campo requerido'] })
  provincia: string;

  @prop({ type: String, required: [true, 'El distrito es un campo requerido'] })
  distrito: string;

  @prop({ type: String })
  imagen: string;
  
}

const ChurchsModel = getModelForClass(Church);
export default ChurchsModel;
