'use strict'

const path = require('path');
const { start, stop } = require('./lib/browser');
const constant = require('./lib/constant');
const idUtils = require('./lib/id');
const actions = require('./lib/actions');


(async () => {
  try{
    await start()
    await actions.login()
    await idUtils.fetchIds()
    await actions.action()
    await stop()
  }catch(e) {
    console.error(e)
  }
})()