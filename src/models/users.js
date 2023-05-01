const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true ,unique: true, trim: true},
    nombre: { type: String, required: true },
    contra: { type: String, required: true },
    numCelular:{type:Number,required:true},
    direccion:{type:String,required:true},
    roles: {type:String,required:true},
    date:{type: Date,default:Date.now},
    isActive: { type: Boolean, default: true },
    
  },

  {
    timestamps: true,
    versionKey: false,
  }
 
);
//Usaremos bcrypjs
UserSchema.methods.encryptPassword = async ( contra) => {
  console.log("entro aqui encryp")
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash( contra, salt);
};

UserSchema.statics.encryptPassword2 = async (contra) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contra, salt);
};

//para cifrarlo en la base de datos que permitira comprar la contraseña hasheada con la ingresada , no flecha para poder usar .this
UserSchema.methods.matchPassword = async function ( contra) {
  //console.log("entro aqui match")
  //console.log("comparo este:"+Password_Usuario+" con "+this.Password_Usuario)
  return await bcrypt.compare( contra, this. contra);
};
//al crear un schema estamos creando un tipo de clase
module.exports=mongoose.model('User',UserSchema)


