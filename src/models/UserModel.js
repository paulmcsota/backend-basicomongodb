const { Schema, model } = require('mongoose');

const validRoles = {
   values: ['ADMIN_ROLE', 'USER_ROLE', 'RRHH_ROLE'],
   message: '{VALUE} no es un rol válido.'
}

const validTypes = {
   values: ['FACEBOOK', 'GOOGLE', 'NORMAL'],
   message: '{VALUE} no es un tipo de sesión válido.'
}

const UserSchema = Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   img: {
      type: String,
      required: false,
   },
   role: {
      type: String,
      default: 'USER_ROLE',
      enum: validRoles
   },
   typeSession: {
      type: String,
      default: 'NORMAL',
      enum: validTypes
   },
   state: {
      type: Boolean,
      default: true,
   },
});

UserSchema.methods.toJSON = function() {
   const user = this;
   let userObject = user.toObject();
   delete userObject.password;

   return userObject
}


module.exports = model('User', UserSchema);