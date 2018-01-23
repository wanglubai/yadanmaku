# yadanmaku

动画css transform实现

初始化
```javascript
 var danmaku = new YaDanmaku();
    danmaku.init({
      'parent': document.getElementById('view'),
      'gapH': 40
 });
```
 
添加
```javascript
  danmaku.play({
      'msg': '<font color="#666666">asas</font>'
  });
  danmaku.play({
     'msg': '<font color="#ff0000">asas</font>',
     'class': 'type2'
  });
```
  
msg支持html标签
可向单条弹幕添加class，内部并没有封装太多style，主要由自己添加class实现 
  
