<template lang="pug">
.cr-row(:class="{'cr-row-cloak': !inited}")
  .cr-row-inner(ref="inner")
    slot
    .clearfix
</template>

<script>
import * as hp from 'helper-js'
import * as vf from 'vue-functions'

// find last col, row
const update = async function() {
  await this.mountedPromise
  this.updateWidth()
  const rowWidth = this.width + this.gutterX
  const rows = []
  let currentRow
  let raw // row accumulate width; row累加宽度
  if (!this.$refs.inner) {
    // prevent error when hot reload npm run dev
    return
  }
  let growExisted // row只允许一个grow col
  for (const el of this.$refs.inner.children) {
    if (el.tagName === 'BR') {
      // new row
      currentRow = null
      continue
    }
    if (hp.hasClass(el, 'clearfix')) {
      // don't add .clearfix as row child
      continue
    }
    if (!hp.hasClass(el, 'cr-col')) {
      console.error(`Only Col, br can be child of Row. Wrong element:`, el)
    }
    const id = el.getAttribute('data-vm-id')
    const col = this.colsMapping[id]
    col.isFirstCol = false
    col.isLastCol = false
    col.isLastRow = false
    if (vf.isPropTrue(col.grow)) {
      if (growExisted) {
        // new row
        currentRow = null
      } else {
        growExisted = true
      }
    }
    //
    if (!currentRow) {
      // new row
      growExisted = false
      currentRow = []
      rows.push(currentRow)
      raw = 0
    }
    //
    let cw // col width. _realWidth. contain margin
    const setCw = (col, w) => {
      let isPx
      if (hp.isString(w)) {
        if (w.endsWith('px')) {
          isPx = true
        }
        w = parseFloat(w)
      }
      if (!isPx && w <= 1) {
        // width is proportion; 小于等于1的是比例
        cw = parseInt(rowWidth * w)
        cw = cw > rowWidth ? rowWidth : cw // col max width is 100%
        col.cssWidth = cw - this.gutterX
      } else {
        // width is px; 指定像素
        cw = w + this.gutterX
        cw = cw > rowWidth ? rowWidth : cw // col max width is 100%
        col.cssWidth = w
      }
    }
    const restW = rowWidth - raw
    const cpw = this.getColCurrentPropWidth(col, rowWidth, restW) // col prop width for current screen size
    setCw(col, cpw)
    //
    col._realWidth = cw
    raw += cw
    if (raw > rowWidth) {
      // new row
      growExisted = false
      currentRow = [col]
      rows.push(currentRow)
      raw = cw
    } else {
      currentRow.push(col)
    }
  }
  if (rows.length !== 0) {
    // when screen narrower than first col, first row is empty, so remove it
    if (rows[0].length === 0) {
      rows.shift()
    }
    // grow col
    for (const row of rows) {
      row[0].isFirstCol = true
      hp.arrayLast(row).isLastCol = true
      // sort
      let restW = rowWidth // rest width; 递减后剩余宽度
      let growCol
      row.forEach((col, i) => {
        if (vf.isPropTrue(col.grow)) {
          growCol = col
        }
        restW -= col._realWidth
      })
      if (growCol) {
        growCol.cssWidth += restW
        growCol._realWidth += restW
      } else if (restW <= 3) {
        // 当剩下3px以内的剩余时, 加到最后一列上
        const lastCol = hp.arrayLast(row)
        lastCol.cssWidth += restW
        lastCol._realWidth += restW
      }
    }
    hp.arrayLast(rows).forEach(col => {
      col.isLastRow = true
    })
    this.$emit('updated', this)
    // update children row
    for (const child of this.childrenRows) {
      child.update()
    }
  }
  this.$nextTick(() => {
    this.inited = true
  })
}

const DEFAULT_GUTTER = 16

export default {
  isColRow_row: true,
  props: {
    gutter: {default: DEFAULT_GUTTER, type: [Number, Array]},
  },
  // components: {},
  data() {
    return {
      mountedPromise: new Promise((resolve, reject) => {
        this._mountedResolve = resolve
      }),
      width: null,
      gutterX: null,
      gutterY: null,
      colsMapping: {},
      inited: false,
      // structure
      parentRow: null,
      childrenRows: [],
    }
  },
  computed: {
    colStyle() {
      return {
        marginRight: this.gutterX + 'px',
        marginBottom: this.gutterY + 'px',
      }
    },
  },
  // watch: {},
  methods: {
    updateWidth() {
      this.width = this.$el.offsetWidth
    },
    updateGutter() {
      const {gutter} = this
      let t = hp.isArray(gutter) ? gutter : [gutter, gutter]
      if (t[0] == null) {
        t[0] = DEFAULT_GUTTER
      }
      if (t[1] == null) {
        t[1] = DEFAULT_GUTTER
      }
      this.gutterX = t[0]
      this.gutterY = t[1]
    },
    getColWidthProp(col) {
      if (col.width === 'auto') {
        if (vf.isPropTrue(col.grow)) {
          return '1px'
        } else {
          return 1
        }
      } else {
        return col.width
      }
    },
    // get responsive width
    getColCurrentPropWidth(col, rowWidth, restW) {
      const w = window.innerWidth
      const cw = this.getColWidthProp(col)
      let r
      if (w < 768) {
        r = getPrioritized(col.xs, cw)
      } else if (w < 992) {
        r = getPrioritized(col.sm, cw)
      } else if (w < 1200) {
        r = getPrioritized(col.md, col.sm, cw)
      } else {
        r = getPrioritized(col.lg, col.md, col.sm, cw)
      }
      if (hp.isFunction(r)) {
        return r(rowWidth, restW)
      }
      return r
    },
    // find last col, row
    update,
    // updateDebounced,
    registerCol(colVm) {
      this.colsMapping[colVm._uid] = colVm
      this.updateDebounced()
    },
    unregisterCol(colVm) {
      delete this.colsMapping[colVm._uid]
      this.updateDebounced()
    },
    findParentRow() {
      let parentRow = this
      while (true) {
        parentRow = parentRow.$parent
        if (!parentRow || parentRow.$options.isColRow_row) {
          break
        }
      }
      this.parentRow = parentRow
      if (parentRow) {
        this.parentRow.childrenRows.push(this)
      }
    },
  },
  created() {
    this.updateDebounced = hp.debounce(update)
    this.findParentRow()
  },
  mounted() {
    this._mountedResolve()
    this.$watch('gutter', this.updateGutter, {deep: true, immediate: true})
    this.$watch('gutterX', this.updateDebounced)
    this.$watch('gutterY', this.updateDebounced)
    //
    this.onresize = e => {
      if (!this.parentRow) {
        this.update()
      }
    }
    hp.onDOM(window, 'resize', this.onresize)
    //
    if (!this.parentRow) {
      this.update()
    }
  },
  beforeDestroy() {
    if (this.parentRow) {
      hp.arrayRemove(this.parentRow.childrenRows, this)
    }
    if (this.onresize) {
      hp.offDOM(window, 'resize', this.onresize)
    }
  },
}

function getPrioritized(...arr) {
  for (const item of arr) {
    if (item != null) {
      return item
    }
  }
  return hp.arrayLast(arr)
}
</script>

<style>
.cr-row{
}
.cr-row-cloak{
  visibility: hidden;
}
.cr-row-inner > br{
  display: none;
}
.clearfix{
  clear: both;
}
</style>
