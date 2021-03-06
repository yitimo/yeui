# yeui [![NPM version][npm-image]][npm-url]
include weui and more under angular

## 概况
I will edit it soon :)

## 使用
```
npm install --save yeui
```
or
```
yarn add yeui
```
## YUP (yeui.popup)
yeui中的弹出式消息组件，使用的是仿照 material2 的实现，动态创建angular组件
1. 在跟模块中引入

        import { YUPModule } from 'yeui';
        @NgModule({
            import: [YUPModule]
        })
        export class AppModule {}
2. 页面中引入Yup

        import { Yup } from 'yeui';
        constructor(
            private yup: Yup
        ) {
            yup.alert({body: 'hello yeui!'});
        }

## Yudio (yeui.audio)
yeui中的音频能力(使用HTML5进行音频的列表管理和播放控制)
1. 音频服务(AudioService)

    如只想使用音频服务(仅列表和播放控制)只需在自己项目的根模块(AppModule)或CoreModule的providers数组中声明AudioService即可。
2. 音频模块(AudioModule)

    音频服务(AudioService)并不是在音频模块中声明，因为音频模块中包含可重用组件、指令、管道等，所以一般将音频模块引入到ShareModule中，而音频服务(AudioService)只能在根模块声明一次。

## YIN (yeui.inner)
不需要像YUP那样引入一个组件 (yup) 或是引入第二路由，在模块中直接引入YINModule后便可使用的一系列通用组件、指令、管道，一般在ShareModule中引入。

### Input
```
<input ye-input type="" />
```

### Checkbox & Radio
```
<div ye-checkbox>
    <label ye-checkbox-option [(ngModel)]="" (change)="">value</label>
    <label ye-checkbox-option [(ngModel)]="" (change)="">value</label>
</div>

<div ye-radio [(ngModel)]="" (change)="">
    <label ye-radio-option [value]="0">none</label>
    <label ye-radio-option *ngFor="let item of list" [value]="item.id">{{item.value}}</label>
</div>
```

### Cell
```
<div ye-cells>
    <div cell>
        <div head>...</div>
        <div body>...</div>
        <div foot>...</div>
    </div>
</div>
```

### Button
```
<ye-button warn/primary/default>Button</ye-button>
<ye-button loading>Button</ye-button>
<ye-button mini>Button</ye-button>
<ye-button-plain warn/primary/default>Button</ye-button-plain>
<ye-button-plain loading>Button</ye-button-plain>
<ye-button-plain mini>Button</ye-button-plain>
```

[npm-image]: https://badge.fury.io/js/yeui.svg
[npm-url]: https://npmjs.org/package/yeui
