# API
## config
全局配置对象.
### DEFAULT_GUTTER_X
* type: number
* 默认值: 16
* 详细: 默认横向列间距
### DEFAULT_GUTTER_Y
* type: number
* 默认值: 16
* 详细: 默认纵向列间距
### COL_WIDTH_REDUCE
* type: number
* 默认值: 0.09
* 详细: 单位px. 稍稍减小列宽度以修正[css计算精度](guide.md#计算精度)问题.
### BREAK_POINTS
* type: object
* 详细: 响应式的屏幕断点
* 默认值:
  ```js
  {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  }
  ```
### ROW_HEIGHT_CALCULATION
* type: boolean
* 默认值: true
* 详细: 是否通过js固定Row高度. 参考[js获取高度](guide.md#js获取高度).

## Row
### gutter
* type: number|[number|null, number|null]
* 详细: 列间距
### heightCalculation
* type: boolean
* 详细: 是否通过js固定Row高度. 参考[js获取高度](guide.md#js获取高度).
### breakPoints
* 默认值: config.BREAK_POINTS
### 响应式props
xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY, 参考[响应式](guide.md#响应式).

## Col
### width
* type: Number|String
* 详细: [列宽](guide.md#列宽).
### grow
* type: Number|Boolean
* 详细: [自动增长](guide.md#自动增长).
### colWidthReduce
* type: Number
* 默认值: config.COL_WIDTH_REDUCE
* 详细: 单位px. 稍稍减小列宽度以修正[css计算精度](guide.md#计算精度)问题.
### 响应式props
对应width的: xs, sm, md, lg, xl. 对应grow的: xsGrow, smGrow, mdGrow, lgGrow, xlGrow. 参考[响应式](guide.md#响应式).

## BreakRow
断行组件, 实际上是宽度为100%的元素. 默认显示, 如果有响应式props为true, 则只在该宽度的屏幕下显示.
### 响应式props
xs, sm, md, lg, xl. 参考[响应式](guide.md#响应式).