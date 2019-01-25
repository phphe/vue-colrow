<template lang="pug">
.cr-col(:style="[$parent.colStyle, colStyle]" :data-vm-id="vmId" :isLastCol="isLastCol")
  slot
</template>

<script>
import * as hp from 'helper-js'
export default {
  props: {
    width: {default: 'auto'},
    grow: {},
    // responsive
    xs: {},
    sm: {},
    md: {},
    lg: {},
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
  created() {
    this.$parent.registerCol(this)
  },
  // mounted() {},
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
