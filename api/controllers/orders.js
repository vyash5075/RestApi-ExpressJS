const Order=require('../models/order');
const Product =require('../models/product')
const mongoose=require('mongoose');
const checkAuth=require('../routes/middleware/check-auth');
exports.orders_get_all=(req,res,next)=>{
    Order.find()
    .select('productId quantity _id')
    .populate('productId','name price _id')//this line is optional  is se respective product id ka bhi sara data show ho jayega orders me
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders:docs.map(doc=>{

               return{
                   _id:doc._id,
                   productId:doc.productId,
                   quantity:doc.quantity,
                   request:{
                       type:'GET',
                       url:'http://localhost:3000/orders/'+doc._id
                   }
               }

            })

        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
}

exports.orders_create_orders=(req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          productId: req.body.productId
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            productId: result.productId,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  exports.orders_single_order=(req,res)=>{
    Order.findById(req.params.orderId)
    .populate('productId','name price _id')
    .select('productId quantity _id')
    .exec()
    .then(order=>{
        if(order){
        res.status(200).json({
            _id:order._id,
            productId:order.productId,
            quantity:order.quantity,
            result:{
                type:'GET',
                url:'http://localhost:3000'
            }
            
        })

        }
        else{
            res.status(404).json({message:'No valid entry found '})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });   
}

exports.order_delete=(req,res)=>{
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(order=>{
        res.status(200).json({
            message:'order deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/orders',
                body:{productId:"ID",quantity:'Number'}
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      }); 
   
}