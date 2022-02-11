const mongoose = require('mongoose');
const crypto = require('crypto');
const User=require('../models/user');
const { sendEmailWithNodemailer } = require("../helpers/email");
const jwt = require('jsonwebtoken');

//Activate User


exports.signup=(req,res)=>{
    
    const {name,email,password}=req.body;

    User.findOne({email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
               error:"Email is taken"
            });
        }
        const token=jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:"20m"})
        console.log(token);
    

    const emailData = {
        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
        subject: "ACCOUNT ACTIVATION LINK",
        html: `
                  
                  http://localhost:3000/auth/activate/${token}
                  
              `,
    };
    sendEmailWithNodemailer(req, res, emailData);
});
}
// exports.signup=(req,res)=>{
//     // console.log('REQ BODY ON SIGNUP',req.body);
//     // res.json({
//     //     data:'you hit signup endpoint'
//     // })
//     const{ name,email,password}=req.body

//     User.findOne({email}).exec((err,user)=>{
//         if(user){
//             return res.status(400).json({
//                 error:"Email is already taken"
//             })
//         }
//     })
//     let newUser=new User({name,email,password})
//     newUser.save((err,success)=>{
//         if(err){
//             console.log('SIGNUP ERROR',err)
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         res.json({
//             message:'signup success'
//         })
//     });
// }
exports.accountActivation=(req,res)=>{
    const {token}=req.body;
    if(token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,function(err,decoded){
            if(err){
                console.log('JWT TOKEN ACTIVATION ERROR',err)
                return res.status(401).json({
                    error:'Expired link'
                });
            }
                const {name,email,password}=jwt.decode(token);
                const user=new User({name,email,password});
                user.save((err,user)=>{
                if(err){
                    console.log('saving user error',err)
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    });
                }
                return res.json({
                    message:'Signup Success.Please signin'
                });
            });
        });       
    }
    else{
        return res.json({
            message:'Something went wrong try again'
        });
    }
};
exports.signin=(req,res)=>{
    const {email,password}=req.body;
    //user Exists
    User.findOne({email}).exec((err,user)=>{
        if(err|| !user){
            return res.status(400).json({
                error:'User doesnot exist'
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:'User email/password not matched '
            })
        }
        //generate token
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRECT,
            {expiresIn:'7d'})
            const{_id,name,role}=user
            return res.json({
                token,
                user: {_id,name,role}
            })
    })
}

