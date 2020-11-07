function convertTree(data,list) {

  list.forEach(r => {
    data.forEach((m, i) => {
      if (m.fid!==0 && m.fid === r.pid) {
        m.children = []
        r.children.push(m)
      }
    })
    if (r.children) convertTree(data,r.children)
  })
}


module.exports = {
  convertTree
}
