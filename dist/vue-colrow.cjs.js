/*!
 * vue-colrow v1.2.0
 * (c) 2019-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.number.constructor');
var hp = require('helper-js');
var values = _interopDefault(require('core-js/library/fn/object/values'));
var _parseFloat = _interopDefault(require('core-js/library/fn/parse-float'));
require('core-js/modules/es6.regexp.replace');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.string.ends-with');
require('core-js/modules/es6.function.name');
var vf = require('vue-functions');

var DEFAULT_GUTTER = 16;
var script = {
  props: {
    gutter: {
      default: DEFAULT_GUTTER,
      type: [Number, Array]
    }
  },
  // components: {},
  data: function data() {
    return {
      gutterX: null,
      gutterY: null
    };
  },
  computed: {
    cStyle: function cStyle() {
      return {
        marginRight: "-".concat(this.gutterX, "px"),
        marginBottom: "-".concat(this.gutterY, "px")
      };
    },
    cInnerStyle: function cInnerStyle() {
      return {
        width: "calc(100% + ".concat(this.gutterX, "px)")
      };
    }
  },
  watch: {
    gutter: {
      immediate: true,
      deep: true,
      handler: function handler(gutter) {
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
            const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-row",style:(_vm.cStyle)},[_c('div',{staticClass:"cr-row-inner",style:(_vm.cInnerStyle)},[_vm._t("default")],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Row.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Row = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var values$1 = values;

var _parseFloat$1 = _parseFloat;

var BREAK_POINTS = {
  xs: 544,
  sm: 768,
  md: 992,
  lg: 1200
};
var script$1 = {
  BREAK_POINTS: BREAK_POINTS,
  props: {
    width: {},
    grow: {},
    // responsive
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {}
  },
  // components: {},
  data: function data() {
    return {
      className: "cr-col-".concat(this._uid)
    };
  },
  computed: {
    cStyle: function cStyle() {
      return {
        marginRight: "".concat(this.$parent.gutterX, "px"),
        marginBottom: "".concat(this.$parent.gutterY, "px")
      };
    },
    cBaseStyle: function cBaseStyle() {
      // base style
      var styleText = ".".concat(this.className, "{\n");
      var w = this.width;

      if (this.width == null) {
        w = vf.isPropTrue(this.grow) ? '1px' : 1;
      }

      styleText += autoPrefix('width', this.widthText(w), {
        target: 'value'
      });

      if (this.grow != null) {
        var grow = this.grow;

        if (this.grow === '') {
          grow = 1;
        }

        styleText += autoPrefix('flex-grow', grow);
      }

      styleText += '}';
      return styleText;
    },
    cResponsiveStyle: function cResponsiveStyle() {
      var _this = this;

      // responsive
      var styleText = '';
      var pointNames = ['xs', 'sm', 'md', 'lg', 'xl'].filter(function (name) {
        return _this[name];
      });

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

        styleText += "\n        @media ".concat(conditions.join(' and '), " {\n          .").concat(this.className, "{\n            ").concat(autoPrefix('width', this[pointName], {
          target: 'value'
        }), "\n          }\n        }\n        ");
      }

      return styleText;
    }
  },
  watch: {
    cBaseStyle: {
      immediate: true,
      handler: function handler(styleText, old) {
        if (styleText !== old) {
          this.addStylesheet('base', styleText);
        }
      }
    },
    cResponsiveStyle: {
      immediate: true,
      handler: function handler(styleText, old) {
        if (styleText !== old) {
          this.addStylesheet('responsive', styleText);
        }
      }
    }
  },
  methods: {
    // convert width to css text
    widthText: function widthText(width) {
      if (hp.isString(width)) {
        if (width === 'auto' || width.endsWith('px')) {
          return width;
        } else {
          width = _parseFloat$1(width);
        }
      }

      if (width <= 1) {
        return "calc(100% * ".concat(width, " - ").concat(this.$parent.gutterX, "px)");
      } else {
        return "".concat(width, "px");
      }
    },
    addStylesheet: function addStylesheet(name, styleText) {
      if (!this._stylesheets) {
        this._stylesheets = {};
      }

      var sheets = this._stylesheets;

      if (sheets[name]) {
        removeEl(sheets[name]);
        delete sheets[name];
      }

      if (styleText) {
        var style = sheets[name] = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(styleText));
        var head = document.head;
        head.appendChild(style);
      }
    }
  },
  // created() {},
  // mounted() {},
  beforeDestroy: function beforeDestroy() {
    if (this._stylesheets) {
      values$1(this._stylesheets).forEach(function (el) {
        return removeEl(el);
      });

      this._stylesheets = null;
    }
  }
};

function removeEl(el) {
  el.parentNode.removeChild(el);
}

function autoPrefix(name, value) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
  var t = "".concat(name, ": ").concat(value, ";");
  var lines = [];

  if (opt.target === 'value') {
    for (var _i = 0; _i < prefixes.length; _i++) {
      var prefix = prefixes[_i];
      lines.push(t.replace(': ', ': ' + prefix));
    }
  } else {
    for (var _i2 = 0; _i2 < prefixes.length; _i2++) {
      var _prefix = prefixes[_i2];
      lines.push(_prefix + t);
    }
  }

  lines.push(t);
  return lines.join('\n');
}

/* script */
            const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-col",class:_vm.className,style:(_vm.cStyle)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Col.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Col = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
//
//
//
var script$2 = {};

/* script */
            const __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-break-row"})};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "BreakRow.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BreakRow = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

exports.Row = Row;
exports.Col = Col;
exports.BreakRow = BreakRow;
