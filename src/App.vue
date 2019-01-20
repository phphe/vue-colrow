<template lang="pug">
#app
  Row
    Col(:width="0.5")
      Row
        Col(:width="0.5")
          .box.red
        Col(:width="0.5")
          .box.red
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
      hr
      .box.red
    Col(:xs="0.5")
      .box.red
    Col(:width="0.5")
      .box.red
    Col(:width="0.5")
      .box.red
    Col(:width="0.5")
      .box.yellow
    Col(:width="0.5")
      hr
    Col(width="100px")
      hr
    Col(:width="1")
      .box.red
    Col
      .box.yellow
    Col(grow)
      .box.red
    br
    Col(grow)
      .box.red
    br
    Col(v-for="i in 10" :key="i" :width="calcWidth")
      .box.red
    br
    Col(:width="0.5")
      div
        Row
          Col(:width="0.5")
            Row
              Col(:width="0.5")
                .box.yellow
              Col(:width="0.5")
                .box.yellow
          Col(:width="0.5")
            .box.yellow
    Col(:width="0.5")
      .box.red
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
  methods: {
    calcWidth: rowWidth => 1 / parseInt(rowWidth / 300),
  },
  // created() {},
  // mounted() {},
}
</script>

<style>
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
