const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const { ensureAuthenticated, forwardAuthenticated,authRole } = require('../config/auth');


router.get('/', shopController.getAllProducts);

router.get('/products/:id', shopController.getProductDetail);

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.find()
      .then(products=>{
        var product = products.filter(function(item) {
          return item.id == productId;
        });
        cart.add(product[0], productId);
        req.session.cart = cart;
        console.log(cart);
        
        res.redirect('/');
      })
      .catch(err => console.log(err));
    
    
});

router.get('/cart', function(req, res, next) {
    if (!req.session.cart) {
      return res.render('cart', {
        title: 'NodeJS Shopping Cart',
        products: null,
        user:req.user
      });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
      title: 'NodeJS Shopping Cart',
      products: cart.getItems(),
      totalPrice: cart.totalPrice,
      user:req.user
    });
});
  
router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});
module.exports = router;