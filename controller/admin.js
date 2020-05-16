const Product = require('../models/product');
const User = require('../models/user');
//Get product Get and Post for admin
exports.getProductForm = (req, res, next) => {
      res.render('../admin/add-products', {
        name: 'Laodai',
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        user: req.user,
       adminName:req.user.name,
   })
}
exports.getAdminPage=(req,res)=>{
    Product.countDocuments({}, function (err, count) {})
      .then(count=>
            res.render('../admin/index', {
                user: req.user,
                adminName:req.user.name,
                pageTitle:'Admin',
                proNum: count
            })  
     ) 
  }
exports.getPostPage=(req,res)=>{
    res.render('../admin/posts',{
        user: req.user,
        adminName:req.user.name,
        pageTitle:'Admin',
    })
}
exports.postProduct = (req, res, next) => {
    const prod = new Product({
        title: req.body.title,
        imageURL: req.body.imageURL,
        price: req.body.price,
        description: req.body.description
    });
    prod.save()
        .then(result => {
            res.redirect('/admin/products');
        }).catch(err => console.log(err));
}
//edit product get and post
exports.editProductPage = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('../admin/edit-product', { 
                product: product, 
                path: '/', 
                pageTitle: 'Edit Product', 
                user: req.user,
                adminName:req.user.name,});
        }).catch(err => console.log(err));

}
exports.editProductPost = (req, res, next) => {

    Product.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, imageURL: req.body.imageURL, price: req.body.price, description: req.body.description } })
        .then(result => {
            res.redirect('/admin/products/' + req.body.id);
        })
        .catch(err => console.log(err));
}
//delete products
exports.deleteProduct = (req, res, next) => {

    Product.findByIdAndRemove(req.body.id) 
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

}
//get all products
exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('../admin/products', {
                user: req.user,
                adminName:req.user.name,
                 name: 'Laodai', 
                 prods: products ,
                 pageTitle:'Products'
                 
              })        
            })
        .catch(err => console.log(err));
};
//get all users
exports.getAllUsers = (req, res, next) => {
    User.find({role:'basic'})
        .then(users => {
            res.render('../admin/users', {
                user: req.user,
                adminName:req.user.name,
                 name: 'Laodai', 
                 users: users ,
                 pageTitle:'Users'
                 
              })        
            })
        .catch(err => console.log(err));
};
exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('../admin/product-detail', { prod: product, pageTitle: 'Product Detail', path: '/',user:req.user,adminName:req.user.name });
        })
        .catch(err => console.log(err));
}
