# 指南
## 安装
```sh
npm install --save vue-colrow
```
[通过script标签引入](#通过script标签引入)
## 导入
```js
import { Row, Col, BreakRow, config} from 'vue-colrow'
import 'vue-colrow/dist/vue-colrow.css'

// 注册全局组件. 也可不作全局组件使用.
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('BreakRow', BreakRow)

// 全局修改默认横向gutter(沟槽, 列间距)
config.DEFAULT_GUTTER_X = 20
```
Row是行组件, Col是列组件, BreakRow是断行组件. config是[全局配置对象](api.md#config), 可以修改它的属性. Col, BreakRow必须放在Row里面, Row的直接子级只能是Col和BreakRow. Col的直接子级是你的自定义内容, 可以是Row. 嵌套的Row相互独立, 不会互相通信.
```html
<Row>
  <Col>自定义内容</Col>
  <BreakRow />
</Row>
```

## 列宽
Col的prop `width`可以传入数字, 大于1的数字被认为是指定长度像素, 小于等于1的数字被认为是百分比, 所以1代表百分之百. 未传入则默认1, 代表全宽. 可以传入非数字, 这样会直接传给css width, 不过这种情况下需要你自己调整, 本项目不处理.

## 自动增长
Col的prop `grow`是boolean, number类型, 将传给`flex-grow`. 如果宽度未指定, 则宽度将被设置成2像素, 这是为了让列不要增长到超过剩余空间, 否则它将显示到下一行. 增长列占据该行剩余空间, 如果一行有两个增长列并且grow相等, 则平分剩余空间. 如果要让一列全部占据剩余空间, 后面的列排到下一行去, 可以在该列后放置`<BreakRow />`, 手动断行.

## gutter
gutter是指沟槽, 列间距, 分为水平间距, 垂直间距. Row的prop `gutter`可以传入数字, 数组. 数字被认为是水平间距和垂直间距相等. 长度为2的数字数组被认为水平间距, 垂直间距. 可以传入null, `:gutter="[null, 20]"`, 这样null会取全局配置中的默认值.

## 响应式
全局配置config.BREAK_POINTS是预设的临界点.
```
BREAK_POINTS: {
  xs: 544,
  sm: 768,
  md: 992,
  lg: 1200,
},
```
Row的prop `breakPoints`默认等于全局配置config.BREAK_POINTS. xs或xs前缀的prop只对屏幕小于xs的有效, sm或sm前缀的prop对屏幕大于xs的有效, 依次类推. Row的`gutter`的响应式替代为: xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY

Col的prop `width`的响应式替代为: xs, sm, md, lg, xl. `grow`的响应式替代为 xsGrow, smGrow, mdGrow, lgGrow, xlGrow.

BreakRow可以传入prop `xs`使其只只在屏幕低于xs时生效, 传入prop `sm`使其只在屏幕大于xs低于sm时生效, 依次类推. 有xs, sm, md, lg, xl

## css hack

### 计算精度
不同浏览器在css的计算上不一样, 一些浏览器通过百分比计算宽度后, 子元素加起来居然比父元素还要宽一点, 导致最后一列显示在下一行. 针对这一情况, 把每列的宽减了一点点(0.0npx). 因为新浏览器没有此bug, 所以目前只对node, Chrome, Firefox, Safari之外的浏览器进行了这一处理. 可以通过全局配置config.COL_WIDTH_REDUCE和Col prop `colWidthReduce`配置减去的宽度.

### overflow
实际上Row子元素的宽度和高度是超过Row的, 超出一个gutter长度的空白, Row使用负数的margin使后面的元素位置显示正确. 当Row的宽度接近屏幕宽时, Row子元素的宽度超过屏幕, 导致出现横向滚动条. 所以设置overflow隐藏掉超出部分. 

### js获取高度
Row子元素高度也是超出的, 使用负数的margin后, 后面的元素能显示在正确的位置. 但是超出的部分还是显示的, 用overflow也隐藏不掉. 所以通过js获取Row到正确高度并设置到Row上, 而且监听window的resize事件和使用MutationObserver监听DOM改变, 在改变时重新固定高度. 可以通过Row prop `heightCalculation` 或全局配置config.ROW_HEIGHT_CALCULATION 关闭此项.

## DEMO
### 响应式表单
下图左边有固定宽度的卡片, 右边占满剩余宽度. 表单有多个输入框, 根据类型长度不一. 为了直观, 使用分数表示列的宽度. 在小屏幕下, 输入框是全宽的, 用`:xs="1"`就行了.
![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form.png?raw=true)

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form-xs.png?raw=true)
```html
<Row>
  <Col :width="300"><Card1 /></Col>
  <Col grow :xs="1">
    <Row>
      <Col :width="1/3" :xs="1/2">
        <label>First Name</label><v-text-field solo></v-text-field>
      </Col>
      <Col :width="1/3" :xs="1/2">
        <label>Last Name</label><v-text-field solo></v-text-field>
      </Col>
      <Col :width="1/3" :xs="1">
        <label>Email</label><v-text-field solo></v-text-field>
      </Col>
      <Col :width="3/5" :xs="1">
        <label>Website</label><v-text-field solo></v-text-field>
      </Col>
      <Col :width="2/5" :xs="1">
        <label>Title</label><v-text-field solo></v-text-field>
      </Col>
      <Col>
        <label>About</label><v-textarea solo></v-textarea>
      </Col>
    </Row>
  </Col>
</Row>
```

### 卡片列表布局
这是常见的一种布局, n x n的卡片列表. 以前用css float + margin做, 需要计算卡片的宽度和精确去掉最后一列的margin. 通过本项目, 直接用分数直观的表示一行的卡片数量. 并且通过`xs`, `sm`, `md`等prop设置不同屏幕下卡片的宽度.
![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-list.png?raw=true)
```html
<Row>
  <Col :xl="1/5" :lg="1/4" :md="1/3" :sm="1/2" :xs="1" v-for="i in 23" :key="i+'card'"><Card1 /></Col>
</Row>
```

## 通过script标签引入
从github或npm下载最新版本, 引入dist/vue-colrow.js或dist/vue-colrow.min.js, dist/vue-colrow.css. 可以通过全部变量vueColrow访问库.
```html
<script src="yourpath/dist/vue-colrow.min.js" charset="utf-8"></script>
<link rel="stylesheet" href="yourpath/dist/vue-colrow.css">
<!-- usage -->
<script type="text/javascript">
  // 注册全局组件
  Vue.component('row2', vueColrow.Row)
  Vue.component('col2', vueColrow.Col)
  Vue.component('br2', vueColrow.BreakRow)
</script>
```