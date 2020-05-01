const express=require('express');
const router=express.Router();

//user models
let products = [
    {
      id: 1,
      name: "chair",
      description: "Beauti and high quality chair",
      categorize:"household ",
    },
  ];
router.post('/',(req,res,next)=>{

    var product={id:products.length+2,name:req.body.create_name,description:req.body.create_description,categorize:req.body.create_categorize}
    products.push(product)
    res.send(products)
    
    res.end();
    
})
router.get('/all_products',(req,res)=>{
    res.send(products)
  })
router.get('/',(req,res)=>{
    res.render('create_product')
})



module.exports=router;