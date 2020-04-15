<template lang="pug">
.cr-col(:class="className")
  slot
  //- style sheet
  .cr-dynamic-style(style="display:none;" v-html="styleText")
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
      className: `cr-col-${hp.strRand()}`,
    }
  },
  computed: {
    styleText() {
      const baseStyleText = (width, grow, gutterX, gutterY) => {
        let empty = true
        const styles = []
        if (gutterX != null) {
          styles.push(`margin-right: ${gutterX}px;`)
          empty = false
        }
        if (gutterY != null) {
          styles.push(`margin-bottom: ${gutterY}px;`)
          empty = false
        }
        if (width == null && grow) {
          width = 2
        }
        if (width != null || gutterX != null) {
          styles.push(`width: ${this.widthText(width, gutterX)};`)
          empty = false
        }
        if (grow != null && grow !== false) {
          if (grow === true) {
            grow = 1
          }
          styles.push(`flex-grow: ${grow};`)
          empty = false
        }
        const style = `.${this.className}{${styles.join('')}}`
        return {empty, style}
      }

      let styleText = ``
      let w = this.width
      if (w == null && !this.grow) {
        w = 1
      }
      styleText += baseStyleText(w, this.grow, this.$parent.gutterX, this.$parent.gutterY).style
      // responsive
      const bp = this.$parent.breakPoints
      const {xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow} = this
      const {xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY} = this.$parent
      let t
      t = baseStyleText(xs, xsGrow, xsGutterX, xsGutterY)
      if (!t.empty) {
        styleText += `
          @media (max-width: ${bp.xs}px) {
            ${t.style}
          }
        `
      }
      t = baseStyleText(sm, smGrow, smGutterX, smGutterY)
      if (!t.empty) {
        styleText += `
          @media (min-width: ${bp.xs}px) {
            ${t.style}
          }
        `
      }
      t = baseStyleText(md, mdGrow, mdGutterX, mdGutterY)
      if (!t.empty) {
        styleText += `
          @media (min-width: ${bp.sm}px) {
            ${t.style}
          }
        `
      }
      t = baseStyleText(lg, lgGrow, lgGutterX, lgGutterY)
      if (!t.empty) {
        styleText += `
          @media (min-width: ${bp.md}px) {
            ${t.style}
          }
        `
      }
      t = baseStyleText(xl, xlGrow, xlGutterX, xlGutterY)
      if (!t.empty) {
        styleText += `
          @media (min-width: ${bp.lg}px) {
            ${t.style}
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
    widthText(width, gutterX) {
      if (width == null) {
        width = this.width
      }
      if (gutterX == null) {
        gutterX = this.$parent.gutterX
      }
      if (hp.isNumber(width)) {
        if (width <= 1) {
          const reduce = ifNeedReduceColWidth ? ` - ${this.colWidthReduce}px` : ''
          return `calc(100% * ${width} - ${gutterX}px${reduce})` 
        } else {
          return `${width}px`
        }
      } else {
        return width // such as 100px, 100em, 10cm
      }
    },
  },
  // created() {},
  mounted() {
    this.className = `cr-col-${hp.strRand()}` // make root element update when in nuxt
  },
  // beforeDestroy() {},
}
</script>

<style>
.cr-col{
  box-sizing: border-box;
}
</style>
