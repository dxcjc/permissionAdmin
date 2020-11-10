function setPremission(routes, list) {
  routes = unique(routes)
  routes.forEach((m, i) => {
    if (m.fid === 0) {
      console.log(m);
      m.children = []
      list.push(m)
    }
  })
  convertTree(routes, list)
}
function unique(arr) {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
}
function convertTree(data, list) {
  list.forEach(r => {
    data.forEach((m, i) => {
      if (m.fid !== 0 && m.fid === r.id) {
        m.children = []
        r.children.push(m)
      }
    })
    if (r.children) convertTree(data, r.children)
  })
}


module.exports = {
  setPremission,unique
}
