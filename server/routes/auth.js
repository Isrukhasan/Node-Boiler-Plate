const express= require('express');
const router =express.Router();

//controller Import
const {signup,accountActivation,signin}=require('../controllers/auth')

//import validator
const {userSignupValidator,userSigninValidator}=require('../validators/auth');
const {runValidation}=require('../validators/index');

router.post('/signup',userSignupValidator,runValidation,signup);
router.post('/account-activation',accountActivation);
router.post('/signin',userSigninValidator,runValidation,signin);

module.exports=router;