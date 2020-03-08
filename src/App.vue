<template lang="pug">
#app
  .pvs
    button.mybtn(@click="vuetify=!vuetify") Toggle VuetifyDemo
  VuetifyDemo(v-if="vuetify")
  template(v-else)
    Row(style="background: teal;" :smGutterX="5" :xlGutterX="16" :smGutterY="5" :xlGutterY="16")
      Col(:width="1/5" v-for="n in total" :key="n+10")
        .box.red
    .pvs
      button.mybtn(@click="total++") add
      button.mybtn(@click="total--") reduce
    Row
      Col(:width="1/24" v-for="n in 24" :key="n+100")
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
      Col(v-for="i in 10" :key="i" width="300" grow)
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
      Col(:width="2" grow)
        .box.red
</template>

<script>
import VuetifyDemo from './dev/VuetifyDemo'
import Row from './components/Row.vue'
import Col from './components/Col.vue'
import BreakRow from './components/BreakRow.vue'
export default {
  components: {Row, Col, BreakRow, VuetifyDemo},
  data() {
    return {
      total: 21,
      vuetify: false,
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // async mounted() {},
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
.mybtn {
	box-shadow: 0px 1px 0px 0px #f0f7fa;
	background:linear-gradient(to bottom, #33bdef 5%, #019ad2 100%);
	background-color:#33bdef;
	border-radius:6px;
	border:1px solid #057fd0;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px -1px 0px #5b6178;
}
.mybtn:hover {
	background:linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
	background-color:#019ad2;
}
.mybtn:active {
	position:relative;
	top:1px;
}
.pvs{
  padding: 5px 0;
}
</style>
