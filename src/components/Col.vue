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

const BREAK_POINTS = {
  xs: 544,
  sm: 768,
  md: 992,
  lg: 1200,
}

export default {
  BREAK_POINTS,
  props: {
    width: {},
    grow: {type: [Boolean, Number]},
    // responsive
    // todo fix responsive stylesheet 为responsive生成的style width无效
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
  },
  // components: {},
  data() {
    return {
      className: `cr-col-${this._uid}`,
    }
  },
  computed: {
    cStyle() {
      return {
        marginRight: `${this.$parent.gutterX}px`,
        marginBottom: `${this.$parent.gutterY}px`,
      }
    },
    cBaseStyle() {
      // base style
      let styleText = `.${this.className}{\n`
      let w = this.width
      if (this.width == null) {
        w = this.grow ? '1px' : 1
      }
      styleText += autoPrefix('width', this.widthText(w), {target: 'value'})
      if (this.grow != null && this.grow !== false) {
        let grow = this.grow
        if (this.grow === true) {
          grow = 1
        }
        styleText += autoPrefix('flex-grow', grow)
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
            ${autoPrefix('width', this[pointName], {target: 'value'})}
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
      if (hp.isString(width)) {
        if (width === 'auto' || width.endsWith('px')) {
          return width
        } else {
          width = parseFloat(width)
        }
      }
      if (width <= 1) {
        return `calc(100% * ${width} - ${this.$parent.gutterX}px)`
      } else {
        return `${width}px`
      }
    },
  },
  // created() {},
  // mounted() {},
  // beforeDestroy() {},
}

function autoPrefix(name, value, opt = {}) {
  const prefixes = ['-webkit-', '-moz-', '-ms-', '-o-']
  const t = `${name}: ${value};`
  const lines = []
  if (opt.target === 'value') {
    for (const prefix of prefixes) {
      lines.push(t.replace(': ', ': ' + prefix))
    }
  } else {
    for (const prefix of prefixes) {
      lines.push(prefix + t)
    }
  }
  lines.push(t)
  return lines.join('\n')
}
</script>

<style>
/* .cr-col{} */
</style>
