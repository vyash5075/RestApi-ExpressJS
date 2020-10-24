const express=require('express')
const mongoose=require('mongoose');
const router=express.Router();
const Order=require('../models/order');
const Product=require('../models/product');
const checkAuth=require('./middleware/check-auth');

const  OrdersController =require( '../controllers/orders');
router.get('/',checkAuth,OrdersController.orders_get_all)
    
  
router.post("/", checkAuth,OrdersController.orders_create_orders);

router.get('/:orderId',checkAuth,OrdersController.orders_single_order);

router.delete('/:orderId',checkAuth,OrdersController.order_delete)

router.patch('/:orderId',checkAuth,(req,res)=>{
    res.status(200).json({
        message:'updated order product'
    })
})

module.exports = router