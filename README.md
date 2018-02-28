# yadanmaku

动画css transition实现

初始化
```javascript
 var danmaku = new YaDanmaku();
    /*
    parent 容器
    line_height 每行所占行高
    max_layer 弹幕层数
    max_num 弹幕队列最大值，超过这个值抛掉弹幕
    */
  danmaku.init({
      'parent': document.getElementById('view'),
      'gapH': 40
 });
```

```javascript
  //参数1 弹幕在弹幕容器起始行位置比例 
  //参数2 弹幕在弹幕容器结束行位置比例
  //库中并没有设置 弹幕全屏 半屏 顶部等类型 ，可通过设置比例实现 0-1 
  danmaku.setRatio(0, 1);
```


添加
```javascript
  /*
    msg 所显示内容支持dom和文本
    class 在当前弹幕容器上追加class属性
  */
  danmaku.play({
      'msg': '<font color="#666666">asas</font>'
  });
  danmaku.play({
     'msg': '<img src="http://img2.plures.net/users/avatar/073/348/663/73348663/536d36272e86beb01a4222be5f0d041f.jpg" style="width:20px;height:20px"><font color="#ff0000">asas</font>',
     'class': 'type2'
  });
```

[demo](http://player.plures.net/test/ws/index.html)
  
msg支持html标签
可向单条弹幕添加class，内部并没有封装太多style，主要由自己添加class实现 
  
