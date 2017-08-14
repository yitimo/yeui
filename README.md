# yeui [![NPM version][npm-image]][npm-url]
include weui and more under angular

## 概况
个人学习 [weui](https://github.com/Tencent/weui.js) 、 [vux](https://vux.li/#/) 后将weui的风格整合到angular中得到的UI框架，除此之外还整合了自己开发过程中感觉比较通用及常用的UI组件。
## 使用
    npm install --save yeui
## YUP (yeui.popup)
yeui中的弹出式消息组件
1. 在跟模块中引入

        import { YUPModule } from 'yeui';
        @NgModule({
            import: [YUPModule]
        })
        export class AppModule {}
2. 在根组件中添加yup组件

        <yup></yup>

3. 页面中引入YUPService

        import { YUPService } from 'yeui';
        constructor(
            private yup: YUPService
        ) {
            yup.Alert({msg: 'hello yeui!'});
        }

## Yudio (yeui.audio)
yeui中的音频能力(使用HTML5进行音频的列表管理和播放控制)
1. 音频服务(AudioService)

    如只想使用音频服务(仅列表和播放控制)只需在自己项目的根模块(AppModule)或CoreModule的providers数组中声明AudioService即可。
2. 音频模块(AudioModule)

    音频服务(AudioService)并不是在音频模块中声明，因为音频模块中包含可重用组件、指令、管道等，所以一般将音频模块引入到ShareModule中，而音频服务(AudioService)只能在根模块声明一次。

## YIN (yeui.inner)
不需要像YUP那样引入一个组件 (yup) 或是引入第二路由，在模块中直接引入YINModule后便可使用的一系列通用组件、指令、管道，一般在ShareModule中引入。
