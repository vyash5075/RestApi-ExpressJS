const express=require('express')
const mongoose=require('mongoose');
const router=express.Router();
const User=require('../models/user');
const  bcrypt= require('bcrypt');

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'user exists'
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
        
                }
                else{
                    const user=new User({
           
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    });
                    user.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'User Created',
                            _id:result._id,
                            email:result.email

                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                      }); 
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    

})
router.post('/login',(req,res,next)=>{
   
  var password = req.body.password
  console.log(password);
    User.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length==0){
           return  res.status(401).json({
                message:'user not exist'
            });
        }
        else {
            bcrypt.compare(password, user.password,(err,result) => {
                if(err){
                    return  res.status(401).json({
                        message:'Auth failed'
                    });  
                }
                if(result){
                    return res.status(200).json({
                        message:'Auth successful'
                    })
                }
                res.status(401).json({
                    message:'Auth failed'
                });
            });
          }  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})


router.delete('/:userId',(req,res)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then(user=>{
        res.status(200).json({
            message:'user deleted',
           
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      }); 
   
})
module.exports=router;