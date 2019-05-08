# SRC目录结构与规范 #

## 目录结构

> assets -- 静态资源文件
> > Images -- 图片资源
> 
> components -- 组件
>
> decorator -- 装饰器
> 
> dynamicLoad -- 动态加载页面，提供给路由引用
> 
> globalCss -- 全局样式，例如：antd主题定制、reset等
> 
> models -- typeScript类型定义目录
> 
> routes -- 路由配置
>
> services -- 接口业务层
> 
> static -- 第三方库
>
> utils -- 工具类
> 
> index.tsx -- entry 文件
> 
> registerServiceWorker.ts

## 目录规范

一级目录、文件名称首字母小写，其他首字母需大写，且不能名称为index；

# 组件规范 #

## 原则 ##
* 1、具有重用性；
* 2、能够降低业务复杂度；

## 规范 ##
* 1、组件继承AbstractComponent类，并设置displayName与getRenderContent，不可覆盖render；
* 2、请求接口时，使用async/await，并调用this.showLoading()，请求完成后调用this.hidenLoading();
* 3、类中方法需要Try...Catch的时候，可使用methodTryCatchDecorator装饰器自动处理捕捉，详细请查看methodTryCatchDecorator的实现；
* 4、组件样式文件存放在组件当前目录下，并采用CSS MODULES式引入；
* 5、组件属性、状态必需定义好typeScript类型，不可使用any；
* 6、选择类组件返回数据必需是对象数据，不可简单的返回id；

# 页面规范 #

## 原则 ##
* 1、使用组件组装页面；
* 2、无法组件化部份，则在页面中实现；
* 3、列表类页面需使用redux实现；

## 规范 ##
* 1、页面继承AbstractPage类，类名为“XXXPage”，并设置displayName与getRenderContent，不可覆盖render；
* 2、请求接口时，使用async/await，并调用this.showLoading()，请求完成后调用this.hidenLoading();
* 3、类中方法需要Try...Catch的时候，可使用methodTryCatchDecorator装饰器自动处理捕捉，详细请查看methodTryCatchDecorator的实现；
* 4、页面样式文件存放在组件当前目录下，并采用CSS MODULES式引入；
* 5、页面类必需是export default；

# 路由规范 #
* 1、路由配置在routes/Config/RouterConfig.tsx，路由对应的component，不可直接引用页面，只能引用dynamicLoad中的实现

# 按需加载规范 #

## 原则 ##
* 1、按页面分包

## 规范 ##
* 1、按路由名称创建对应的目录；
* 2、使用react-loadable与webpack import（webpackChunkName使用pages/页面名称）实现对页面的动态加载，并以Async+页面名称导出；

# 接口业务层规范 #
* 1、按功能模块划分实现，存放于services，采用namespace的方式导出，例如：export namespace UserApi；
* 2、接口业务的实现必需是return Promise；
* 3、接口的入参，返回必需定义好typeScript类型，不可使用any；

# 工具类规范 #
* 1、常量以{key: value}的型式写到constants.ts中，例如：REQUEST_CODE = {200: '服务器成功返回请求的数据。', 201: '服务器成功返回请求的数据。'}
