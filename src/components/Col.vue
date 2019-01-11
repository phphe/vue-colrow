<template lang="pug">
.cr-col(:style="[$parent.colStyle, colStyle]" :data-vm-id="vmId" :isLastCol="isLastCol")
  slot
</template>

<script>
import * as hp from 'helper-js'
export default {
  props: {
    width: {default: 'auto', type: [Number, String]},
    grow: {}, // grow priority, the front is more preferred; 扩展的优先级, 靠前的更优先
    sameWidth: {}, // cols with same value will be set same width
    // responsive
    xs: {type: [Number, String]},
    sm: {type: [Number, String]},
    md: {type: [Number, String]},
    lg: {type: [Number, String]},
  },
  components: {},
  data() {
    return {
      vmId: this._uid,
      cssWidth: null,
      isFirstCol: false,
      isLastCol: false,
      isLastRow: false,
    }
  },
  computed: {
    colStyle() {
      const r = {
        width: this.cssWidth + 'px',
      }
      if (this.isFirstCol) {
        r.clear = 'both'
      }
      if (this.isLastCol) {
        r.marginRight = '0'
      }
      if (this.isLastRow) {
        r.marginBottom = '0'
      }
      return r
    },
  },
  // watch: {},
  // methods: {},
  // created() {},
  mounted() {
    this.$parent.registerCol(this)
  },
  beforeDestroy() {
    this.$parent.unregisterCol(this)
  },
}
</script>

<style>
.cr-col{
  float: left;
}
</style>
