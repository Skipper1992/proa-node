'use strict'

exports.register = function(server, options, next) {
//   require('./index')(server)
  
  next()
}


exports.register.attributes = {
  name: 'api'
}
