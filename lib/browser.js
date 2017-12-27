'use strict'

let browser
let page

async function start () {
  const puppeteer = require('puppeteer')
  console.info((new Date()).toLocaleString())
  // 启动浏览器
  browser = await puppeteer.launch()
  console.info('启动浏览器成功')
  // 打开新页面
  page = await browser.newPage()
  page.on('dialog', dialog => {
    // 同意离开页面
    dialog.accept()
  })
}

async function stop () {
  if(!browser){
    console.error('浏览器未启动')
    return
  }
  await browser.close()
  console.info((new Date()).toLocaleString())
}

function getBrowser () {
  if(!browser) {
    console.error('浏览器未启动')
    return
  }
  return browser
}

function getPage () {
  if(!page) {
    console.error('页面未启动')
    return
  }
  return page
}

module.exports = {
  start,
  stop,
  getBrowser,
  getPage
}