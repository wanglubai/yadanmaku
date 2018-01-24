# yadanmaku

动画css transition实现

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
     'msg': '<img src="http://img2.plures.net/users/avatar/073/348/663/73348663/536d36272e86beb01a4222be5f0d041f.jpg" style="width:20px;height:20px"><font color="#ff0000">asas</font>',
     'class': 'type2'
  });
```
  
msg支持html标签
可向单条弹幕添加class，内部并没有封装太多style，主要由自己添加class实现 
  
