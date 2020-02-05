<template lang="pug">
.cr-col(:class="className" :style="cStyle" )
  slot
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
    grow: {type: Boolean},
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
      if (this.grow != null) {
        let grow = this.grow
        if (this.grow === '') {
          grow = 1
        }
        styleText += autoPrefix('flex-grow', grow)
      }
      styleText += '}'
      return styleText
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
      return styleText
    },
  },
  watch: {
    cBaseStyle: {
      immediate: true,
      handler(styleText, old) {
        if (styleText !== old) {
          this.addStylesheet('base', styleText)
        }
      }
    },
    cResponsiveStyle: {
      immediate: true,
      handler(styleText, old) {
        if (styleText !== old) {
          this.addStylesheet('responsive', styleText)
        }
      }
    },
  },
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
    addStylesheet(name, styleText) {
      if (!hp.isDocumentExisted()) {
        // for ssr
        return
      }
      if (!this._stylesheets) {
        this._stylesheets = {}
      }
      const sheets = this._stylesheets
      if (sheets[name]) {
        removeEl(sheets[name])
        delete sheets[name]
      }
      if (styleText) {
        const style = sheets[name] = document.createElement('style')
        style.type = 'text/css'
        style.appendChild(document.createTextNode(styleText))
        const head = document.head
        head.appendChild(style)
      }
    },
  },
  // created() {},
  // mounted() {},
  beforeDestroy() {
    if (this._stylesheets) {
      Object.values(this._stylesheets).forEach(el => removeEl(el))
      this._stylesheets = null
    }
  },
}

function removeEl(el) {
  el.parentNode.removeChild(el)
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
