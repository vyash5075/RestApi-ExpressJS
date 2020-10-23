const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productId:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'Product',
             required:true
            },  //product kisi dusre model ka name hai humne dono ko link krdiya. relation bana diya ref use krke.
    quantity:{
                type:Number,default:1
            }
});
module.exports = mongoose.model('Order', orderSchema);