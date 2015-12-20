'use strict'

module.exports = cuthillMckee

function compareNum(a, b) { return a - b }

function cuthillMckee(list, n) {
  var adj = new Array(n)
  var visited = new Array(n)
  for(var i=0; i<n; ++i) {
    adj[i]     = []
    visited[i] = false
  }

  for(var i=0; i<list.length; ++i) {
    var l = list[i]
    adj[l[0]].push(l[1])
  }

  var toVisit = new Array(n)
  var eol = 0
  var ptr = 0
  for(var i=0; i<n; ++i) {
    if(visited[i]) {
      continue
    }
    toVisit[eol++] = i
    visited[i] = true
    while(ptr < eol) {
      var v = toVisit[ptr++]
      var nbhd = adj[v]
      nbhd.sort(compareNum)
      for(var j=0; j<nbhd.length; ++j) {
        var u = nbhd[j]
        if(visited[u]) {
          continue
        }
        visited[u] = true
        toVisit[eol++] = u
      }
    }
  }

  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[toVisit[i]] = i
  }

  return result
}
