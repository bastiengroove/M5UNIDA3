var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var pool = require('./models/bd');

// // select
// pool.query('SELECT * FROM empleados')
//   .then(function (resultados) {
//     console.log(resultados);
//   })

// //insert
// var obj = {
//   nombre: 'Juan',
//   apellido: 'Lopez',
//   trabajo: 'docente',
//   edad: '38',
//   salario: '1500',
//   mail:'juanlopez@gmail.com'
// }

// pool.query('insert into empleados set ?', [obj]).then(function (resultados)
// {
//   console.log(resultados)
// });



// //modificar
// var id = 23
// var obj = {
//   nombre: 'Drake',
//   apellido: 'Oliver'
// }
  
// pool.query('update empleados set? where id =?', [obj, id]).then
// (function (resultados) {
// console.log(resultados);
// });


// //BORRAR
// var id = 2;
// pool.query('DELETE FROM empleados WHERE id = ?', [id])
//   .then(function(resultados) {
//     console.log(resultados);
//   })
//   .catch(function(error) {
//     console.error('Error al borrar el empleado:', error);
//   });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
