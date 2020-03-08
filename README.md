# vue-colrow
Smarter layout components. Based on css flexbox. Support responsive design, server side render. 5 KB gzipped. [Document](https://vue-colrow.phphe.com)

更智能的布局组件. 基于css flexbox. 支持响应式布局, 服务端渲染. 5 KB gzipped. [文档](https://vue-colrow.phphe.com/zh)

It includes 3 components: Row, Col, BreakRow. Follow is a demo with Vuetify:

![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form.png?raw=true)

In small screen: ![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-form.png?raw=true)

It is easy:
```html
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
```
## Demo 2: Responsive card list with gutter
![image](https://github.com/phphe/vue-colrow/blob/master/public/colrow-list?raw=true)
```html
<Row>
  <Col :xl="1/5" :lg="1/4" :md="1/3" :sm="1/2" :xs="1" v-for="i in 23" :key="i+'card'"><Card1 /></Col>
</Row>
```
## License
[MIT](http://opensource.org/licenses/MIT)