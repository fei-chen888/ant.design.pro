![Image text](src/assets/redux.png)
# 什么是Redux？
Redux官方文档对Redux的定义如下：

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。Redux基于简化版本的Flux框架，Flux是Facebook开发的一个框架。在标准的MVC框架中，数据可以在UI组件和存储之间双向流动，而Redux严格限制了数据只能在一个方向上流动。 见下图：

![Image text](src/assets/store.png)

# 为什么我们需要Redux？

随着应用程序变得越来越复杂，越来越多的组件使用一个框架来管理这个可能变得非常棘手，组件结构如下图

![Image text](src/assets/1.jpg)

数据传递图

![Image text](src/assets/1.gif)

在React中，不鼓励两个不具有父子级关系的组件之间的通信。 React建议，如果你必须这样做，你可以按照Flux的模式建立你的全局事件系统 - 这就是需要Redux的地方。

在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。借助Redux，您可以在store中保留所有应用程序状态。如果组件A中发生状态更改，则会将其中继成到store，并且需要注意组件A中状态更改的其他组件B和C可以读取store数据：

![Image text](src/assets/2.jpg)

数据传递图

![Image text](src/assets/2.gif)

组件A将其状态更改发送到store，如果组件B和C需要此状态更改，则可以从store中获取它。因此，我们的数据流逻辑是无缝的。除了上面这些功能之外，使用Redux还有很多好处，最重要的三点：

结果的可预测性--只有一个真实的来源（store），当你将你的当前状态与应用程序的actions和其他部分同步时不会出什么问题。

可维护性--Redux对应该如何组织代码有严格的指导原则;这进一步确保了可预测的结果，使代码更容易维护。

易于测试--在Redux中编写代码涉及到与编写可测试代码的黄金规则相关的纯函数。

# 基础概念

## Action

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

## Reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

## Store

Store 就是把它们联系到一起的对象。Store 有以下职责：

1､维持应用的 state；

2､提供 getState() 方法获取 state；

3､提供 dispatch(action) 方法更新 state；

4､通过 subscribe(listener) 注册监听器;

5､通过 subscribe(listener) 返回的函数注销监听器。

重点：Redux 应用只有一个单一的 store，当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。

# 三大原则

* 单一数据源，整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
* State 是只读的，唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
* 使用纯函数来执行修改，Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

# API

## &lt;Provider store&gt;

<Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法。

## createStore

创建一个 Redux store 来以存放应用中所有的 state。

应用中应有且仅有一个 store。

## connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

连接 React 组件与 Redux store（参数请查阅官方文档）。

## Store

getState()

返回应用当前的 state 树。

dispatch(action)

分发 action。这是触发 state 变化的惟一途径。

subscribe(listener)

添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。
这是一个底层 API。多数情况下，你不会直接使用它

## combineReducers(reducers)

## bindActionCreators(actionCreators, dispatch)

## compose(...functions)

把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法

## applyMiddleware(...middlewares)

# 异步 Action

* 使用Middleware（redux-thunk、redux-saga、redux-promise、redux-promise-middleware等）让dispatch支持promise

# redux-devtools工具

![Image text](src/assets/3.png)