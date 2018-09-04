🌟 本项目会持续更新 Webpack 优化配置，欢迎持续关注，每次更新内容会写在 README 里面。

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

ReactDOM.render(LoadableApp, document.querySelector("#root"));
```
