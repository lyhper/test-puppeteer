'use strict'

const { domain, beginPageId, endPageId } = require('./constant')

// 存储所有项目+页面id
let allIds = []
// list页pageId
let id = beginPageId
// 当前正在编辑的页面索引
let currentIndex = 0


/**
 * 获取列表页上的所有专题id和页面id
 */
async function fetchIds () {
  const { getPage } = require('./browser')
  const page = getPage()
  await page.goto(`${domain}/list?page=${id}`)
  const ids = await page.$$eval('.pt-page-tr .pt-td2', elems => {
    // 浏览器上下文
    const elemIds = []
    elems.forEach(elem => {
      elemIds.push(elem.innerText.split('-'))
    })
    return elemIds
  })

  allIds = allIds.concat(ids)

  if (id < endPageId) {
    id++
    await fetchIds()
  }else{
    console.info('获取所有id完成:')
    console.info(allIds)
  }
}

function getCurrentId () {
  return allIds[currentIndex]
}

function getCurrentIndex () {
  return currentIndex
}

function getAllIds () {
  return allIds
}

function addCurrentIndex () {
  if (currentIndex < allIds.length - 1) {
    currentIndex++
  }
}

module.exports = {
  fetchIds,
  getCurrentId,
  getCurrentIndex,
  addCurrentIndex,
  getAllIds
}