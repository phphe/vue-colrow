# vue-colrow
[Demo](https://codepen.io/phphe/pen/KREQXa)
> Components Col and Row are dedicated to layout normal and responsive web page easily.

> Renamed from vue-smart-layout-assistant

## install
```sh
npm install vue-colrow
```
```js
import {Row, Col} from 'vue-colrow'
import 'vue-colrow/dist/vue-colrow.css'
Vue.component('Row', Row)
Vue.component('Col', Col)
```
## usage
```html
<Row>
  <Col :width="500">
    <h2>main area</h2>
  </Col>
  <Col :width="300">
    <h2>right sidebar</h2>
  </Col>
  <Col width="1">
    <h2>100% width</h2>
  </Col>
  <Col width="1px">
    <h2>right sidebar</h2>
  </Col>
</Row>
```
## break row
It can auto break row by width. You can break row manually with:
```html
<br>
```
## api
### Row props
```js
gutter: {default: 16, type: [Number, Array]} // unit: px. You can specify the column spacing for the x and y axes by ayyay([x, y])
```
### Row methods
```js
update() // when window size changed, it will auto update. In other cases, you need to call it manually.
```
### Row events
```js
updated(vm)
```
### Row slot
```js
default // only one slot. The slot children can only be Col and br
```
### Col props
```js
width: {type: [Number, String, Function]},
/*
percentage example: :width="1" :width="0.5" :width="1/3" width="0.5"
px example: width="100" :width="200" width="300px" width="1px"
Function example: (rowWidth, restWidth) => 1 / parseInt(rowWidth / 300), // min width 300
 */
// same to width. responsive
xs: {type: [Number, String, Function]},
sm: {type: [Number, String, Function]},
md: {type: [Number, String, Function]},
lg: {type: [Number, String, Function]},
// one row has one grow col at most. if width not set, default value is 1 for a fixed col(no grow), 1px for a grow col
// if there already is a grow col in row, it will auto break before next grow col.
// you may need use `br` to break row.
grow: {},
```
### Important
Don't set margin, width, float, absolute or fixed position of a col.
