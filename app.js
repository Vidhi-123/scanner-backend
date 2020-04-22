var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
const bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipment=require('./routes/equipment_router');
var qrcode=require('./routes/qrcode_router');
var lib_tmp=require('./routes/lib_tmp_router');
var lib=require('./routes/lib_main_router');
var lib_tmp_out=require('./routes/lib_tmp_out_router');
var time1=require('./timer');
var crypto = require('crypto');

var app = express();







app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', "index");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// setting global variable available to all ejs 
app.locals.crypto = crypto;


app.get('/',(req,res,next)=>{
  
  time1.f2();
  res.render('index');
})




app.get('/addequipment',(req,res,next)=>{
  
  res.render('add_equipment');
})

app.get('/lib_tmp_add',(req,res,next)=>{
  res.render('add_lib_tmp');
})
app.get('/qr_code',(req,res,next)=>{
  res.render('qr_code');
})
app.get('/libcount',(req,res,next)=>{
  res.render('student_lib_count');
})



app.use(cors());
app.use('/users', usersRouter);
app.use('/lib',lib);
app.use('/lib_tmp',lib_tmp);
app.use('/equipment',equipment);
app.use('/qrcode',qrcode);
app.use('/lib_tmp_out',lib_tmp_out);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
