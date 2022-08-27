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

## 自定义hook示例
根据参考链接2，要求每次修改数据都需要对另外一些对象做出同步操作，这种场景都能用“自定义hook”。看上去最有用的例子，自然是`useLocalStorage`了。

示例的测试分两个方面：
1. 点击按钮后`localStorage`正确变化。
2. 刷新后`localStorage`值回到初始值。

问题：`localStorage.setItem`是同步的且线程不安全，导致我们不能立刻读到新的值。

目前是用`await`随便处理一下，自测看上去没问题但感觉非常不对。

## 为什么useEffect要返回一个清理函数（React Hooks的闭包陷阱）
根据参考链接3：
1. 假如`useEffect`忘记加对应变量的依赖，则不会重新执行`useEffect`的callback，事件监听器还是原来的，所以就会访问旧值的闭包（现有的事件监听器只能访问旧值的闭包）。加上依赖以后事件监听器才会变，才能访问新值。
2. 但是原有的事件监听器是不会自己消失的。所以我们的`useEffect`要返回一个callback，让框架帮我们把旧的事件监听器去掉，再产生新的。

## Todo List
经过思考，把改变父组件状态的函数传给子组件来调用，是最佳方案。

我们删除待办事项前想弹出确认框，有这样一段代码：

```typescript
try {
  await new Promise<void>((resolve, reject) => Modal.confirm({
    title: `确认删除待办事项"${todos[index].text}"嘛QAQ`,
    icon: <ExclamationCircleOutlined />,
    content: '',
    okText: '残忍删除',
    okType: 'danger',
    cancelText: '我再想想',
    onOk: () => resolve(),
    onCancel: () => reject()
  }));
} catch (e) {
  return;
}
```

如果不提供`onCancel`参数，我们在Chrome中用`queryObjects(Promise)`查看页面所有的`Promise`状态，会发现`pending`的`Promise`越来越多。因此我们需要用这种比较麻烦的写法。

## 参考链接
1. https://create-react-app.dev/docs/adding-typescript/
2. 自定义hook示例：https://juejin.cn/post/7112379023761604616
3. React Hooks的闭包陷阱：https://juejin.cn/post/7093699777556119565
