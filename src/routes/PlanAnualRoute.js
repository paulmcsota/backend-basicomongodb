/*
   Rutas de Plan Anual / plananual
   host + api/plananual
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createPlanAnual } = require('../controllers/PlanAnualController');
const { validateFields } = require('../middlewares/validations');
const router = Router();

router.post(
   '/create', 
   [
      check('anio', 'El nombre es obligatorio').not().isEmpty(),
      validateFields
   ], 
   createPlanAnual
);

// router.post(
//    '/', 
//    [
//       check('email', 'El email es obligatorio o no contiene el formato correcto').isEmail(),
//       check('password', 'El password debe contener minimo 6 caracteres').isLength({min: 6}),
//       validateFields
//    ],
//    loginUser
// );

// router.get(
//    '/renew',
//    validateJWT,
//    revalidateToken
// );

module.exports = router;