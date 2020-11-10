// 1.导入对应的模块
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const Router = require('./middleware/router')
const cors = require('cors');
const dispatcher = require('./dispatcher/dispatcher')
const createError = require("http-errors");


// 2.使用对应模块
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(Router)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let error = createError(404);
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  let result =
    process.env.NODE_ENV === "development"
      ? {
        error: {
          message: err.message,
          name: err.name,
          stack: err.stack
        }
      }
      : {};

  res.status(err.status || 500);
  res.json(result);
});

app.use(express.static(__dirname + "/src"));


app.listen(8089, () => {
  console.log('****************************服务器启动***************************************')
  dispatcher()
})
