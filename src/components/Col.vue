<template lang="pug">
.cr-col(:class="className" :style="cStyle" :data-width="width")
  slot
  //- style sheet
  div.col-dynamic-style(style="display:none;")
    div(v-html="cBaseStyle")
    div(v-html="cResponsiveStyle")
</template>

<script>
import * as hp from 'helper-js'
import {ifNeedReduceColWidth} from './Row.vue'

const BREAK_POINTS = {
  xs: 544,
  sm: 768,
  md: 992,
  lg: 1200,
}

export default {
  BREAK_POINTS,
  props: {
    width: {type: [Boolean, Number]},
    grow: {type: [Boolean, Number]},
    // responsive
    // todo fix responsive stylesheet 为responsive生成的style width无效
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
    colWidthReduce: {type: Number, default() {return this.$parent.$options.COL_WIDTH_REDUCE}},
  },
  // components: {},
  data() {
    return {
      className: `cr-col-${this._uid}`,
    }
  },
  computed: {
    cStyle() {
      const stl = {
        marginRight: `${this.$parent.gutterX}px`,
        marginBottom: `${this.$parent.gutterY}px`,
      }
      return stl
    },
    cBaseStyle() {
      // base style
      let styleText = `.${this.className}{\n`
      let w = this.width
      if (this.width == null) {
        w = this.grow ? '1px' : 1
      }
      styleText += `width: ${this.widthText(w)};`
      if (this.grow != null && this.grow !== false) {
        let grow = this.grow
        if (this.grow === true) {
          grow = 1
        }
        styleText += `flex-grow: ${grow};`
      }
      styleText += '}'
      return `<style type="text/css">${styleText}</style>`
    },
    cResponsiveStyle() {
      // responsive
      let styleText = ''
      const bp = BREAK_POINTS
      const pointNames = ['xs', 'sm', 'md', 'lg', 'xl'].filter(name => this[name])
      for (let i = 0; i < pointNames.length; i++) {
        const conditions = []
        const pointName = pointNames[i]
        const prev = pointNames[i - 1]
        if (prev && BREAK_POINTS[prev]) {
          conditions.push(`(min-width: ${BREAK_POINTS[prev]}px)`)
        }
        if (BREAK_POINTS[pointName]) {
          conditions.push(`(max-width: ${BREAK_POINTS[pointName]}px)`)
        }
        styleText += `
        @media ${conditions.join(' and ')} {
          .${this.className}{
            width: ${this[pointName]};
          }
        }
        `
      }
      return `<style type="text/css">${styleText}</style>`
    },
  },
  // watch: {},
  methods: {
    // convert width to css text
    widthText(width) {
      if (width <= 1) {
        const reduce = ifNeedReduceColWidth ? ` - ${this.colWidthReduce}px` : ''
        return `calc(100% * ${width} - ${this.$parent.gutterX}px${reduce})`
      } else {
        return `${width}px`
      }
    },
  },
  // created() {},
  // mounted() {},
  // beforeDestroy() {},
}
</script>

<style>
.cr-col{
  box-sizing: border-box;
}
</style>
