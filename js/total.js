/*
 * @Author: your name
 * @Date: 2021-05-24 16:52:51
 * @LastEditTime: 2021-05-25 21:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \03阶段_20天_JS函数与事件 预习内容c:\Users\admin\Desktop\我的文件\0524\0523\js\cartlist.js
 */

// 轮播图 js -----------------------------------------------
var wrap = $(".wrap"); // 所有图片的容器
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
var index = 0; // 默认选中轮播图小圆点的第一个
var dots = $('.lidot'); // 选中所有小圆点

// 右箭头点击切换到下一张
next.onclick = function () {
  next_pic();
}
// 左箭头点击切换到上一张
prev.onclick = function () {
  prev_pic();
}

function next_pic() {
  var newLeft = parseInt(wrap.style.left) - 600;
  wrap.style.left = newLeft + "px";
}

function prev_pic() {
  var newLeft = parseInt(wrap.style.left) + 600;
  wrap.style.left = newLeft + "px";
}

function next_pic() {
  var newLeft;
  // if(wrap.style.left === '-3000'){
  //   // setTimeout(()=>{
  //   //   wrap.classList.remove('transition');
  //   //   newLeft = -600;
  //   // }, 1500);
  // }
  if (wrap.style.left === "-3600px") { // 到第七张图了
    newLeft = -1200;
    wrap.classList.remove('transition');
  }

  else {
    newLeft = parseInt(wrap.style.left) - 600;
  }
  wrap.style.left = newLeft + "px";
  // 控制小圆点样式
  index++;
  if (index > 4) {
    index = 0;
  }
  showCurrentDot();
}

function prev_pic() {
  var newLeft;
  if (wrap.style.left === "0px") {
    newLeft = -2400;

  } else {
    newLeft = parseInt(wrap.style.left) + 600;
  }
  wrap.style.left = newLeft + "px";

  // 控制小圆点样式
  index--;
  if (index < 0) {
    index = 4;
  }
  showCurrentDot();
}
// 定时器自动播放
var timer = null;
function autoPlay() {
  timer = setInterval(function () {
    next_pic();
  }, 1500);
}
autoPlay();
// 单击图片停止轮播图播放
var swiperBox = $('.swiperbox');
swiperBox.onmouseenter = function () {
  clearInterval(timer);
}
swiperBox.onmouseleave = function () { // 离开图片重新播放
  autoPlay();
}
// 控制每个小圆点的类名
function showCurrentDot() {
  dots.forEach(item => {
    item.className = '';
  })
  dots[index].className = 'on';
}
// 点击小圆点切换图片
dots.forEach(item => {
  item.onclick = function () {
    var i = parseInt(item.innerHTML) - 1
    var distance = index - i; // 上次的小圆点 Index - 当前点击的小圆点 index = 差了几个小圆点（图片的距离）
    if (index == 4 && parseInt(wrap.style.left) !== -3000) {
      distance = distance - 5; // 因为轮播图要向右移动， -5为了最终结果为负值
    }
    if (index == 0 && parseInt(wrap.style.left) !== -600) {
      distance = distance + 5; // 因为轮播图要向左移动， +5为了最终结果为正值
    }
    wrap.style.left = (parseInt(wrap.style.left) + distance * 600) + 'px';
    index = i;
    showCurrentDot();
  }
})

// 分页区域 ------------------------------------------------ 
/** 
* @param {array} itemInfo // 商品列表
* @param {array} cartInfo // 购物车列表
*/
var pageBtns = $('#lipage'); // 获取页数按钮
var totalPages = data.length; // 总页数
var showTotalPages = $('#total #totalp'); // 获取总页数显示区域
var toWhichPage = $('#topageipt'); // 获取 去第几页
var sureBtn = $('#sure'); // 获取确定按钮
var prePageBtn = $('.aside-left'); // 上一页按钮
var nextPageBtn = $('.aside-right'); // 下一页按钮
var tempPage = 1; // 设置当前页数
showTotalPages.innerHTML = totalPages; // 显示总页数

