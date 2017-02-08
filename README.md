# 目录

<link rel="stylesheet" href="http://yandex.st/highlightjs/6.2/styles/googlecode.min.css">
 
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script src="http://yandex.st/highlightjs/6.2/highlight.min.js"></script>
 
<script>hljs.initHighlightingOnLoad();</script>

<script type="text/javascript">
    $(document).ready(function () {
        $("h2,h3,h4,h5,h6").each(function (i, item) {
            var tag = $(item).get(0).localName;
            // 设置每个Item的ID
            $(item).attr("id", "wow" + i);

            // 添加锚点，同时设置class值
            var result = calLevel(tag);
            $("#category").append('<a class="new' + tag + '" href="#wow' + i + '">' + result + ' ' + $(this).text() + '</a></br>');

			var newName = result + ' ' + $(this).text();
			$(this).text(newName)

            // 设置样式
            $(".newh2").css("margin-left", 0);
            $(".newh3").css("margin-left", 20);
            $(".newh4").css("margin-left", 40);
            $(".newh5").css("margin-left", 60);
            $(".newh6").css("margin-left", 80);
        });
    });

    var lastLevel = 'h2'; // 记录上一个Level
    var level = 1; // 层级 假设H2为第1级
    var objLevel = {}; // 记录所有层级数量，二维数组

    // 计算标签层级
    function calLevel(currLevel) {
        // 跨层级Level 如：h2 > h4
        var l = Number(lastLevel[1]);
        var c = Number(currLevel[1]);
        level = level - (l - c);
        if (lastLevel < currLevel) {
            // 往下走要清零一次,否则会拿以前的数字进行累加
            objLevel[level] = 0;
        }

        lastLevel = currLevel;
        return calCount();
    }

    // 计算每个层级的数量
    function calCount() {
        var tempCount = (objLevel[level] == null ? 0 : objLevel[level]);
        objLevel[level] = tempCount + 1;
        return getLevel(level);
    }

    // 获取每个item在当前的位置
    function getLevel(level) {
        if (objLevel[level] == undefined)
            return null;
        var temp = getLevel(level - 1);
        if (temp == null)
            return objLevel[level];
        return temp + "." + objLevel[level];
    }
</script>
<!-- html标签-->
<div id="category"></div>

# mywebapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 开发记录

### 添加模块

#### 路由管理 vue-router

