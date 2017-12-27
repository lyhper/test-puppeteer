'use strict'

const urlUtils = require('./url')
const { getPage } = require('./browser')
const constant = require('./constant')
const idUtils = require('./id')

async function login () {
  const { username, password, loginUrl } = constant
  const page = getPage()

  await page.goto(loginUrl)
  // 等待表单渲染成功
  await page.waitForSelector('input[type=password]')
  await page.type('#login-box-finput', username)
  await page.type('input[type=password]', password)
  await page.click('input[type=submit]')
  // 等待登陆成功跳转
  await page.waitForNavigation()
  console.info('登陆成功')
}

// 一次操作
async function action () {
  const currentId = idUtils.getCurrentId()
  const currentProjectId = currentId[0]
  const currentPageId = currentId[1]

  const currentIndex = idUtils.getCurrentIndex()
  const length = idUtils.getAllIds().length

  try{
    await goToEditPage()
    await save()
    await publish()
  }catch(e) {
    console.info('页面数据错误,尝试下一个页面')
  }

  if (currentIndex < length - 1) {
    idUtils.addCurrentIndex()
    await action()
  }else {
    console.info('所有页面发布完成')
    console.info(`共计${length}个页面`)
  }
}

async function goToEditPage () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  const page = getPage()
  const url = urlUtils.getEditUrl()
  console.info(`跳转编辑页(${projectId}/${pageId})`)
  await page.goto(url)
}

async function save () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  const page = getPage()
  await page.click('.item-primary>a')
  console.info(`保存中...(${projectId}/${pageId})`)
  // 等待保存成功
  await page.waitForSelector('.toast-success')
  console.info(`保存成功(${projectId}/${pageId})`)
}

async function publish () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  const page = getPage()
  await page.click('.item-success>a')
  console.info(`发布中...(${projectId}/${pageId})`)
  // 等待发布成功
  await page.waitForSelector('.publish-success')
  console.info(`发布成功(${projectId}/${pageId})`)
}

module.exports = {
  login,
  action
}