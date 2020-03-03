<template lang="pug">
.cr-row(:style="cStyle")
  .cr-row-inner(:style="cInnerStyle" ref="inner")
    slot
</template>

<script>
import * as hp from 'helper-js'

// detect if need reduce col width
// detect browsers, from: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
function isNode() {
  return typeof module !== 'undefined' && module.exports
}
function isFirefox() {
  return typeof InstallTrigger !== 'undefined'
}
// Safari 3.0+ "[object HTMLElementConstructor]" 
function isSafari() {
  return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
}
// Chrome 1 - 79
function isChrome() {
  return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
}

// detect by DOM
// const div = document.createElement('div')
// document.body.appendChild(div)
// div.style.width='calc(1000px / 7)'
// const w = hp.getBoundingClientRect(div).width
// if (w * 7 > 1000) {
//   _ifNeedReduceColWidth = true
// }
// hp.removeEl(div)

export const ifNeedReduceColWidth = Boolean(!isNode() && !isChrome() && !isSafari() && !isFirefox())

export default {
  DEFAULT_GUTTER: 16,
  COL_WIDTH_REDUCE: 0.09, // only for non-webkit browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  ROW_HEIGHT_CALCULATION: true,
  props: {
    gutter: {default() { return this.$options.DEFAULT_GUTTER }, type: [Number, Array]},
    heightCalculation: {type: Boolean, default() { return this.$options.ROW_HEIGHT_CALCULATION }},
    // responsive
    breakPoints: {type: Object, default() {return this.$options.BREAK_POINTS}},
  },
  // components: {},
  data() {
    return {
      gutterX: null,
      gutterY: null,
      innerHeight: null,
      updateInnerHeight: () => {
        const {inner} = this.$refs
        if (inner) {
          const h = inner.offsetHeight
          if (h !== this.innerHeight) {
            this.innerHeight = h
          } 
        }
      },
    }
  },
  computed: {
    cStyle() {
      const stl = {
        marginRight: `-${this.gutterX}px`,
        // marginBottom: `-${this.gutterY}px`,
      }
      if (this.innerHeight == null) {
        stl.marginBottom = `-${this.gutterY}px`
      } else if(this.innerHeight !== 0) {
        stl.height = `${this.innerHeight - this.gutterY}px`
      }
      return stl
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
          t[0] = this.$options.DEFAULT_GUTTER
        }
        if (t[1] == null) {
          t[1] = this.$options.DEFAULT_GUTTER
        }
        this.gutterX = t[0]
        this.gutterY = t[1]
      }
    }
  },
  // methods: {},
  // created() {},
  mounted() {
    if (this.heightCalculation) {
      this.updateInnerHeight()
      hp.onDOM(window, 'resize', this.updateInnerHeight)
      if (window.MutationObserver && !this._heightCalculation_observer) {
        // Select the node that will be observed for mutations
        const targetNode = document.body.parentElement
        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };
        // Callback function to execute when mutations are observed
        const callback = (mutationsList, observer) => {
          this.updateInnerHeight()
        }
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
        this._heightCalculation_observer = observer 
      }
    }
  },
  beforeDestroy() {
    hp.offDOM(window, 'resize', this.updateInnerHeight)
    if (this._heightCalculation_observer) {
      const observer = this._heightCalculation_observer
      this._heightCalculation_observer = null
      // Later, you can stop observing
      observer.disconnect()
    }
  },
}

</script>

<style>
.cr-row{
  width: 100%;
  overflow: hidden;
}
.cr-row-inner{
  display: flex;
  flex-wrap: wrap;
}
</style>
