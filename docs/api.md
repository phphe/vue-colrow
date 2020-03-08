# API
## config
### DEFAULT_GUTTER_X
* type: number
* default: 16
* detail: default horizontal column spacing
### DEFAULT_GUTTER_Y
* type: number
* default: 16
* detail: default vertical column spacing
### COL_WIDTH_REDUCE
* type: number
* default: 0.09
* detail: unit px. Reduce column width slightly to fix [css calculation accuracy](guide.md#calculation-accuracy)issue.
### BREAK_POINTS
* type: object
* detail: break points of scrren width
* default:
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
* default: true
* detail: Whether to fix Row height via js. [set row height by js](guide.md#set-row-height-by-js).

## Row
### gutter
* type: number|[number|null, number|null]
* detail: column spacing
### heightCalculation
* type: boolean
* detail: Whether to fix Row height via js. [set row height by js](guide.md#set-row-height-by-js).
### breakPoints
* default: config.BREAK_POINTS
### Responsive props
xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY. [Responsive](guide.md#responsive).

## Col
### width
* type: Number|String
* detail: [col width](guide.md#col-width).
### grow
* type: Number|Boolean
* detail: [col grow](guide.md#col-grow).
### colWidthReduce
* type: Number
* default: config.COL_WIDTH_REDUCE
* detail: unit px. Reduce column width slightly to fix [css calculation accuracy](guide.md#calculation-accuracy)issue.
### Responsive props
For `width`: xs, sm, md, lg, xl. For `grow`: xsGrow, smGrow, mdGrow, lgGrow, xlGrow. [Responsive](guide.md#responsive).

## BreakRow
To break row. It's width is 100% in fact. Display in default. If any responsive prop is true, it will display only in specified screen width.
### Responsive props
xs, sm, md, lg, xl. [Responsive](guide.md#responsive).