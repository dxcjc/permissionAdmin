// 1.导入对应的模块
const express = require('express')
const logger = require('morgan')
const async = require('async')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const infoRouter = require('./router/infoRouter')
const roleRouter = require('./router/roleRouter')
const Router = require('./middleware/router')
const permissionRouter = require('./router/permissionRouter')
const cors = require('cors');
const dispatcher = require('./dispatcher/dispatcher')



// 2.使用对应模块
const app = express();

app.use(cors())
// {origin:['http://localhost:9527']}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(Router)
app.use(infoRouter)
app.use(roleRouter)
app.use(userRouter)
app.use(permissionRouter)
app.use(express.static(__dirname + "/src"));


app.listen(8080, () => {
  console.log('****************************服务器启动***************************************')
  dispatcher()
})
