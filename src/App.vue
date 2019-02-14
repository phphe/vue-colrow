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
    Col(:width="0.2")
      .box.red
    Col(:width="0.2")
      .box.red
    BreakRow
    Col
      h2 2
    Col(:width="0.2")
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
    BreakRow
    Col(grow)
      .box.red
    Col
      hr
    Col.xxx(v-for="i in 10" :key="i" width="300" grow)
      .box.red
    Col(:width="0.6")
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
    Col(:width="50")
      .box.red
    Col(grow)
      .box.red
    BreakRow
    Col(:width="50")
      .box.red
    Col(:width="200")
      .box.red
    Col(grow)
      .box.red
    BreakRow
</template>

<script>
import Row from './components/Row.vue'
import Col from './components/Col.vue'
import BreakRow from './components/BreakRow.vue'
export default {
  components: {Row, Col, BreakRow},
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
