var express=require('express');
var exec=require('exec');
var router=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');
var User1=require('../models/add');

//var jwt=require('jsonwebtoken');
//var jwt = require('jwt-simple');
//var mongoose=require('mongoose');
//    useMongoClient:true,
   // });


router.get('/register',function(req,res)
{
    res.render('register');
});

router.get('/payment',function(req,res)
{
    res.render('payment');
});

router.get('/otp',function(req,res)
{
    res.render('otp');
});

router.post('/pay',function(req,res)
{
    res.render('pay');
});






router.get('/add_device',function(req,res)
{
    res.render('add_device');
});



router.get('/login',function(req,res)
{
    res.render('login');
});



router.get('/currentdevice', function(req,res){
  User1.find(function(err,docs){
  var deviceChunks = [];
  chunkSize = 3;
  for(var i = 0; i<docs.length; i+=chunkSize)
{
  deviceChunks.push(docs.slice(i,i+chunkSize));
}  
res.render('currentdevice',{
    content: 'CURRENT DEVICE LIST',
    published: true,
    newUser:deviceChunks
    });
    });
});


router.get('/currentdevice', function(req,res){
  res.render('currentdevice',{
    content: 'CURRENT DEVICE LIST',
    published: true,
    result:result

  });
});




//register
router.post('/register',function(req,res)
{
   var name=req.body.name;
   var email=req.body.email;
   var username=req.body.username;
   var password=req.body.password;
   var password2=req.body.password2;
req.checkBody('name','name is req').notEmpty();
req.checkBody('email','email is req').notEmpty();
req.checkBody('email','email is not valid').isEmail();
req.checkBody('username','username req').notEmpty();
req.checkBody('password','pwd is req').notEmpty();
req.checkBody('password2','pwd dosnt match').equals(req.body.password);
var errors=req.validationErrors();
if(errors)
{
res.render('register',{
    errors:errors
});
    
}
else
{
    var newUser=new User({
        name:name,
        email:email,
        username:username,
        password:password
    });
    User.createUser(newUser,function(err,user)
{
    if(err) throw err;
    console.log(user);
});
req.flash('success_msg',"reg n can login");
res.redirect('/users/login'); 
}
});
passport.use(new LocalStrategy(
    function(username, password, done) {
    User.getUserByUsername(username,function(err,user)  {
if(err) throw err;
if(!user)
{
    return done(null,false,{message:'unknown user'});
}
User.comparePassword(password,user.password,function(err,isMatch){
    if(err) throw err;
    if(isMatch){
        return done(null,user);
    }
    else
    {
        return done(null,false,{message:'invalid password'});
    }
});
    });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
          done(err, user);
        });
      });
router.post('/login',
  passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    res.redirect('/');
  });
  router.get('/logout',function(req,res){
      req.logout();
      req.flash('success_msg','you have logged out');
      res.redirect('/users/login');

  });

//add device
router.post('/add_device',function(req,res)
{
  var customername=req.body.customername;
   var customerid=req.body.customerid;
   var DeviceName=req.body.DeviceName;
   var DeviceId=req.body.DeviceId;
   var Dop=req.body.Dop;
   var balance=req.body.balance;
   var emi=req.body.emi;
 
req.checkBody('customername','customername is req').notEmpty();
req.checkBody('customerid','customerid dosnt match').notEmpty();  
req.checkBody('DeviceName','name is req').notEmpty();
req.checkBody('DeviceId','id is req').notEmpty();
req.checkBody('Dop','dop is req').notEmpty();
req.checkBody('balance','balance is req').notEmpty();
req.checkBody('emi','emi is req').notEmpty();

var errors=req.validationErrors();
if(errors)
{
res.render('add_device',{
    errors:errors
});
    
}
else
{
    var newUser=new User1({
        customername:customername,
        customerid:customerid,
        DeviceName:DeviceName,
        DeviceId:DeviceId,
        Dop:Dop,
        balance:balance,
        emi:emi
        
    });
    User1.createUser(newUser,function(err,user1)
{
    if(err) throw err;
    console.log(user1);
});
req.flash('success_msg',"device added");
res.redirect('/users/add_device'); 
}
});


/*passport.use(new LocalStrategy(
    function(DeviceName, DeviceId,Dop, done) {
 User1.getUserByDeviceName(DeviceName,function(err,user1)  {
if(err) throw err;
if(!user1)
{
    return done(null,false,{message:'unknown user'});
}
});
}));*/

var res=['jhon','mary'];
router.get('/currentdevice', function(req,res){
  res.render(currentdevice,{
    content: 'welcome',
    published: true,
    res:res

  });
});
/*router.get('/user1', function(req, res){
  User1.find({}, function(err, docs){
    if(err) res.json(err);
    else    res.render('currentdevice', {users: docs});
  });
});*/


  
module.exports=router;
