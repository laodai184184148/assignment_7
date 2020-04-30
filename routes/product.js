const express=require('express');
const router=express.Router();

//user models

router.get('/',(req,res)=>{
    res.json({
        message: 'Products were fetched'
    });
})

module.exports=router;