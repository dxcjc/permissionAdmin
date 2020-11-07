const ArrayProto = require('./observe')
function Queue() {
  this.queue = []
  // this.queue.__proto__ = ArrayProto
}

Queue.prototype.push = function (data) {
  console.log(data);
  this.queue.push(data)
}

Queue.prototype.shift = function () {
  if (this.queue.length > 0) {
    return this.queue.shift()
  }
}

let queue = new Queue()
queue.__proto__ = ArrayProto
module.exports = queue
