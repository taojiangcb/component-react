# StoryBook 使用指南

storybook 是一个开源工具，用于独立开发React Vue 和 Angular 的组件库，它能有组织和高效的输出UI组件展示。

### 基本用法

- 安装依赖

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

### 添加 .storybook 文件夹
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
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
```
- 运行看效果
```
npm run storybook
```
