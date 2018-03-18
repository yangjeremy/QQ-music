# QQ-Music-1.0
### 未见API记录
1. imgs = imgs.filter(img => img.classList.contains('lazyLoad'))

2. window.addEventListener('scroll', onscroll)
   window.dispatchEvent(new Event('scroll')) 

3. window.removeEventListener

4. let { left, top, bottom, right } = img.getBoundingClientRect()[相对浏览器的位置]

5. fetch('/json/_rec.json').then(res =>res.json())
        .then(render)
- 类似ajax，会返回一个promise对象~不同于jQuery的是需要用.json把res  json.parse()一下（jq会自动把JSON字符串转换成对象）

6. foreach map 

7. call bind apply的这些用法需要掌握

8. target.parentElement.children

9. navigator.userAgent//获取用户设备

10. 字符串前写加好变成数字（）

11. encodeURI 和 decodeURI 函数操作的是完整的 URI；这俩函数假定 URI 中的任何保留字符都有特殊意义，所有不会编码它们。

encodeURIComponent 和 decodeURIComponent 函数操作的是组成 URI 的个别组件；这俩函数假定任何保留字符都代表普通文本，所以必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。

12. insertAdjacentHTML【新接口认识】

13. keyup 和key的关系   【keyup】

14. innerHTML=用法

15. 能够转化为false的表达式
null；
NaN；
0；
空字符串（""）；
undefined。


16. pageYOffset[滚动高度] 和document.documentElement.scrollTop   以及scrollY【是其别名】 类似
 + document.documentElement.clientHeight【高度】 > document.body.scrollHeight【元素内容文档高度】

17. offsetTop  此属性可以获取元素的上外缘距离最近采用定位父元素内壁的距离，如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。



 var c = 'dakjdakldachendakjdalkjalyang'
 c.replace(/(chen)|(yang)/g,$`)


 17. height : calc(100vh - 84px);

 18. target.matches('.play-icon')

 19. handleEvent addEventListener

 20.  new Image();

 21. pointer-events:none;点击不触发时间【穿透】

 22. &::-webkit-scrollbar {
      display: none
    }

23. webpack -p压缩

24. $ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

$ webpack --watch   //监听变动并自动打包

$ webpack -p    //压缩混淆脚本，这个非常非常重要！

$ webpack -d   //生成map映射文件，告知哪些模块被最终打包到哪里了


25.   bootstrap列需要用行包裹~【row】
    栅格系统优先使用最小尺寸
