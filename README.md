# 基于Gulp的前端开发模版






**项目运行**
```javascript
$ git clone https://github.com/yangyongguan/automation-development-ie8.git

$ cd automation-development-ie8

$ npm install

$ npm run dev //用于开发环境

$ npm run build //用于生产环境

```
浏览器输入地址查看模板：http://localhost:3000/html/index/


### 项目目录结构

```
.
├─ build/               # gulp 任务配置目录
├─ dist/                # build 生成的生产环境下的项目
├─ src/                 # 源码目录（开发都在这里进行）
│   ├── components/     # 组件（COMPONENT）
│   ├── html/           # 页面级html
│   ├── css/            # css文件存放目录（less ,scss,css）
│   ├── js/             # js文件存放目录
│   ├── images/         # 图片文件
├── .babelrc            # Babel 转码配置
├── .gitignore          # （配置）需被 Git 忽略的文件（夹）
├── gulpfile.js         #   gulpfile基础配置文件
├── package.json        # （这个就不用多解释了吧）
```


### 安装必要的开发工具包
```
   babel-core         # babel-core 的作用是把 js 代码分析成 ast 方便各个插件分析语法进行相应的处理。
   babel-preset-env   # babel-preset-env可以根据配置的目标运行环境自动启用需要的 babel 插件
   browser-sync       # BrowserSync能让浏览器实时、快速响应您的文件的更改
   del                # 文件的删除操作
   gulp               # 用自动化构建工具增强你的工作流程！
   gulp-babel         # gulp-babel用于es6的语法转化
   gulp-changed       # 使用 gulp-changed 可以只让更改过的文件传递过管道。
   gulp-concat        # 使用 gulp-concat  用于文件合并
   gulp-html-extend   # 可以轻松扩展，包含和替换您的html文件
   gulp-if            # 可以利用条件判断
   gulp-imagemin      # 用于图片压缩
   gulp-less          # 用将less转化成css
   gulp-load-plugins  # 使用gulp-load-plugins模块，可以加载package.json文件中所有的gulp模块
   gulp-minify-css    # 压缩css
   gulp-minify-html   # 压缩html
   gulp-order         # 文件合并的排序
   gulp-plumber       # gulp的错误捕获
   gulp-rev           # 根据静态资源内容，生成md5签名，打包出来的文件名会加上md5签名
   gulp-sass          # 将scss  转化为css
   gulp-uglify        # js压缩
   uglify-js
```

### 已配置的任务
   + scripts  js处理支持es6
   + less     less转化和压缩
   + html     html的公共组件引入和压缩
   + img      图片的压缩
   + concatjs js合并处理
   
   > 如果需求不能满足您也可以在npm的网站上找到相应插件的gulp配置写法

### IE低版本兼容小贴士
#### IE浏览器hack
html:
```html
<!--[if IE]>
这段文字只在IE浏览器显示
<![endif]-->

只在IE6下生效
<!--[if IE 6]>
这段文字只在IE6浏览器显示
<![endif]-->

只在IE6以上版本生效
<!--[if gte IE 6]>
这段文字只在IE6以上(包括)版本IE浏览器显示
<![endif]-->

只在IE8上不生效
<!--[if ! IE 8]>
这段文字在非IE8浏览器显示
<![endif]-->

非IE浏览器生效
<!--[if !IE]>
这段文字只在非IE浏览器显示
<![endif]-->
```
css:
```css
“-″减号是IE6专有的hack
“\9″ IE6/IE7/IE8/IE9/IE10都生效
“\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
“\9\0″ 只对IE9/IE10生效，是IE9/10的hack
.hack{
/*demo1 注意顺序，否则IE6/7下可能无法正确显示，导致结果显示为白色背景*/
    background-color:red; /* All browsers */
    background-color:blue !important;/* All browsers but IE6 */
    *background-color:black; /* IE6, IE7 */
    +background-color:yellow;/* IE6, IE7*/
    background-color:gray\9; /* IE6, IE7, IE8, IE9, IE10 */
    background-color:purple\0; /* IE8, IE9, IE10 */
    background-color:orange\9\0;/*IE9, IE10*/
    _background-color:green; /* Only works in IE6 */
    *+background-color:pink; /*  WARNING: Only works in IE7 ? Is it right? */
}
```

