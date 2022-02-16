const express=require('express');
const router=express.Router();

// read method
const {read}=require ('../controllers/user');

router.get('/user/:id',read);

module.exports=router;