const express=require('express')
const router=express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'handling get order request'
    })
})
router.post('/',(req,res)=>{
    const order={
        productId:req.body.productId,
        quantity:req.body.quantity
    }; 
    res.status(200).json({
        message:'handling pos order request',
        order:order
    })
})
router.get('/:orderId',(req,res)=>{
    const id=req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message:"yo discovered the order  special iid",
            id:id
        });
    }
    else{
        res.status(200).json({
            message:'you passes order id'
        })
    }
})
router.patch('/:orderId',(req,res)=>{
    res.status(200).json({
        message:'updated order product'
    })
})
router.delete('/:delete',(req,res)=>{
    res.status(200).json({
        message:'deleted order'
    })
})
module.exports = router