// 监听上一页单击事件
prePageBtn.addEventListener('click', function () {
  if (tempPage == 1) {
    return;
  } else {
    tempPage = tempPage - 2;
    changePage();
  }
})
// 监听下一页单击事件
nextPageBtn.addEventListener('click', function () {
  if (tempPage == totalPages) {
    return;
  } else {
    changePage();
  }
})
// 监听 输入页数-确定按钮的单击事件
sureBtn.addEventListener('click', function () {
  if (toWhichPage.value > totalPages || toWhichPage.value == '') {
    return;
  }
  tempPage = parseInt(toWhichPage.value) - 1; // 存储当前页数
  changePage();
})
// 循环绑定单击页数事件
for (let i = 0; i < pageBtns.length; i++) {
  pageBtns[i].addEventListener('click', function () {
    tempPage = i;
    changePage();
  })
}
// 切换页面-公共部分函数
function changePage() {
  $('.content').innerHTML = ''; // 清空列表内容
  createList(data[tempPage], ".content"); // 调用渲染页面函数
  pageBtns[tempPage].classList.add('currpage'); // 当前元素添加高亮样式
  var siblings = getSiblings(pageBtns[tempPage]); // 获取所有兄弟元素数组
  for (let i = 0; i < siblings.length; i++) { // 循环移除所有兄弟元素样式
    siblings[i].classList.remove('currpage');
  }
  tempPage = parseInt(pageBtns[tempPage].children[0].innerHTML); // 获取当前页的页数以便下次操作
}

// 商品 js ------------------------------------------------

// 获取列表容器
var cartContainer = $('.cartul');
// 1 根据数据源构建页面,先渲染第一页
createList(data[0], ".content");
// 1-1 工具函数-创建数据列表
function createList(_data, _listContainer) {
  for (let i = 0; i < _data.titleArr.length; i++) {
    var tempDiv = $C('div');
    tempDiv.classList.add('item');
    tempDiv.innerHTML =
      `<div class="item_left"> 
        <img class="item-img" src="${_data.imgArr[i]}" alt="">
      </div>
      <div class="item_right">
        <div class="title">${_data.titleArr[i]}</div>
        <div class="info">${_data.subtitleArr[i]}</div>
        <div class="price">
          <span class="currprice">${_data.priceArr[i]}</span><del style="color: #ccc;"><span class="preprice">${_data.prePriceArr[i]}</span></del>
        </div>
        <div class="btnbox"><button  goods-id = "${i + 1}" class="btn2">加入购物车</button></div>
    </div>`;
    $(_listContainer).appendChild(tempDiv);
  }
}
var addToCartBtns = $('.btn2'); // 获取加入购物车按钮
// 2 从缓存中读取购物车数据 
var cartInfo2 = readInfo_fromLS();
addToCart(addToCartBtns); // 调用点击事件
// 2-2 工具函数 从缓存中读取购物车数据
function readInfo_fromLS() {
  var _cartInfo = window.localStorage.getItem("cartListCookie");
  // // 如果购物车数据存在，则赋值给 _cartInfo,
  if (_cartInfo) return JSON.parse(_cartInfo);
  // // 如果不存在，则创建一个新的缓存数组
  window.localStorage.setItem("cartListCookie", []);
  return [];
}
// 3 点击加入购物车
function addToCart(_addToCartBtns) {
  for (let i = 0; i < _addToCartBtns.length; i++) {
    _addToCartBtns[i].onclick = function () {
      // 点击后就渲染购物车列表

      /*
        点击按钮后，把当前商品信息构成一个对象
        读取缓存，判断缓存数据中是否存在和当前商品 ID 相同的项
        如果存在，则缓存中商品 数量 +1，如果不存在，把当前商品信息 push 到缓存数组中
      */

      // 3-1 获取商品信息，构建对象
      var parent = this.parentNode.parentNode;
      var title = $IN('.title', parent).innerHTML;
      var subTitle = $IN('.info', parent).innerHTML;
      var currPrice = $IN('.currprice', parent).innerHTML.replace('元', '');
      var prePrice = $IN('.preprice', parent).innerHTML;
      var imgSrc = $IN('.item-img', parent.previousElementSibling).getAttribute('src');
      var goodsId = this.getAttribute('goods-id');

      var item = {
        id: goodsId,
        title: title,
        subTitle: subTitle,
        currPrice: parseInt(currPrice),
        prePrice: prePrice,
        imgSrc: imgSrc,
        num1: 1,
        check: 1
      }

      // 3-2 3-3 读取缓存 判断是否存在相同 ID,  不存在则 push 进换存，并重新设置缓存 
      var tempCartInfo = readInfo_fromLS(); // 设置临时缓存变量

      if (!isItemExistInLS(tempCartInfo, item)) {
        tempCartInfo.push(item);
      }
      window.localStorage.setItem('cartListCookie', JSON.stringify(tempCartInfo));
    }
  }
  showCartList(cartInfo2, cartContainer);
}
// 设置一个判断商品是否存在于缓存中的函数
function isItemExistInLS(_itemInfo, _item) {
  var flag = false;
  // 判断当前点击的产品 ID 是否已经存在于购物车数据里
  for (let i = 0; i < _itemInfo.length; i++) {
    if (_itemInfo[i].id == _item.id) {
      flag = true;
      // 如果存在，数量加一
      _itemInfo[i].num1++;
      break;
    }
  }
  return flag;
}                                               
// 购物车 js ----------------------------------------------

