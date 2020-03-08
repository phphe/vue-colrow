<template lang="html">
  <div class="vuetify-demo">
    <Row>
      <Col :width="300"><Card1 /></Col>
      <Col grow :xs="1">
        <Row>
          <Col :width="1/3" :xs="1/2">
            <label>First Name</label><v-text-field solo></v-text-field>
          </Col>
          <Col :width="1/3" :xs="1/2">
            <label>Last Name</label><v-text-field solo></v-text-field>
          </Col>
          <Col :width="1/3" :xs="1">
            <label>Email</label><v-text-field solo></v-text-field>
          </Col>
          <Col :width="3/5" :xs="1">
            <label>Website</label><v-text-field solo></v-text-field>
          </Col>
          <Col :width="2/5" :xs="1">
            <label>Title</label><v-text-field solo></v-text-field>
          </Col>
          <Col>
            <label>About</label><v-textarea solo></v-textarea>
          </Col>
        </Row>
      </Col>
    </Row>
    <!-- 2 -->
    <Row>
      <Col :xl="1/5" :lg="1/4" :md="1/3" :sm="1/2" :xs="1" v-for="i in 23" :key="i+'card'"><Card1 /></Col>
    </Row>
  </div>
</template>

<script>
import "./vuetify";
import Row from "../components/Row.vue";
import Col from "../components/Col.vue";
import BreakRow from "../components/BreakRow.vue";

const Card1 = {
  template: `
    <v-card class="mx-auto">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

      <v-card-title>Top western road trips</v-card-title>

      <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
    </v-card>
  `
}

export default {
  components: { Row, Col, BreakRow, Card1 }
  // props: {},
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {}
};
</script>

<style lang="scss">
.vuetify-demo {
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
  background: #e4e4e4;
  label{
    display: block;
    margin-bottom: 10px;
  }
}
</style>