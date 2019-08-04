🌟 本项目会持续更新 Webpack 优化配置，欢迎持续关注，每次更新内容会写在 README 里面。

- ## 2019.08.04 使用`cache-loader`来对 loader 的处理结果进行缓存

- ## 2019.01.28 使用`webpack-bundle-analyzer`来分析包的使用情况

- ## 2018.10.15 使用`babel-plugin-transform-react-remove-prop-types`来移除构建版本的`props`设置

- ## 2018.9.25 修复`react-loadable`无法使用BUG

- 添加使用 `@babel/plugin-syntax-dynamic-import`

- ## 2018.9.4 加入`react-loadable`
  使用`react-loadable`来延缓和动态加载一些不那么重要的 React 组件。

```js
import Loading from "./src/components/Loading";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

const LoadableApp = Loadable({
  loader: () => import("./src/App"),
  loading: Loading
});

ReactDOM.render(<LoadableApp/>, document.querySelector("#root"));
```
