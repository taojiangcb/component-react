# react 组件单元测试

出了 e to e 测试外，还有组件业单元测试提供的方式和方法

- jest  单元测试桩组要的核心组件
- @testing-library/react  jest 专门为 react 提供的测试库
  - 常用 import { render, RenderResult, fireEvent } from '@testing-library/react';
- @testing-library/jest-dom jest 专门为 dom 提供的测试库
- @testing-library/jest-dom/extend-expect jest 专门为 dom 提供的测试断言库
  - import '@testing-library/jest-dom/extend-expect';  必须要引入扩展，否则dom 断言就会有问题
  
以上每个库都是必要的组合使用