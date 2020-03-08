<template lang="pug">
.cr-col(:class="className")
  slot
  //- style sheet
  .cr-dynamic-style(style="display:none;")
    div(v-html="styleText")
</template>

<script>
import * as hp from 'helper-js'
import {ifNeedReduceColWidth, config} from './Row.vue'

export default {
  props: {
    width: {type: [Number, String]}, // default 1; default 1.1 if grow
    grow: {type: [Boolean, Number]},
    // responsive
    xs: {type: [Number, String]},
    xsGrow: {type: [Boolean, Number]},
    sm: {type: [Number, String]},
    smGrow: {type: [Boolean, Number]},
    md: {type: [Number, String]},
    mdGrow: {type: [Boolean, Number]},
    lg: {type: [Number, String]},
    lgGrow: {type: [Boolean, Number]},
    xl: {type: [Number, String]},
    xlGrow: {type: [Boolean, Number]},
    colWidthReduce: {type: Number, default() {return config.COL_WIDTH_REDUCE}},
  },
  // components: {},
  data() {
    return {
      className: `cr-col-${this._uid}`,
    }
  },
  computed: {
    styleText() {
      let styleText = `.${this.className}{\n`
      // margin
      styleText += `
        margin-right: ${this.$parent.gutterX}px;
        margin-bottom: ${this.$parent.gutterY}px;
      `
      // base style
      const widthAndGrow = (w, grow) => {
        let t = ''
        if (w != null) {
          t += `width: ${this.widthText(w)};`
        }
        if (grow != null && grow !== false) {
          if (grow === true) {
            grow = 1
          }
          t += `flex-grow: ${grow};`
        }
        return t
      }
      let w = this.width
      if (w == null) {
        w = this.grow != null && this.grow !== false ? 1.1 : 1
      }
      styleText += widthAndGrow(w, this.grow)
      styleText += '}'
      // responsive
      const bp = this.$parent.breakPoints
      const {xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow} = this
      const xsStyle = widthAndGrow(xs, xsGrow)
      if (xsStyle) {
        styleText += `
          @media (max-width: ${bp.xs}px) {
            .${this.className}{
              ${xsStyle}
            }
          }
        `
      }
      const smStyle = widthAndGrow(sm, smGrow)
      if (smStyle) {
        styleText += `
          @media (min-width: ${bp.xs}px) {
            .${this.className}{
              ${smStyle}
            }
          }
        `
      }
      const mdStyle = widthAndGrow(md, mdGrow)
      if (mdStyle) {
        styleText += `
          @media (min-width: ${bp.sm}px) {
            .${this.className}{
              ${mdStyle}
            }
          }
        `
      }
      const lgStyle = widthAndGrow(lg, lgGrow)
      if (lgStyle) {
        styleText += `
          @media (min-width: ${bp.md}px) {
            .${this.className}{
              ${lgStyle}
            }
          }
        `
      }
      const xlStyle = widthAndGrow(xl, xlGrow)
      if (xlStyle) {
        styleText += `
          @media (min-width: ${bp.lg}px) {
            .${this.className}{
              ${xlStyle}
            }
          }
        `
      }
      // 
      return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
    },
  },
  // watch: {},
  methods: {
    // convert width to css text
    widthText(width) {
      if (hp.isNumber(width)) {
        if (width <= 1) {
          const reduce = ifNeedReduceColWidth ? ` - ${this.colWidthReduce}px` : ''
          return `calc(100% * ${width} - ${this.$parent.gutterX}px${reduce})` 
        } else {
          return `${width}px`
        }
      } else {
        return width // such as 100px, 100em, 10cm
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
