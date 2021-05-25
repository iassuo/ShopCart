/*
 * @Author: your name
 * @Date: 2021-05-22 11:33:16
 * @LastEditTime: 2021-05-24 15:23:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \03阶段_20天_JS函数与事件 预习内容c:\Users\admin\Desktop\wanxi 21-3-29\万息资料-开课\04阶段_28天_购物车预习内容\js\myQuery.js
 */

// 选择一个或多个元素
function $(selector) {
  let element = document.querySelectorAll(selector);
  if (element.length === 1) {
    return element[0];
  } else {
    return element;
  }
}

// 创建一个元素
function $C(elename) {
  return document.createElement(elename);
}

// 选取父元素下的子元素 
function $IN(selector, parentNode) {
  let element = parentNode.querySelectorAll(selector);
  if (element.length === 1) {
    return element[0];
  } else {
    return element;
  }
}

// 选取当前节点的所有兄弟节点
function getSiblings(currNoe) {
  var siblingsArr = [];
  var total = currNoe.parentNode.children;
  var leng = total.length;
  for (let i=0; i<leng; i++) {
    if (total[i] !== currNoe) siblingsArr.push(total[i]);
  }
  return siblingsArr;
}

