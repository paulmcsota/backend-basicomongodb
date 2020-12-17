const { request, response } = require('express');
const PlanAnual = require('../models/PlanAnualModel');

const createPlanAnual = async(req = request, res = response) => {

   try {
      let planAnual = new PlanAnual(req.body);
   
      await planAnual.save();
   
      return res.status(201).json({
         ok: true,
         result: planAnual
      });
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         result: error
      });
   }
}






module.exports = {
   createPlanAnual,
}