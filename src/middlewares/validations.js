const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateFields = (req = request, res = response, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json ({
         ok: false,
         errors: errors.mapped()
      });
   }
   next();
}

const validateJWT = (req = request, res = response, next) => {
   // x-token headers
   const token = req.header('Authorization');

   if (!token) {
      return res.status(401).json({
         ok: false,
         msg: 'No hay token en la petición'
      });
   }
   try {
      
      const {uid, name, email}= jwt.verify(
         token, 
         process.env.SECRET_JWT_SEED
      );

      req.uid = uid;
      req.name = name;
      req.email = email;

   } catch (error) {
      console.log(error)
      return res.status(401).json({
         ok: false,
         msg: 'Token inválido'
      });
   }

   next();
   
}



module.exports = {
   validateFields,
   validateJWT
}