<template lang="pug">
.cr-row(:style="style")
  .cr-row-inner(:style="innerStyle" ref="inner")
    slot
</template>

<script>
import * as hp from 'helper-js'
import detectIfNeedReduceColWidth from './detectIfNeedReduceColWidth'

export const ifNeedReduceColWidth = detectIfNeedReduceColWidth()

export const config = {
  DEFAULT_GUTTER_X: 16,
  DEFAULT_GUTTER_Y: 16,
  COL_WIDTH_REDUCE: 0.09, // for some browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  ROW_HEIGHT_CALCULATION: true,
}

export default {
  DEFAULT_GUTTER: 16,
  COL_WIDTH_REDUCE: 0.09, // for some browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  ROW_HEIGHT_CALCULATION: true,
  props: {
    gutter: {default() { return [config.DEFAULT_GUTTER_X, config.DEFAULT_GUTTER_Y] }, type: [Number, Array]},
    heightCalculation: {type: Boolean, default() { return config.ROW_HEIGHT_CALCULATION }},
    // responsive
    breakPoints: {type: Object, default() {return config.BREAK_POINTS}},
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
    style() {
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
    innerStyle() {
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
          t[0] = config.DEFAULT_GUTTER_X
        }
        if (t[1] == null) {
          t[1] = config.DEFAULT_GUTTER_Y
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
