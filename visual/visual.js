var bunny = require('bunny')
var laplacian = require('mesh-laplacian')
var cuthillMckee = require('../cuthill-mckee')

var numVerts = bunny.positions.length

var M = laplacian(bunny.cells, bunny.positions)
plotSparse(M)

var P = cuthillMckee(M, numVerts)
console.log(P)
var MP = permuteList(M, P)
plotSparse(MP)

function permuteList(M, P) {
  return M.map(function(c) {
    return [P[c[0]], P[c[1]], c[2]]
  })
}

function plotSparse(M) {
  var canvas = document.createElement('canvas')
  canvas.width = canvas.height = numVerts
  canvas.style.width = '512px'
  canvas.style.height = '512px'
  var context = canvas.getContext('2d')
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height)
  var data = pixels.data
  for(var i=0; i<data.length; i += 4) {
    data[i] = 0
    data[i+1] = 0
    data[i+2] = 0
    data[i+3] = 255
  }
  M.forEach(function(entry) {
    var x = entry[0]
    var y = entry[1]
    var v = entry[2]
    for(var dx=-2; dx<=2; ++dx) {
      for(var dy=-2; dy<=2; ++dy) {
        if(x + dx < 0 || x + dx >= numVerts ||
           y + dy < 0 || y + dy >= numVerts) {
          continue
        }
        var ptr = 4 * (x + dx + (y + dy) * numVerts)
        data[ptr++] = 255
        data[ptr++] = 255
        data[ptr++] = 255
        data[ptr++] = 255
      }
    }
  })
  context.putImageData(pixels, 0, 0)

  var img = new Image()
  img.src = canvas.toDataURL('png')
  document.body.appendChild(img)
}
