const express=require('express');
const app  =express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRoutes=require('./api/routes/products');
const ordersroutes=require('./api/routes/orders');
const bodyParser=require('body-parser');
mongoose.connect('mongodb+srv://admin:admin@node-rest-shop.4vu0t.mongodb.net/productshop?retryWrites=true&w=majority',{
    
    useMongoClient: true,
   
});
mongoose.Promise=global.Promise;
//with the help of mogan we can log all the incoming requests
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Headers','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/orders',ordersroutes);
app.use('/products',productRoutes);


app.use((req,res,next)=>{
    const error=new Error('not found');
    error.status(404);
    next(error);

})
app.use((error,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
module.exports=app;