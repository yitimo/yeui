# yeui
include weui and more under angular

[NPM | v1.1.8](https://www.npmjs.com/package/yeui/)

## 概况
个人学习 [weui](https://github.com/Tencent/weui.js) 、 [vux](https://vux.li/#/) 后将weui的风格整合到angular中得到的UI框架，除此之外还整合了自己开发过程中感觉比较通用及常用的UI组件。
## 使用
    npm install --save yeui
## YUP
yeui中的弹出式消息组件(yup == yeui + popup)
1. 在跟模块中引入

        import { YUPModule } from 'yeui';
        @NgModule({
            import: [YUPModule]
        })
        export class AppModule {}
2. 在跟组建中添加yup组件（即将改用第二路由方式）

        <yup></yup>

3. 页面中引入YUPService

        import { YUPService } from 'yeui';
        constructor(
            private yup: YUPService
        ) {
            yup.Alert({msg: 'hello yeui!'});
        }

## Yudio
yeui中的音频能力(使用HTML5进行音频的列表管理和播放控制)

## YIN
不需要像YUP那样引入一个组件(<yup></yup>)或是引入第二路由，在模块中直接引入YINModule后便可使用的一系列通用组件、指令、管道。

## 现有问题
原本发布到npm时选择忽略掉.ts源文件(只发布.d.ts、.js、.js.map)，这会导致AOT编译时找不到模块，暂时将.ts文件一起发布。
找到解决办法后将重新移除.ts源文件的发布。