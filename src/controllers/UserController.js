const { request, response } = require('express');
const { createUserService, loginUserService, revalidateTokenService, getUsersService } = require('../services/UserService');



const createUser = async(req = request, res = response) => {
   
   const userDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      typeSession: req.body.typeSession,
      role: req.body.role,
   };
   const { ok, code, result } = await createUserService(userDTO);
   
   return res.status(code).json({
      ok,
      result
   });
}

const loginUser =  async(req = request, res = response) => {
   const email = req.body.email;
   const password = req.body.password;

   const { ok, code, result } = await loginUserService(email, password);

   return res.status(code).json({
      ok,
      result
   });
}

const revalidateToken = async(req = request, res = response) => {

   const payload = { 
      uid: req.uid, 
      name: req.name, 
      email: req.email 
   };

   const { ok, code, result } = await revalidateTokenService(payload);

   return res.status(code).json({
      ok,
      result
   });
}

const getUsers = async (req = request, res = response) => {

   const desde = Number(req.query.desde || 0);
   const limite = Number(req.query.limite || 5);

   const { ok, code, result } = await getUsersService(desde, limite);

   return res.status(code).json({
      ok,
      result
   });
}



module.exports = {
   createUser,
   loginUser,
   revalidateToken,
   getUsers
}