[vue-router](https://github.com/vuejs/vue-router/tree/next) next分支

[vue-router 2文档](https://github.com/vuejs/vue-router/blob/next/docs/en/SUMMARY.md)

router2.0 改变了一些API


#### 状态管理 vuex 

<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/vuejs/vuex/master/docs/en/vuex.png">
</p>

数据流方向：
this.$store.dispatch('actions') -> Actions
state.commit() -> mutations
getters

[vuex](https://github.com/vuejs/vuex)

[vuex-next分支文档](http://vuex.vuejs.org/zh-cn/getting-started.html)

##### Issues

##### Action时间传递数据

在`mapActions`到`Vue`对象上后，调用actions方法,正确的姿势

```
this.setMenuActive(1) 
// 类似于
this.$store.state.dispatch('setMenuActive', 1);
```
第一种传递是没有问题，会正确的传递参数。
```
this.setMenuActive(this.$store.state, 1)
```
如果用第二种，就好坑，actions里面对应的方法获取到的是一个对象。具体不知道为什么。怀疑是默认给第一个加了参数，如果我传了之后就参数就被挤到后面了,这样就画蛇添足了。

#### vuex-router-sync

[vuex-router-sync](https://github.com/vuejs/vuex-router-sync#how-does-it-work)

用途

* It adds a route module into the store, which contains the state representing the current route:

	```
	store.state.route.path   // current path (string)
	store.state.route.params // current params (object)
	store.state.route.query  // current query (object)
	```
* When the router navigates to a new route, the store's state is updated.
* store.state.route is immutable, because it is derived state from the URL, which is the source of truth. You should not attempt to trigger navigations by mutating the route object. Instead, just call $router.go(). Note that you can do $router.go({ query: {...}}) to update the query string on the current path.

#### 国际化 vue-i18n

[vue-i18n](https://github.com/kazupon/vue-i18n/) 处理国家化

```
npm install vue-i18n --save-dev
```

一般使用： 

* 最简单的场景就是直接显示为元素内容

	```
	home 这里应用的是配置文件中的值
	// 方式一
	<div>
		{{ $('home') }}
	</div>
	
	// 方式二
	<p v-text="$t('home')"></p>
	```
* 通过配置文件赋值
	
	```
	<div>
		{{ $(text) }}
	</div>
	...
	text: 'home'
	
	```

说明：如果设置的home对应有值，则取配置的值，如果没有则直接显示`home`。



#### webpack-zepote

vue-resource 不支持2.0，只能用zepote代替

#### vue-touch2.0

This is a directive wrapper for Hammer.js 2.0.

[vue-touch2.0](https://github.com/vuejs/vue-touch/tree/next)

#### Vue-ChartJs

图形库

[Vue-ChartJs](https://github.com/apertureless/vue-chartjs/tree/next)

```
npm install vue-chartjs@next
```

### 添加loader

#### 添加Sass

[Sass](https://github.com/jtangelder/sass-loader) 加载通过require方式加载css文件

```
npm install sass-loader node-sass webpack --save-dev
```

### 添加plugin

#### 添加copy-webpack-plugin

[copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin) i18n的文件不能做压缩，直接复制就可以了。

```
npm install --save-dev copy-webpack-plugin
```

在`webpack.base.conf.js`加入plugin配置,在文件头部引入插件

```
var CopyWebpackPlugin = require('copy-webpack-plugin');
```
在`module`结构中加入`plugin`，配置复制的起始路径和目标路径

```
module: {

	...

    plugins: [
      new CopyWebpackPlugin([{
        from: './src/i18n',
        to: './static/i18n'
      }], {
        copyUnmodified: true
      }),
    ]
}
```

### API

#### indexdb 数据库

* [简单使用](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB#.E4.BB.8E.E6.95.B0.E6.8D.AE.E5.BA.93.E4.B8.AD.E5.88.A0.E9.99.A4.E6.95.B0.E6.8D.AE)
* [API文档](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor/delete)

##### 数据库表创建

```
// indexdb name
export const DEVICE = 'devices'
export const I18N = 'i18n'

const openDB = function (storeName, callback) {
  let version = 1
  let dbName = 'ckr'

  // 保存数据库
  let indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  if (indexdb) {
    let openRequest = indexdb.open(dbName, version)

    openRequest.onupgradeneeded = function (e) {
      var thisDB = e.target.result
      if (!thisDB.objectStoreNames.contains(storeName)) {
        let keyPath = {}
        if (storeName === DEVICE) {
          keyPath = {keyPath: 'devID'} // 创建用户设备相关的表
        } else if (storeName === I18N) {
          keyPath = {keyPath: 'lang'} // 创建国家化相关的表
        }
        thisDB.createObjectStore(storeName, keyPath)
      }
    }

    openRequest.onsuccess = function (e) {
      console.log('open success!')
      let db = e.target.result
      callback(db)
    }

    openRequest.onerror = function (e) {
      console.log('open error!')
      console.dir(e)
    }
  }
}
```


##### 增加 add

添加数据可以用以下两种方式

* `add` 如果存在则不执行更新操作
* `put` 如果存在则更新，不存在则添加

```
const insertData = function (storeName, data) {
  openDB(storeName, function (db) {
    let transaction = db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    if (data instanceof Object) {
      console.log('insert Object')
      store.put(data)
    } else if (data instanceof Array) {
      window.$.each(data, function (single) {
        console.log('insert Array')
        store.put(single)
      })
    }
  })
}
```

### CSS 填坑

#### 动画

##### transition

类似于差之器，用于平滑的去改变属性值

```
transition: .22s all ease; // 所有属性平滑改变

transition: background-color 0.3s ease; // 指定背景色平滑改变
```

##### transform

类似android的补间动画，包括缩放（scale）、平移（translate）、旋转（rotate）、拉伸（skew）

```
transform: translate3d(50%, 0, 0); // 3D平移动画 x,y,z
```

## ERROR

蛋疼的一些错误提示，但是又不影响运行。看着好烦,先记录

1. vue-i18n.common.js?2c49:26[vue-i18n] Cannot translate the value of keypath "homepage.chat". Use the value of keypath as default
2. vue.js?3de6:2643[Vue warn]: Failed to resolve directive: likn 
(found in anonymous component - use the "name" option for better debugging messages.)  ---> 这个是需要给每个component的name属性赋值。（已解决）


## Webstorm 

[Webstorm 模板设置API](https://www.jetbrains.com/help/webstorm/2016.2/file-and-code-templates-2.html)