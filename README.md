[toc]

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

根据参考链接1：
```
npx create-react-app react-hooks-demo --template typescript
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 无eject配置less
```
npm install antd -S
// npm install craco-antd，不需要下这个
npm install @craco/craco craco-less babel-plugin-import -D
```
接下来创建`craco.config.js`，内容如下：
```js
const CracoLessPlugin = require('craco-less'); // 必须用 require 导入，实测 import 不行

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1cacf4' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
```

接着改`package.json`
```json
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

接着在`react-app-env.d.ts`里加上声明（避免报错）
```ts
declare module '*.less' {
    const content: {[className: string]: string};
    export default content;
}
```

然后创建`Home.module.less`，最后在组件里：
```ts
import styles from './Home.module.less';
className={styles.xxx}
```

注意：**不需要做其他特殊的配置**

## 菜单栏、面包屑路由跟随
监听路由变化，vue3用`watch`，react则用`useEffect`的第二个参数来实现。
```js
const location = useLocation()
useEffect(() => {}, [location])
```

和vue3不同的是，面包屑需要用itemRender函数来自定义面包屑dom，因为链接需要直接取route.path，而非paths.join('/')。

菜单栏可以用antd官网提供的getMenuItem函数来避免直接书写冗长的对象字面量。

目前还是用在`App.tsx`里的`<NavLink>`来声明“有这么个链接”。

暂时没法像vue-router那样用name来区分路由，所以`@/router/index.ts`全部改成了用path来区分路由。代码逻辑几乎没有修改。

## 参考链接
1. https://create-react-app.dev/docs/adding-typescript/
