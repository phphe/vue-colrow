<template lang="pug">
.cr-row(:style="cStyle")
  .cr-row-inner(:style="cInnerStyle")
    slot
</template>

<script>
import * as hp from 'helper-js'

// detect if need reduce col width
function isNode() {
  return Boolean(typeof module !== 'undefined' && module.exports)
}
function isIE() {
  return Boolean(window.ActiveXObject || "ActiveXObject" in window)
}
let _ifNeedReduceColWidth = false
if (!isNode() && !isIE()) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.style.width='calc(1000px / 7)'
  const w = hp.getBoundingClientRect(div).width
  if (w * 7 > 1000) {
    _ifNeedReduceColWidth = true
  }
  hp.removeEl(div)
}

export const ifNeedReduceColWidth = _ifNeedReduceColWidth

export default {
  DEFAULT_GUTTER: 16,
  COL_WIDTH_REDUCE: 0.09, // only for non-webkit browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  props: {
    gutter: {default() { return this.$options.DEFAULT_GUTTER }, type: [Number, Array]},
    // responsive
    breakPoints: {type: Object, default() {return this.$options.BREAK_POINTS}},
  },
  // components: {},
  data() {
    return {
      gutterX: null,
      gutterY: null,
    }
  },
  computed: {
    cStyle() {
      return {
        marginRight: `calc(-${this.gutterX}px)`,
        marginBottom: `-${this.gutterY}px`,
      }
    },
    cInnerStyle() {
      return {
        width: `calc(100% + ${this.gutterX}px)`,
      }
    },
  },
  watch: {
    gutter: {
      immediate: true,
      deep: true,
      handler(gutter) {
        let t = hp.isArray(gutter) ? gutter : [gutter, gutter]
        if (t[0] == null) {
          t[0] = DEFAULT_GUTTER
        }
        if (t[1] == null) {
          t[1] = DEFAULT_GUTTER
        }
        this.gutterX = t[0]
        this.gutterY = t[1]
      }
    }
  },
  // methods: {},
  // created() {},
  // mounted() {},
  // beforeDestroy() {},
}

</script>

<style>
.cr-row{
  width: 100%;
}
.cr-row-inner{
  display: flex;
  flex-wrap: wrap;
}
</style>
