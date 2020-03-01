<template lang="pug">
#app
  Row
    Col(:width="1/nn" v-for="n in nn")
      .box.red
    Col(:width="0.5")
      Row
        Col(:width="0.5")
          .box.red
        Col(:width="0.5")
          .box.red
    Col(:width="0.5")
      .box.red
    Col(:width="0.5")
      .box.yellow
    Col(:width="0.2" xsGrow)
      .box.red Grow xs
    BreakRow(xs)
    Col(:width="0.2" xsGrow)
      .box.red Grow xs
    BreakRow
    Col(grow)
      .box.red
    Col(:width="0.2")
      .box.red
    BreakRow
    Col(grow)
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
    return {
      nn: 5,
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  async mounted() {
    const arr = [];
    for (let index = 1; index <= 24; index++) {
      this.nn = index
      await this.$nextTick()
      let col1 = this.$el.querySelector('.cr-col')
      let w1 = col1.getBoundingClientRect().width
      let w2 = col1.parentElement.getBoundingClientRect().width
      arr.push((w1+16) *this.nn - w2)
    }
    console.log(arr);
    console.log(Math.min(...arr), Math.max(...arr));
    
  },
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
