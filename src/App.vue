<template lang="pug">
#app
  Row
    Col(:width="0.5")
      .box.red
    Col(:width="0.2" sameWidth)
      .box.red
    Col(sameWidth)
      .box.red
    br
    Col(sameWidth)
      .box.red
    Col(:width="0.2")
      .box.red
    Col(:xs="0.5")
      .box.red
    Col(:width="0.5")
      .box.red
    Col(:width="0.5")
      .box.red
    Col(:width="0.5")
      .box.yellow
</template>

<script>
import Row from './components/Row.vue'
import Col from './components/Col.vue'
export default {
  components: {Row, Col},
  data() {
    return {}
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
#app{}
.box{
  min-height: 100px;
}
.red{
  background: red;
}
.yellow{
  background: yellow;
}
</style>
