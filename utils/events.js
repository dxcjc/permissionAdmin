
function Events() {
  this.event = {}
  // this.queue = []
}
// 发布订阅
Events.prototype.on = function (type,callback) {
  if(!this.event[type]) {
    this.event[type] = [];
  }
  this.event[type].push(callback);
}
// 分发订阅（数据进入 执行回调）
Events.prototype.emit = function (type,data) {
  // this.queue.push(data)
  // this.callbacks.forEach(c => c(this.queue.shift()))
  this.event[type].forEach(callbacks => callbacks(data))
}
module.exports = new Events()



