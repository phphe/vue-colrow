<template lang="pug">
.cr-col(:class="className")
  slot
  //- style sheet
  .cr-dynamic-style(style="display:none;")
    div(v-html="styleText")
</template>

<script>
import * as hp from 'helper-js'
import {ifNeedReduceColWidth} from './Row.vue'

export default {
  props: {
    width: {type: [Boolean, Number, String]},
    grow: {type: [Boolean, Number]},
    // responsive
    xs: {type: [Boolean, Number, String]},
    xsGrow: {type: [Boolean, Number]},
    sm: {type: [Boolean, Number, String]},
    smGrow: {type: [Boolean, Number]},
    md: {type: [Boolean, Number, String]},
    mdGrow: {type: [Boolean, Number]},
    lg: {type: [Boolean, Number, String]},
    lgGrow: {type: [Boolean, Number]},
    xl: {type: [Boolean, Number, String]},
    xlGrow: {type: [Boolean, Number]},
    colWidthReduce: {type: Number, default() {return this.$parent.$options.COL_WIDTH_REDUCE}},
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
        if (w != null && w !== false) {
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
      styleText += widthAndGrow(this.width, this.grow)
      styleText += '}'
      // responsive
      const bp = this.$parent.breakPoints
      const {xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow} = this
      if (xs !== false || xsGrow !== false) {
        styleText += `
          @media (max-width: ${bp.xs}px) {
            .${this.className}{
              ${widthAndGrow(xs, xsGrow)}
            }
          }
        `
      }
      if (sm !== false || smGrow !== false) {
        styleText += `
          @media (min-width: ${bp.xs}px) {
            .${this.className}{
              ${widthAndGrow(sm, smGrow)}
            }
          }
        `
      }
      if (md !== false || mdGrow !== false) {
        styleText += `
          @media (min-width: ${bp.sm}px) {
            .${this.className}{
              ${widthAndGrow(md, mdGrow)}
            }
          }
        `
      }
      if (lg !== false || lgGrow !== false) {
        styleText += `
          @media (min-width: ${bp.md}px) {
            .${this.className}{
              ${widthAndGrow(lg, lgGrow)}
            }
          }
        `
      }
      if (xl !== false || xlGrow !== false) {
        styleText += `
          @media (min-width: ${bp.lg}px) {
            .${this.className}{
              ${widthAndGrow(xl, xlGrow)}
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