// 从缓存中读取购物车数据
var cartInfo2 = readCartInfo_fromLS();
// 渲染列表
showCartList(cartInfo2, cartContainer);
// 渲染总数总价
showTotal_NumAndPrice(cartInfo2);
// 列表事件绑定
bindEvent_For_CartItem();

// 工具函数-从缓存中读取购物车数据
function readCartInfo_fromLS() {
  var _cartInfo = window.localStorage.getItem('cartListCookie');
  if (_cartInfo) return JSON.parse(_cartInfo);
  window.localStorage.setItem('cartListCookie', []);
  return [];
}
// 渲染列表
function showCartList(_cartInfo, _container) {
  var listHTML = '';
  // 如果当前商品的 check 是 1，说明要参与计算，页面渲染后也必须是打钩的状态
  for (let i = 0; i < _cartInfo.length; i++) {
    var mychecked = '';
    if (_cartInfo[i].check == 1) {
      mychecked = 'checked';
    }
    listHTML += `
             <li class="list-li choosedcolor" data-id="${_cartInfo[i].id}">
                 <input type="checkbox" checked="${mychecked}" class="checkbox" />
                 <img src="${_cartInfo[i].imgSrc}" alt="" />
                 <div class="descontent">
                     <span class="title">${_cartInfo[i].title}</span>
                     <span class="info">${_cartInfo[i].subTitle}</span>
                 </div>
                 <div class="price">
                     <div class="preprice"><del>原价:${_cartInfo[i].prePrice}</del></div>
                     <div class="currprice">现价:${_cartInfo[i].currPrice}元</div>
                 </div>
                 <div class="count">
                     <div class="dec">-</div>
                     <input type="text" class="num" value="${_cartInfo[i].num1}"></input>
                     <div class="add">+</div>
                 </div>
                 <button class="delete">删除</button>
             </li>
             `;
  }
  _container.innerHTML = listHTML;
}
// 工具函数-计算总价
function getTotalPrice(_cartInfo) {
  var totalPrice = 0;
  for (let i = 0; i < _cartInfo.length; i++) {
    if (_cartInfo[i].check == 1) {
      totalPrice += _cartInfo[i].currPrice * _cartInfo[i].num1;
    }
  }
  return totalPrice;
}
// 工具函数-计算总数
function getTotalNum(_cartInfo) {
  var totalNum = 0;
  for (let i = 0; i < _cartInfo.length; i++) {
    if (_cartInfo[i].check == 1) {
      totalNum += _cartInfo[i].num1;
    }
  }
  return totalNum;
}
// 渲染总价与总数
function showTotal_NumAndPrice(_cartInfo) {
  $('.sumnum').innerHTML = getTotalNum(_cartInfo);
  $('.sumprice').innerHTML = getTotalPrice(_cartInfo);
}
//--工具函数-列表菜单事件绑定（所有单击事件）
function bindEvent_For_CartItem() {
  // 获取菜单元素
  // var iptNum = $('.num') // 商品数量
  var decBtn = $('.dec') // 数量减按钮    
  var addBtn = $('.add') // 数量加按钮
  var checkBox = $('.checkbox') // 复选框 
  var allCheckedBox = $('.botinput') // 全选框
  var delBtn = $('.delete') // 删除按钮
  var delAllBtn = $('.delall') // 全部删除按钮
  // var listLi = $('.list-li') // 列表每一项

  // 全选按钮状态校验
  checkAll(allCheckedBox, checkBox);
  // 全选按钮功能加载
  bindAll(allCheckedBox, checkBox);
  // 单选按钮功能加载
  checkOne(allCheckedBox, checkBox);
  // 增加数量功能
  addBtnFunc(addBtn);
  // 减少数量功能
  decBtnFunc(decBtn);
  // 删除一个按钮功能
  delBtnFunc(delBtn);
  // 全部删除按钮功能
  delAllBtnFunc(delAllBtn);
}
// 工具函数-全选按钮状态校验
function checkAll(_allCheckedBox, _checkBox) {
  // 默认全选
  var isAll = true;
  // 遍历确认是否有单选未被选中,有则全选也不选中
  for (let i = 0; i < _checkBox.length; i++) {
    if (_checkBox[i].checked == false) {
      isAll = false;
      break;
    }
  }
  _allCheckedBox.checked = isAll;
}
// 工具函数-全选按钮功能加载
function bindAll(_allCheckedBox, _checkBox) {
  _allCheckedBox.addEventListener('click', function () {
    // 从缓存中读取购物车数据
    // var cartInfo2 = readCartInfo_fromLS();
    var allCheckState = _allCheckedBox.checked;
    if (allCheckState) {
      // cartInfo2 = readCartInfo_fromLS();
      for (let i = 0; i < _checkBox.length; i++) {
        // 更新页面单选按钮状态
        _checkBox[i].checked = true;
        // 更改样式
        _checkBox[i].parentNode.classList.add('choosedcolor');
        cartInfo2[i].check = 1;
        // 获取产品 ID
        // var itemID = _checkBox[i].parentNode.getAttribute('data-id');
        // // 更新缓存单选按钮状态数据
        // updateValue_inCookie(itemID, cartInfo2);
        // 更新后数据重新写入缓存
        window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
        // console.log(window.localStorage.getItem('cartListCookie'));
      }
      cartInfo2 = readCartInfo_fromLS();
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
    } else {
      // cartInfo2 = readCartInfo_fromLS();;
      for (let i = 0; i < _checkBox.length; i++) {
        // 更新页面单选按钮状态
        _checkBox[i].checked = false;
        // 更改样式
        _checkBox[i].parentNode.classList.remove('choosedcolor');
        cartInfo2[i].check = 0;
        // // 获取产品 ID
        // var itemID = _checkBox[i].parentNode.getAttribute('data-id');
        // // 更新缓存单选按钮状态数据
        // updateValue_inCookie(itemID, cartInfo2);
        // 更新后数据重新写入缓存
        window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
      }
      cartInfo2 = readCartInfo_fromLS();
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
    }
  })
}
// 工具函数-单选按钮功能加载
function checkOne(_allCheckedBox, _checkBox) {
  for (let i = 0; i < _checkBox.length; i++) {
    _checkBox[i].addEventListener('click', function () {
      // 获取产品 ID
      var itemID = this.parentNode.getAttribute('data-id');
      // 更新缓存数据
      updateValue_inCookie(itemID, cartInfo2);
      // 更新后数据重新写入缓存
      window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
      // 全选按钮状态校验
      checkAll(_allCheckedBox, _checkBox);
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
      // 更改当前项样式
      if (_checkBox[i].checked == true) {
        _checkBox[i].parentNode.classList.add('choosedcolor');
      } else {
        _checkBox[i].parentNode.classList.remove('choosedcolor');
      }
    })
  }
}
// 工具函数-更新单选按钮缓存数据
function updateValue_inCookie(_itemID, _cartInfo) {
  _cartInfo.map(item => {
    if (item.id == _itemID) {
      if (item.check == 1) item.check = 0;
      else item.check = 1; 
    }
  })
}
// 工具函数-增加数量按钮功能加载
function addBtnFunc(_addBtn) {
  for (let i = 0; i < _addBtn.length; i++) {
    _addBtn[i].addEventListener('click', function () {
      // 获取数量框
      var inputBox = $IN('.num', this.parentNode.parentNode);
      // 获取产品 ID
      var itemID = this.parentNode.parentNode.getAttribute('data-id');
      // 从缓存中获取当前商品信息
      var currItem = cartInfo2.filter(item => {
        if (item.id == itemID) {
          return true;
        }
      })
      // 点击后 input 值加一
      var num = parseInt(inputBox.value) + 1;
      inputBox.value = num;
      // 更新缓存
      cartInfo2.map(item => {
        if (item.id == itemID) {
          item.num1 = num;
        }
      })
      // 更新缓存后写入缓存
      window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
    })
  }
}
// 工具函数-减少数量按钮功能加载
function decBtnFunc(_decBtn) {
  for (let i = 0; i < _decBtn.length; i++) {
    _decBtn[i].addEventListener('click', function () {
      // 获取数量框
      var inputBox = $IN('.num', this.parentNode.parentNode);
      // 获取产品 ID
      var itemID = this.parentNode.parentNode.getAttribute('data-id');
      // 从缓存中获取当前商品信息
      var currItem = cartInfo2.filter(item => {
        if (item.id == itemID) {
          return true;
        }
      })
      // 点击后 input 值减一
      var num = parseInt(inputBox.value) - 1;
      if (num == 0) {
        return;
      }
      inputBox.value = num;
      // 更新缓存
      cartInfo2.map(item => {
        if (item.id == itemID) {
          item.num1 = num;
        }
      })
      // 更新缓存后写入缓存
      window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
    })
  }
}
// 工具函数-删除按钮功能加载
function delBtnFunc(_delBtn) {
  for (let i = 0; i < _delBtn.length; i++) {
    _delBtn[i].addEventListener('click', function () {
      // 删除缓存数据
      cartInfo2 = cartInfo2.filter(item => {
        if (item.id == this.parentNode.getAttribute('data-id')) {
          return false;
        }
        return true;
      })
      // 重写缓存
      window.localStorage.setItem('cartListCookie', JSON.stringify(cartInfo2));
      // 删除当前 DOM 节点
      this.parentNode.remove();
      // 重新渲染总数与总价
      showTotal_NumAndPrice(cartInfo2);
    })
  }
}
// 工具函数-全部删除按钮功能加载
function delAllBtnFunc(_delAllBtn) {
  _delAllBtn.addEventListener('click', function () {
    //选中要删除的产品列表的checkbox，因为设计checkbox的value和商品对应的id相同
    var delList = $('input.checkbox:checked');
    //  循环对比，清空数据
    for (let i = 0; i < delList.length; i++) {
      // 删除选中项的数据
      cartInfo2 = cartInfo2.filter(item => {
        if (delList[i].value == item.id) {
          return false;
        }
        return true;
      })
      // 删除对应的 DOM 节点
      delList[i].parentNode.remove();
    }
    // 重新渲染总数总价
    showTotal_NumAndPrice(cartInfo2);
    window.localStorage.removeItem('cartListCookie');
  })
}