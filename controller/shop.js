const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            if (req.user==null) 
            res.render('index_shop', {
                 prods: products, 
                 path: '/', 
                 pageTitle: 'Home',
                 user:req.user
                });
            else if (req.user!=null)
            {
            res.render('index_shop', 
            { prods: products, 
                path: '/', 
                pageTitle: 'Home',
                user:req.user,
                //adminName:req.user.name 
            });
            
            }
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render('product-detail', { prod: product, pageTitle: 'Product Detail', path: '/', name: 'Edward' });
        })
        .catch(err => console.log(err));
}