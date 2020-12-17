/*
   Rutas de usuario / User
   host + api/user
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken, getUsers } = require('../controllers/UserController');
const { validateFields, validateJWT } = require('../middlewares/validations');

const router = Router();

router.post('/register', 
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio o no contiene el formato correcto').isEmail(),
      check('password', 'El password debe contener minimo 6 caracteres').isLength({min: 6}),
      validateFields
   ], 
   createUser
);

router.post('/login', 
   [
      check('email', 'El email es obligatorio o no contiene el formato correcto').isEmail(),
      check('password', 'El password debe contener minimo 6 caracteres').isLength({min: 6}),
      validateFields
   ],
   loginUser
);

router.get('/renew',
   validateJWT,
   revalidateToken
);

router.get('/',
   validateJWT,
   getUsers
);

module.exports = router;