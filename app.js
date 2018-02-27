var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
const config = require('./config/database');
var mongoose=require('mongoose');


mongoose.connection.on('connected', () => {
    console.log('Connected to Database '+config.database);
  });
  // On Error
  mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });

var jwt=require('jsonwebtoken');


var db=mongoose.connection;


var routes=require('./routes/index');
var users=require('./routes/users');
var pay=require('./routes/pay');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.')
        ,root=namespace.shift()
        ,formParam=root;
        while(namespace.length)
        {
            formParam+='['+namespace.shift()+']';

        }
        return{
            param:formParam,
            msg:msg,
            value:value
        };

    }
}));



app.use(flash());

app.use(function(req,res,next)
{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    res.locals.add=req.add||null;
    next();
});
app.use('/',routes);
app.use('/users',users);

app.set('port',(process.env.PORT||3000));
app.listen(app.get('port'),function(){
    console.log('server started on port '+app.get('port'));
});
