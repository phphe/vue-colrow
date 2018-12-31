<template lang="pug">
.layout-row(:class="{'layout-row-uninited': !inited}")
  .layout-row-inner(ref="inner")
    slot
    .clearfix
</template>

<script>
import * as hp from 'helper-js'
import * as vf from 'vue-functions'

export default {
  props: {
    gutter: {default: 16, type: [Number, Array]},
  },
  // components: {},
  data() {
    return {
      mounted: false,
      width: null,
      gutterX: null,
      gutterY: null,
      colsMapping: {},
      inited: false,
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
      this.gutterX = t[0]
      this.gutterY = t[1]
    },
    // get responsive width
    getColCurrentPropWidth(col) {
      const w = window.innerWidth
      const prioritized = (...arr) => {
        for (const item of arr) {
          if (item != null) {
            return item
          }
        }
        return hp.arrayLast(arr)
      }
      if (w < 768) {
        return prioritized(col.xs, col.width)
      } else if (w < 992) {
        return prioritized(col.sm, col.width)
      } else if (w < 1200) {
        return prioritized(col.md, col.sm, col.width)
      } else {
        return prioritized(col.lg, col.md, col.sm, col.width)
      }
    },
    // find last col, row
    update() {
      if (!this.mounted) {
        return
      }
      const rowWidth = this.width + this.gutterX
      const rows = []
      let currentRow
      let raw // row accumulate width; row累加宽度
      const sameWidthStore = {} // {same width name: cols}
      if (!this.$refs.inner) {
        // prevent error when hot reload npm run dev
        return
      }
      for (const el of this.$refs.inner.children) {
        if (el.tagName === 'BR') {
          currentRow = null
          continue
        }
        if (!hp.hasClass(el, 'layout-col')) {
          continue
        }
        if (!currentRow) {
          currentRow = []
          rows.push(currentRow)
          raw = 0
        }
        const id = el.getAttribute('data-vm-id')
        const col = this.colsMapping[id]
        col.isFirstCol = false
        col.isLastCol = false
        col.isLastRow = false
        //
        let cw // col width. _realWidth. contain margin
        const setCw = (col, w) => {
          if (w < 1) {
            // width is proportion; 小于1的是比例
            cw = rowWidth * w
            col.cssWidth = cw - this.gutterX
          } else {
            // width is px; 指定像素
            cw = w + this.gutterX
            col.cssWidth = w
          }
        }
        if (vf.isPropTrue(col.sameWidth)) {
          if (sameWidthStore[col.sameWidth]) {
            const sameCols = sameWidthStore[col.sameWidth]
            sameCols.push(col)
            setCw(col, sameCols[0].cssWidth)
          } else {
            sameWidthStore[col.sameWidth] = [col]
            setCw(col, this.getColCurrentPropWidth(col))
          }
        } else {
          const cpw = this.getColCurrentPropWidth(col) // col prop width for current screen size
          setCw(col, cpw)
        }
        //
        col._realWidth = cw
        raw += cw
        if (raw > rowWidth) {
          currentRow = [col]
          rows.push(currentRow)
          raw = cw
        } else {
          currentRow.push(col)
        }
      }
      if (rows.length === 0) {
        return
      }
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
        const sorted = [] // without fixed, same-width
        row.forEach((col, i) => {
          if (vf.isPropTrue(col.fixed)) {
            //
          } else if (!vf.isPropTrue(col.sameWidth)) {
            sorted.push(col)
            col._colIndex = i
          }
          restW -= col._realWidth
        })
        if (restW <= 0) {
          continue
        }
        sorted.sort((a,b) => {
          const aGrow = a.grow || 0
          const bGrow = b.grow || 0
          if (aGrow == bGrow) {
            return -(a._colIndex - b._colIndex)
          }
          return aGrow - bGrow
        })
        sorted.reverse()
        const sameWidthIgnoreColNames = {} //
        for (const col of sorted) {
          if (vf.isPropTrue(col.sameWidth)) {
            const swn = col.sameWidth // 'same width' name
            if (sameWidthIgnoreColNames[swn]) {
              continue
            }
            sameWidthIgnoreColNames[swn] = true
            const sameCols = sameWidthStore[swn]
            const t = restW / sameCols.length
            for (const col2 of sameCols) {
              col2.cssWidth += t
              col2._realWidth += t
            }
            break
          } else {
            col.cssWidth += restW
            col._realWidth += restW
            break
          }
        }
      }
      hp.arrayLast(rows).forEach(col => {
        col.isLastRow = true
      })
    },
    registerCol(colVm) {
      this.colsMapping[colVm._uid] = colVm
      this.update()
    },
    unregisterCol(colVm) {
      delete this.colsMapping[colVm._uid]
      this.update()
    },
  },
  // created() {},
  mounted() {
    this.mounted = true
    this.updateWidth()
    hp.onDOM(window, 'resize', this.updateWidth)
    this.$watch('gutter', this.updateGutter, {deep: true, immediate: true})
    this.$watch('gutterX', this.update)
    this.$watch('gutterY', this.update)
    this.$watch('width', this.update)
    this.update()
    this.inited = true
  },
  beforeDestroy() {
    hp.offDOM(window, 'resize', this.updateWidth)
  },
}
</script>

<style>
.layout-row{
}
.layout-row-uninited{
  visibility: hidden;
}
.layout-row-inner > br{
  display: none;
}
.clearfix{
  clear: both;
}
</style>
