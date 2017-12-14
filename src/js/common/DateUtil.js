/***
 * 格式化时间
 * @param fmt yyyy(年)，MM(月)，dd(日)，hh(时)，mm(分)，ss(秒)，S(毫秒)，q(季度)
 * @returns {String}  fmt格式的时间字符串
 * @constructor
 */
Date.prototype.Format2String = function (fmt) {
    if(!this) return null;
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * 把时间格式化为特定格式的时间
 * @returns {String}
 * hh:mm(不超过一天),
 * 昨日 hh:mm(大于一天不超过两天)，
 * 前天 hh:mm(大于两天不超过三天)，
 * yyyy-MM-dd(大于三天)
 * @constructor
 */
Date.prototype.Format2Personal = function () {
    if(!this) return null;
    var newTime = new Date();
    var hhmm = this.Format2String('hh:mm');
    if(this.getDay()==newTime.getDay()){
        return hhmm;
    }else if(this.getDay()+1==newTime.getDay()){
        return '昨日 '+ hhmm;
    }else if(this.getDay()+2==newTime.getDay()){
        return '前天 '+ hhmm;
    }
    return this.Format2String('yyyy-MM-dd');
};
/**
 * 人性化时间格式,参考微信朋友圈时间
 * @returns {String} 格式化之后的时间
 * @constructor
 */
Date.prototype.FormatPersonal = function () {
    if(!this) return null;
    var time = this.getTime()/1000;
    var newTime = new Date().getTime()/1000;
    var dis = newTime-time;
    if(dis<60){
       return '1分钟前';
    }else if(dis>=60&&dis<=60*60){
       return parseInt(dis/(60)) + '分钟前';
    }else if(dis>=60*60&&dis<60*60*24){
       return parseInt(dis/(60*60)) + '小时前';
    }else if(dis>=60*60*24&&dis<60*60*24*2){
       return '昨天';
    }else if(dis>=60*60*24*2&&dis<60*60*24*30){
       return parseInt(dis/(60*60*24)) + '天前';
    }else{
       return this.Format2String('yyyy-MM-dd')
    }
};
/***
 * 格式化时间
 * @param fmt yyyy(年)，MM(月)，dd(日)，hh(时)，mm(分)，ss(秒)，S(毫秒)，q(季度)
 * @returns {String}  fmt格式的时间字符串
 * @constructor
 */
String.prototype.Format2String = function (fmt) {
    if(this == '') return null;
    var reg = new RegExp("^[0-9]*$");
    if(reg.test(this)){ // 如果全部是数字
        return new Date(this).Format2String(fmt);
    }
    var result = new Date(this.replace(/-/g,"/"));
    if(result.toString()=='Invalid Date'){
        console.log('时间格式不正确，请使用yyyy-MM-dd hh:MM:ss 或者 yyyy/MM/dd hh:MM:ss');
        return null;
    }
    return result.Format2String(fmt);
};
/***
 * 直接把字符串转换为时间
 * @returns {Date} 返回时间格式
 * @constructor
 */
String.prototype.Format2Date = function () {
    if(this == '') return null;
    var reg = new RegExp("^[0-9]*$");
    if(reg.test(this)){ // 如果全部是数字
       return new Date(this);
    }
    var result = new Date(this.replace(/-/g,"/"));
    if(result.toString()=='Invalid Date'){
        console.log('时间格式不正确，请使用yyyy-MM-dd hh:MM:ss 或者 yyyy/MM/dd hh:MM:ss');
        return null;
    }
    return result;
};
/**
 * 人性化时间格式,参考微信朋友圈时间
 * @returns {String} 格式化之后的时间
 * @constructor
 */
String.prototype.FormatPersonal = function () {
    if(this == '') return null;
    return this.Format2Date().FormatPersonal();
};
/**
 * 把时间格式化为特定格式的时间
 * @returns {String}
 * hh:mm(不超过一天),
 * 昨日 hh:mm(大于一天不超过两天)，
 * 前天 hh:mm(大于两天不超过三天)，
 * yyyy-MM-dd(大于三天)
 * @constructor
 */
String.prototype.Format2Personal = function () {
    if(this == '') return null;
    return this.Format2Date().Format2Personal();
};








