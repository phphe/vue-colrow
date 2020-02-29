/*!
 * vue-colrow v1.2.6-beta
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hp = require('helper-js');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

//
var MORE = '0px'; // extend row-inner to avoid width slightly insufficient caused by calculation accuracy in different browsers.

var DEFAULT_GUTTER = 16;
var script = {
  props: {
    gutter: {
      default: DEFAULT_GUTTER,
      type: [Number, Array]
    }
  },

  // components: {},
  data() {
    return {
      gutterX: null,
      gutterY: null
    };
  },

  computed: {
    cStyle() {
      return {
        marginRight: "calc(-".concat(this.gutterX, "px - ").concat(MORE, ")"),
        marginBottom: "-".concat(this.gutterY, "px")
      };
    },

    cInnerStyle() {
      return {
        width: "calc(100% + ".concat(this.gutterX, "px + ").concat(MORE, ")")
      };
    }

  },
  watch: {
    gutter: {
      immediate: true,
      deep: true,

      handler(gutter) {
        var t = hp.isArray(gutter) ? gutter : [gutter, gutter];

        if (t[0] == null) {
          t[0] = DEFAULT_GUTTER;
        }

        if (t[1] == null) {
          t[1] = DEFAULT_GUTTER;
        }

        this.gutterX = t[0];
        this.gutterY = t[1];
      }

    }
  } // methods: {},
  // created() {},
  // mounted() {},
  // beforeDestroy() {},

};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "cr-row",
    style: _vm.cStyle
  }, [_c("div", {
    staticClass: "cr-row-inner",
    style: _vm.cInnerStyle
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var BREAK_POINTS = {
  xs: 544,
  sm: 768,
  md: 992,
  lg: 1200
};
var script$1 = {
  BREAK_POINTS,
  props: {
    width: {},
    grow: {
      type: [Boolean, Number, String]
    },
    // responsive
    // todo fix responsive stylesheet 为responsive生成的style width无效
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {}
  },

  // components: {},
  data() {
    return {
      className: "cr-col-".concat(this._uid)
    };
  },

  computed: {
    cStyle() {
      var stl = {
        marginRight: "".concat(this.$parent.gutterX, "px"),
        marginBottom: "".concat(this.$parent.gutterY, "px")
      };
      return stl;
    },

    cBaseStyle() {
      // base style
      var styleText = ".".concat(this.className, "{\n");
      var w = this.width;

      if (this.width == null) {
        w = this.grow ? '1px' : 1;
      }

      styleText += "width: ".concat(this.widthText(w), ";");

      if (this.grow != null && this.grow !== false) {
        var grow = this.grow;

        if (this.grow === true) {
          grow = 1;
        }

        styleText += "flex-grow: ".concat(grow, ";");
      }

      styleText += '}';
      return "<style type=\"text/css\">".concat(styleText, "</style>");
    },

    cResponsiveStyle() {
      // responsive
      var styleText = '';
      var pointNames = ['xs', 'sm', 'md', 'lg', 'xl'].filter(name => this[name]);

      for (var i = 0; i < pointNames.length; i++) {
        var conditions = [];
        var pointName = pointNames[i];
        var prev = pointNames[i - 1];

        if (prev && BREAK_POINTS[prev]) {
          conditions.push("(min-width: ".concat(BREAK_POINTS[prev], "px)"));
        }

        if (BREAK_POINTS[pointName]) {
          conditions.push("(max-width: ".concat(BREAK_POINTS[pointName], "px)"));
        }

        styleText += "\n        @media ".concat(conditions.join(' and '), " {\n          .").concat(this.className, "{\n            width: ").concat(this[pointName], ";\n          }\n        }\n        ");
      }

      return "<style type=\"text/css\">".concat(styleText, "</style>");
    }

  },
  // watch: {},
  methods: {
    // convert width to css text
    widthText(width) {
      if (hp.isString(width)) {
        if (width === 'auto' || width.endsWith('px')) {
          return width;
        } else {
          width = parseFloat(width);
        }
      }

      if (width <= 1) {
        return "calc((100% - ".concat(MORE, ") * ").concat(width, " - 0.09px - ").concat(this.$parent.gutterX, "px)");
      } else {
        return "".concat(width, "px");
      }
    }

  } // created() {},
  // mounted() {},
  // beforeDestroy() {},

};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "cr-col",
    class: _vm.className,
    style: _vm.cStyle,
    attrs: {
      "data-width": _vm.width
    }
  }, [_vm._t("default"), _c("div", {
    staticClass: "col-dynamic-style",
    staticStyle: {
      display: "none"
    }
  }, [_c("div", {
    domProps: {
      innerHTML: _vm._s(_vm.cBaseStyle)
    }
  }), _c("div", {
    domProps: {
      innerHTML: _vm._s(_vm.cResponsiveStyle)
    }
  })])], 2);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = __vue_normalize__({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
//
//
//
var script$2 = {};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "cr-break-row"
  });
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = __vue_normalize__({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

exports.BreakRow = __vue_component__$2;
exports.Col = __vue_component__$1;
exports.Row = __vue_component__;
