const events = require('./events')
const arrayMethods = Object.create(Array.prototype)
// 创建一个新的原型，这就是改造之后的数组原型
const ArrayProto = []
// 重新构建Array原型里面的虽有方法
Object.getOwnPropertyNames(Array.prototype).forEach(method => {
  if(typeof arrayMethods[method] === "function"){
    ArrayProto[method] = function(){
      arrayMethods[method].apply(this, arguments)
      let data = arrayMethods['shift'].apply(this)
      console.log(`我已经监听到数组触发了${method}事件`)
      // 订阅事件
      events.emit('dispatcher',data)
    }
  }else{
    ArrayProto[method] = arrayMethods[method]
  }
})

module.exports = ArrayProto

