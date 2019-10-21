# 项目名称：《宠多趣》商城项目

## 演示

* 官网：gttp://www.chongduoqu.com(最近几天好像在维护)

* 上线地址：

    * webapp地址:  http://116.62.209.91:1908/  用户名：herurui 密码：六个0

    * 后台管理系统地址:  http://116.62.209.91:1909   用户名：herurui 密码：六个2

## git仓库地址:
   * git@github.com:gzh51907/chongduoqu.git

## 团队与分工：

* 组长：何如锐、组员：周晓晖、陈俊兰

    ### 负责模块说明：

    * 何如锐：首页、个人页、详情页，购物车部分

    * 周晓晖：后台管理系统，后端接口编写，数据爬取，分类页，商品列表页，商品详情页，购物车页，注册页，登录页，个别页面修改，用户设置

    * 陈俊兰：无

## 项目目录说明：
* backstage文件夹:后台管理系统项目
    * node_modules ：项目依赖
    * src ：项目代码
        * assets：静态资源
            *imgs：图片文件
        * component：页面组件
            * goods：商品功能相关组件
            * list：订单功能相关组件
            * user：用户功能相关组件
        * pages:初始化页面组件
            * Login.vue:登录页面组件
            * Home.vue：首页组件
        * router ：路由配置文件
        * store ：vuex相关文件
    * pacskage.json：项目依赖配置

* server文件夹: 服务器接口目录
    * node_modules ：项目依赖
    * pacskage.json：项目依赖配置
    * src：项目代码
        * assets：静态资源
            * imgs：图片文件
        * db：数据库连接配置
            * mongo.js :mongodb连接配置及封装
            
        * pages:初始化页面组件
            * Login.vue:登录页面组件
            * Home.vue：首页组件
        * router ：路由配置文件及接口
            * goods.js 商品模块相关接口
            * user.js 用户模块相关接口
            * list.js 订单相关接口
        * tools ：工具函数封装

* webapp文件夹 :项目网站目录
    * node_modules ：项目依赖
    * pacskage.json：项目依赖配置
    * src：项目代码    
        * assets：静态资源
            * imgs：图片文件
        * pages：页面组件
            * Home.vue:首页组件
            * Category.vue 分类页组件
            * Cart.vue 购物车组件
            * Mine 个人页组件
            * Goods.vue：商品列表组件
            * Detail.vue：商品详情组件
            * Reg.vue：用户注册组件
            * Login.vue 用户登录组件
            * Arguement.vue 用户协议
            * Setter.vue 用户设置
        * App.vue:页面初始化组件
        * router ：路由配置文件
        * store ：vuex相关文件

## 项目说明：
* 《宠多趣》是一个使用vue开发的单页面应用，其本身是一个专门做宠物相关的电商网站，
    与传统电商网站无异，主页都售卖宠物相关的产品。

* 项目初期分工：一人负责后台管理系统、两人负责webapp页面，实际开发中因成员各种原
    因使得分工发送改变。

* 项目过程遇到的问题 团队成员在使用git的过程中有时候会产生冲突，期间需要通过
    沟通解决问题。

* 项目完成程度：大致功能相对完成，还有部分功能来不及实现，可能在样式方面会存在浏览器
    兼容的相关问题，部分功能bug有待修复




## 项目页面截图
