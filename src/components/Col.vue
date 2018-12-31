<template lang="pug">
.layout-col(:style="[$parent.colStyle, colStyle]" :data-vm-id="vmId")
  slot
</template>

<script>
import * as hp from 'helper-js'
export default {
  props: {
    width: {default: 0.1, type: Number},
    fixed: {default: false}, // fixed width
    grow: {}, // grow priority, the front is more preferred; 扩展的优先级, 靠前的更优先
    sameWidth: {}, // cols with same value will be set same width
    // responsive
    xs: {type: Number},
    sm: {type: Number},
    md: {type: Number},
    lg: {type: Number},
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
.layout-col{
  float: left;
}
</style>
