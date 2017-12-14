/***
 * 去空格
 * @returns {string}
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
/**
 * 多出字符串长度用...代替
 * @param num 截取长度
 * @returns {string}
 */
String.prototype.strEllipsis=function(num) {
    return this.substring(0,num)+'...';
};

/**
 * 设置Cookie
 * @param key key键值名称
 * @param value key键所对应的值
 * @param seconds 超时时间，毫秒
 */
function setCookie(key, value, seconds) {
    seconds = seconds || 0;  
    var expires = "";
    if (seconds != 0 ) {     
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = key+"="+escape(value)+expires+"; path=/";
}

/**
 * 从cookie获取指定key的值
 * @param key 要获取cookie的指定key名称
 * @returns {string}
 */
function getCookie(key) {
    var nameEQ = key + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length,c.length));
        }
    }
    return '';
}

/**
 * 清除指定key的Cookie值
 * @param key 指定key名称
 */
function clearCookie(key) {
    setCookie(key, "", -1);
}
var TimeoutCookie = 60 * 30;

/**
 * 存储指定的key和value
 * @param key 存储键
 * @param value 存储值
 */
function setKeyItem(key,value) {
    if (window.sessionStorage){
        sessionStorage.setItem(key,value);
    }else{
        setCookie(key,value,TimeoutCookie)
    }
}
/**
 * 根据key键获取value
 * @param key 键
 */
function getKeyItem(key) {
    if (window.sessionStorage){
        return sessionStorage.getItem(key);
    }else{
        return getCookie(key);
    }
}
/**
 * 清空存储的键值对
 */
function clearKeyItem() {
    if (window.sessionStorage){
        sessionStorage.clear();
    }else{
        clearCookie("KEY_USER_INFO");
    }
}

/**
 * 存储用户登录信息
 * @param user 要存储的用户对象
 */
function saveUserInfo(user){
    if (window.sessionStorage){
        sessionStorage.setItem("KEY_USER_INFO",JSON.stringify(user));
    }else{
        setCookie("KEY_USER_INFO",JSON.stringify(user),TimeoutCookie);
    }
}

/**
 * 获取用户信息
 * @returns {Object} 返回用户对象
 */
function getUserInfo(){
    if (window.sessionStorage){
        var userInfo=JSON.parse(sessionStorage.getItem("KEY_USER_INFO"));
        return userInfo;
    }else {
        return JSON.parse(getCookie("KEY_USER_INFO"));
    }
}
/**
 * 获取url中参数，并封装为对象
 * @returns {Object}
 * @constructor
 */
function GetUrlParam(){
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=
                decodeURIComponent(decodeURIComponent(strs[i].split("=")[1]));
        }
    }
    return theRequest;
}

$(document).ready(function(){
   $('.menu ul li').on('click',function () {
       var index = $(this).index();
       var url = $(this).attr('surl');
       if(!url) return;
       if(url.indexOf('?')==-1){
           url = url + '?idxTab='+index;
       }else{
           url = url + '&idxTab='+index;
       }
       window.location.href = url;
   });
   var menuIdx = GetUrlParam().idxTab?GetUrlParam().idxTab:0;
   $($('.menu ul li').get(menuIdx)).addClass('active');
});