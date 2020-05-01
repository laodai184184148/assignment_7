const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const db = require('./config/keys').MongoURL;
const flash= require('connect-flash');
const session=require('express-session')
const passport = require('passport');


require('./config/passport')(passport);
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT=process.env.PORT||3003;

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');
//bodyparser
app.use(express.urlencoded({extended:true}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(__dirname + '/public'));
//connect flash
app.use(flash())

//globals vars
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  next();
})
//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/products',require('./routes/product'));
app.use('/sponsor',require('./routes/sponsor'));


app.use(express.static('./views/public'))

app.listen(PORT,()=> console.log('Server started on port '+PORT));
