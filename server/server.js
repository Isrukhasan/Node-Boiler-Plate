const express=require('express');
const morgan=require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config()
const app=express();

//import route
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())


if((process.env.NODE_ENV='development')){
    app.use(cors({origin:'http://localhost:3000'}))
}

//middlewares
app.use('/api',authRoutes);
app.use('/api',userRoutes) ;

//DB
mongoose.connect(process.env.DATABASE,{
    
})
.then(()=>console.log("DB connected"))
.catch(err=>console.log("DB Error: ",err));

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`API is running on ${port}`)

})