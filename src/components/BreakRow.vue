<template lang="pug">
.cr-break-row(:class="className")
  //- style sheet
  .cr-dynamic-style(style="display:none;" v-html="styleText")
</template>

<script>
import * as hp from 'helper-js'

export default {
  props: {
    xs: {type: Boolean},
    sm: {type: Boolean},
    md: {type: Boolean},
    lg: {type: Boolean},
    xl: {type: Boolean},
  },
  data() {
    return {
      className: `cr-break-row-${this._uid}`,
    }
  },
  computed: {
    styleText() {
      const {xs, sm, md, lg, xl} = this
      if (xs || sm || md || lg || xl) {
        let styleText = `.${this.className}{display: none;}`
        const bp = this.$parent.breakPoints
        if (xs) {
          styleText += `
            @media (max-width: ${bp.xs}px){
              .${this.className}{display: block;}
            }
          `
        }
        if (sm) {
          styleText += `
            @media (max-width: ${bp.sm}px) and (min-width: ${bp.xs}px){
              .${this.className}{display: block;}
            }
          `
        }
        if (md) {
          styleText += `
            @media (max-width: ${bp.md}px) and (min-width: ${bp.sm}px){
              .${this.className}{display: block;}
            }
          `
        }
        if (lg) {
          styleText += `
            @media (max-width: ${bp.lg}px) and (min-width: ${bp.md}px){
              .${this.className}{display: block;}
            }
          `
        }
        if (xl) {
          styleText += `
            @media (min-width: ${bp.lg}px){
              .${this.className}{display: block;}
            }
          `
        }
        return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
      }
    },
  },
}
</script>

<style>
.cr-break-row{
  width: 100%;
}
</style>
