const express=require('express');
const router=express.Router();

//user models

router.get('/',(req,res)=>{
    res.json({
        message: 'Sponsors were fetched'
    });
})
router.get('/:sponsor_id',(req,res)=>{
    res.json({
        message: 'You have request for an sponsor ',
        Sponsor_id:req.params.id,       
    });
})
module.exports=router;