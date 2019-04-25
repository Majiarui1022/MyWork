'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"http://10.102.24.46:5000/"'
  // fsl    http://10.102.24.42:8000/
  //  lh    http://10.102.24.46:5000/
})