#### 1、IE8及以下，布局问题
不使用flex，box-size:border-box，calc

#### 2、ie下进行跨域请求解决方案
jquery.xdomainrequest.min.js

#### 3、ie8,9 进行跨域post请求，参数无法传递解决办法
jquery的ajax方法添加
crossDomain: true == !(document.all)
例如：
```javascript
$.ajax({
    url: url,
    type: 'POST',
    data: params,
    dataType: 'json',
    contentType: "application/json",
    crossDomain: true == !(document.all),
    success: function (res) {
      ...
    },
    error: function (err) {
      ...
    }
})
```

#### 4、IE6,IE7下overflow：hidden无效
解决办法：position:relative; 或者 *position:relative; /* for IE6,IE7 */ 即可解决该bug。
既：
```css
position: relative;
overflow: hidden;
```

#### 5、css3选择器兼容问题？
```html
<!- -[if (gte IE 6)&(lte IE 8)]>
<script type="text/javascript" src="./js/common/nwmatcher.js"></script>
<script type="text/javascript" src="./js/common/selectivizr-min.js"></script>
<![endif]- ->
```
在非必不可得到情况下不建议使用，会引起页面卡顿

#### 6、兼容IE8不直接使用sessionStorage,localStorage
使用公用方法，使用办法如下：
```javascript
function setKeyItem(key,value) {
    if (window.sessionStorage){
      sessionStorage.setItem(key,value);
    }else{
      setCookie(key,value,TimeoutCookie)
    }
}
```

#### 7、“JSON”未定义
引入json2.js
注：本模板已经引入
下载地址：https://github.com/douglascrockford/JSON-js

#### 8、IE跨域下出现{"readyState":0,"status":0,"TypeError"...}
IE下jquery进行跨域请求需要两步：
a,引入jquery.placeholder.min.js
b,浏览器 工具->Internet选项->安全->自定义级别->其他->通过域访问数据源->启用

#### 9、透明度兼容性：
a、使用rgba背景色做透明的：
背景色变成：background: #000 \9;
再加IE9及以下的透明度设置方法
```css
opacity=80
-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
```
b、直接使用opacity设置透明度的
添加IE9及以下的透明度设置方法
```css
opacity=80
-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
```

#### 10、输入框垂直居中问题
将line-height设置成和height一样 即可,如：
```css
innput.txt{
  height: 36px;
  line-height: 36px;
}
```

#### 11、布局错位问题:
a、没有清除浮动的清除浮动即可,如：
html:
```javascript
<div class="parent clear">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
```
css:
```css
.clear{
  overflow: hidden;
  *zoom:1;
}
.parent .child{
  float: left;
}
```

#### 12、css伪类问题：
将用伪类实现的效果换成其他实现方式；
  主要是针对IE7内核，如果不用兼容IE7内核，则不用处理此类问题。

#### 13、ul元素中li 两端顶头，间距均等问题：
li使用float为left，加上margin-left,
然后ul同时也加上margin-left，其值使用与li相对应的负值,如：
html:
```javascript
<ul class="parent">
  <li class="child">测试</li>
  <li class="child">测试</li>
  <li class="child">测试</li>
  <li class="child">测试</li>
</ul>
```
```css
css:
.parent{
  width 1200px;
  margin-left: -20px;
  *zoom:1;
}
.parent .child{
  width 280px;
  height:400px;
  margin-left: 20px;
}
```

   ### <a name="reference">&sect; 参考</a>
* [npmjs](https://www.npmjs.com/)
* [gulpjs](http://www.gulpjs.com.cn/)
* [babel](https://babeljs.cn/)





