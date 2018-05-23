# vue-smart-layout-assistant

> Vue smart layout component - [demo](https://codepen.io/phphe/pen/KREQXa)

## install
```sh
npm install vue-smart-layout-assistant
```
```js
import {Row, Col} from 'vue-smart-layout-assistant'
import 'vue-smart-layout-assistant/dist/vue-smart-layout-assistant.css'
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
</Row>
```
## break row
It can auto break row by width. You can break row manually with <br />
## api
### Row props
```js
gutter: {default: 16, type: [Number, Array]} // unit: px. You can specify the column spacing for the x and y axes by ayyay([x, y])
```
### Row methods
```js
update() // when window size changed, it will auto update. Sometimes you need to call it manually.
```
### Row slot
```js
default // only one slot. The slot children can only be Col and br
```
### Col props
```js
width: {default: 0.1, type: Number}, // when width less than or equal to 1, it will be consider as percentage, or px width
fixed: {default: false}, // fixed col won't grow to fill rest space
grow: {}, // grow priority, the left columns have higher priority; 扩展的优先级, 靠前的更优先
sameWidth: {}, // cols with same value will be set same width
// same to width. responsive
xs: {type: Number},
sm: {type: Number},
md: {type: Number},
lg: {type: Number},
```
