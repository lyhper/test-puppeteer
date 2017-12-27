'use strict'

const idUtils = require('./id')
const url = require('./constant').domain

function getEditUrl () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  return `${url}/editPage/${projectId}/${pageId}`
}

function getSaveUrl () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  return `${url}/savePageData/${projectId}/${pageId}`
}

function getPublishUrl () {
  const currentId = idUtils.getCurrentId()
  const projectId = currentId[0]
  const pageId = currentId[1]
  return `${url}/publish/${projectId}/${pageId}`
}

module.exports = {
  getEditUrl,
  getSaveUrl,
  getPublishUrl
}