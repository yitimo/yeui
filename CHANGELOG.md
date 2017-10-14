## 1.6.1 （2017-10-14）
### Fix
* dialog body display fixed

## 1.6.0 （2017-10-14）
### Fix
*nothing*
### Refactoring
* Refactor yup module under material2's code style
### Features
* use of popups more like materials's way
* use dialog() alert() load() toast() to call default templates of popups
### Breaking Changes
* audio module will no more update here and move to a new lib

<hr />

## 1.5.1 (2017-09-14)
### Fix
* update exports classes, remove unused some
### Refactoring
* refactor default popups(alert, dialog, toast, loader)
* seems a little more like material2 dialog creating
### Features
* now yup can use open() method to create a custom angular component and add it at the end of the body tag
### Breaking Changes
* now yup module no more need to add a \<yup\> tag, the popup dom will be added to the end of body tag

<hr />

## 1.4.2 (2017-09-13)
### Fix
* fix peerDependencies, remove package for Material2
* fix css class name in input/button component to avoid reflection
### Refactoring
*nothing*
### Features
* add weui-style button component
### Breaking Changes
* not add Material2 component anymore, will soon build a new package

<hr />

## 1.4.0 (2017-09-04)
### Fix
*nothing*
### Refactoring
*nothing*
### Features
* add weui-style button component
### Breaking Changes
* not add Material2 component anymore, will soon build a new package