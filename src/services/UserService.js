const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const createUserService = async (newUser) => {
   const {email, password} = newUser;
   try {
      let user = await User.findOne({email});
      if (user) {
         return {
            ok: false,
            code: 400,
            result: {
               error: 'Un usuario existe con ese correo'
            }
         };
      }
      user = new User(newUser);

      // Encriptacion de password
      user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      await user.save();

      //Generar JWT
      const token = await generateJWT({
         uid: user.id,
         name: user.name,
         email: user.email
      });

      return {
         ok: true,
         code: 201,
         result: {
            uid: user.id,
            name: user.name,
            token
         }
      };
      
   } catch (error) {

      return {
         ok: false,
         code: 500,
         result: {
            error: 'Por favor contacte al administrador'
         }
      };

   }
}

const loginUserService = async (email, password) => {

   try {
      const user = await User.findOne({email});
      if (!user) {
         return {
            ok: false,
            code: 400,
            result: {
               error: 'Usuario y/o contraseña incorrectos'
            }
         }
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
         return {
            ok: false,
            code: 400,
            result: {
               error: 'Usuario y/o contraseña incorrectos'
            }
         };
      }

      //Generar JWT
      const token = await generateJWT({ 
         uid: user.id,
         name: user.name,
         email: user.email
      });
         
      return {
         ok: true,
         code: 200,
         result: {
            uid: user.id,
            name: user.name,
            token
         }
      };
   } catch (error) {
      return {
         ok: false,
         code: 500,
         result: {
            error: 'Usuario y/o contraseña incorrectos'
         }
      }
   }

}

const revalidateTokenService = async (payload) => {
   
   try {
      const { uid, name, email } = payload;
      //Generar JWT
      const token = await generateJWT({
         uid: uid,
         name: name,
         email: email
      });

      return {
         ok: true,
         code: 200,
         result: {
            token
         }
         
      }
      
   } catch (error) {
      return {
         ok: false,
         code: 500,
         result: {
            error: 'No se pudo revalidar el token, contacte al administrador del sistema.'
         }
      }
   }
}

const getUsersService = async (desde, limite) => {

   try {
      const usuarios = await User
                              .find({state: true})
                              .skip(desde)
                              .limit(limite);
      
      const total = await User.countDocuments({state: true});
      return {
         ok: true,
         code: 200,
         result: {
            total,
            usuarios,
         }
      }
   } catch (error) {
      return {
         ok: false,
         code: 500,
         result: {
            error: 'Consulta no se pudo ejecutar, contacte con el administrador del sistema.'
         }
      }
   }
   
}


module.exports = {
   createUserService,
   loginUserService,
   revalidateTokenService,
   getUsersService
}