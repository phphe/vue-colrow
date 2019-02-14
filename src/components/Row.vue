<template lang="pug">
.cr-row(:style="cStyle")
  .cr-row-inner(:style="cInnerStyle")
    slot
</template>

<script>
import * as hp from 'helper-js'

const DEFAULT_GUTTER = 16

export default {
  props: {
    gutter: {default: DEFAULT_GUTTER, type: [Number, Array]},
  },
  // components: {},
  data() {
    return {
      gutterX: null,
      gutterY: null,
    }
  },
  computed: {
    cStyle() {
      return {
        marginRight: `-${this.gutterX}px`,
        marginBottom: `-${this.gutterY}px`,
      }
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
          t[0] = DEFAULT_GUTTER
        }
        if (t[1] == null) {
          t[1] = DEFAULT_GUTTER
        }
        this.gutterX = t[0]
        this.gutterY = t[1]
      }
    }
  },
  // methods: {},
  // created() {},
  // mounted() {},
  // beforeDestroy() {},
}

</script>

<style>
.cr-row{
  width: 100%;
}
.cr-row-inner{
  display: flex;
  flex-wrap: wrap;
}
</style>
