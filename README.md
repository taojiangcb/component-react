
# HTML
### GlobalEventHandlers
其实就是浏览器开放处理的全局 api 事件 经过业务整理构成了所谓的生命周期
 https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers

### 页面的生命周期
- DOMContentLoaded — 浏览器已经完全加载了HTML，DOM树已经构建完毕，但是像是 <img> 和样式表等外部资源可能并没有下载完毕。
- load — 浏览器已经加载了所有的资源（图像，样式表等）。
- beforeunload/unload -- 当用户离开页面的时候触发。

JS 会阻碍 dom 的构建 css 会阻塞js 的执行 所以可以利用 async 和defer

- 带有async的脚本是优先执行先加载完的脚本，他们在页面中的顺序并不影响他们执行的顺序。	
- 带有defer的脚本按照他们在页面中出现的顺序依次执行。

DOMContentLoaded
 - 带有async的脚本也许会在页面没有完全下载完之前就加载，这种情况会在脚本很小或本缓存，并且页面很大的情况下发生。
 - 带有defer的脚本会在页面加载和解析完毕后执行，刚好在DOMContentLoaded之前执行。
  
#### readyState
 document.readyState属性给了我们加载的信息，有三个可能的值：
  - loading 加载 - document仍在加载。
  - interactive 互动 - 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
  - complete - 文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

有一些情况我们无法确定页面上是否已经加载完毕，比如一个带有async的外部脚本的加载和执行是异步的（注：执行并不是异步的-_-）。在不同的网络状况下，脚本有可能是在页面加载完毕后执行也有可能是在页面加载完毕前执行，我们无法确定。所以我们需要知道页面加载的状况。

```
function work() { /*...*/ }
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}
```

每当文档的加载状态改变的时候就有一个readystatechange事件被触发，所以我们可以打印所有的状态。

```
// current state
console.log(document.readyState);
// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```
### 总结
 - 在 DOMContentLoaded 之后我没就可以通过 js 访问 dom 元素
 - 使用 async 和 defer 异步加载执行可以优化 html 的渲染效率 
 - document.readState 是当前状态，可以使用 readystatechange 中追踪页面的变化状态
# React
### React Transition Group （动画)
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
@include zoom-animation('bottom', scaleY(0), scaleY(1),  center botto
```

有三个组件
 - Transition
 - CssTransition
 - TransitionGroup

# TypeScript 
### Partial
Partial 作用是将传入的属性变为可选项. 首先我们需要理解两个关键字 keyof 和 in, keyof 可以用来取得一个对象接口的所有 key 值.

```
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
```

### Omit<T,K>   
目前的ts版本（3.2及以前）并没有内置Omit，那么Omit是什么呢？开始我对这个Omit也很好奇，在很多开源的实现里都能看到它的身影。Omit本身有省略和删除的意思，那在ts里这个Omit也很有可能有着相似的操作。查了一些资料之后，学习到，Omit确实是用来删除指定成员。




# 测试

### 单元测试
除了 e to e 测试外，还有组件业单元测试提供的方式和方法

- jest  单元测试桩组要的核心组件
- @testing-library/react  jest 专门为 react 提供的测试库
  - 常用 import { render, RenderResult, fireEvent } from '@testing-library/react';
- @testing-library/jest-dom jest 专门为 dom 提供的测试库
- @testing-library/jest-dom/extend-expect jest 专门为 dom 提供的测试断言库
  - import '@testing-library/jest-dom/extend-expect';  必须要引入扩展，否则dom 断言就会有问题
  
以上每个库都是必要的组合使用

### @testing-libary/test-dom 
一个测试库，扩展了一些断言的能力.

- setupTests.ts 测试的启动配置文件
  

# StoryBook 使用指南

storybook 是一个开源工具，用于独立开发React Vue 和 Angular 的组件库，它能有组织和高效的输出UI组件展示。

### 基本用法

#### 安装依赖

```
cnpm i @storybook/addon-actions -D
cnpm i @storybook/addon-info -D
cnpm i @storybook/addon-links -D
cnpm i @storybook/addons -D
cnpm i @storybook/react -D

npm i --save-dev @storybook/react
npm i --save react react-dom
npm i --save-dev @babel/core
npm i --save-dev babel-loader
```

#### .storybook 文件夹
- 新建脚本命令
.storybook/config.js
```
import {configure} from '@storybook/react';
function loadStories() {
  require('../stories/index.js);      //指定 story 位置
  //可以是任意目录，根据自己的需求写路径
}

configure(loadStories,module);
```

- 添加脚本命令到package.json
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook" // 指定配置文件目录为 .storybook
  }
}

- 支持typescript 
.storybook/webpack.config.js
```

module.exports = { config } => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      }
    ]
  })
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
}
```
- 添加 addons 文件
.storybook/addons.ts
```
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
```

- 在stories/index.js 写 story

```
import React from 'react';
import {storiesOf} form '@storybook/react';
import {Button} from '@storybook/react/demo';  //这里引入想要展示的组件

storiesOf('Button',module)
  .add('with test',()=>{
    <Button> Hello Button </Button>
  })
  .add('with some emoji', ()=> (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Butt
```
- 运行看效果
```
npm run storybook
```

### Stroybook addon插件系统介绍
#### Decorator

#### Action

# 生成文档
### react-docgen-typescript 
  