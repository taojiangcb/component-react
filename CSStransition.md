# React Transition Group
这个组件有三个状态来维系每个状态的 classname
- *entry 动画开始的时候,初始化时的时候
- *active 动画开始播放的时候 可以设置动画播放的最终值
- *end  动画结束的时候 设置动画的结束态

例如:
```
// 定义 css 的function
@mixin zoom-animation(
  $direction: 'top',
  $scaleStart: scaleY(0),
  $scaleEnd: scaleY(1),
  $origin: center top,
) {
  //初始化的时候
  .zoom-in-#{$direction}-enter {
    opacity: 0;
    transform: $scaleStart;
  }
  //动画激活的时候
  .zoom-in-#{$direction}-enter-active {
    opacity: 1;
    transform: $scaleEnd;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin
  }
  //退出动画时触发
  .zoom-in-#{$direction}-exit {
    opacity: 1;
  }
  //退出动画是激活
  .zoom-in-#{$direction}-exit-active {
    opacity: 0;
    transform: $scaleStart;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin;
  }
}

@include zoom-animation('top', scaleY(0), scaleY(1), center top);
@include zoom-animation('left', scale(.45, .45), scale(1, 1), top left);
@include zoom-animation('right', scale(.45, .45), scale(1, 1), top right);
@include zoom-animation('bottom', scaleY(0), scaleY(1),  center bottom);

```

有三个组件
 - Transition
 - CssTransition
 - TransitionGroup
  