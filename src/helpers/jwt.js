const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
   return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.SECRET_JWT_SEED, {
         expiresIn: '5h'
      }, (err, token) => {
         if (err) {
            console.log(err);
            reject('No se pudo generar el web token');
         }

         resolve(token);

      });

   });
}

module.exports = {
   generateJWT
}