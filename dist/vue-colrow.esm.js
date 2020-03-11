/*!
 * vue-colrow v2.0.1
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
import { getBoundingClientRect, isArray, onDOM, offDOM, isNumber } from 'helper-js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs';

// detect if need reduce col width
// detect browsers, from: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
function isNode() {
  return typeof module !== 'undefined' && module.exports;
}

function isFirefox() {
  return typeof InstallTrigger !== 'undefined';
} // Safari 3.0+ "[object HTMLElementConstructor]" 


function isSafari() {
  return /constructor/i.test(window.HTMLElement) || function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  }(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification); // eslint-disable-line no-undef
} // Chrome 1 - 79


function isChrome() {
  return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
} // detect by DOM
// const div = document.createElement('div')
// document.body.appendChild(div)
// div.style.width='calc(1000px / 7)'
// const w = hp.getBoundingClientRect(div).width
// if (w * 7 > 1000) {
//   _ifNeedReduceColWidth = true
// }
// hp.removeEl(div)


var detectIfNeedReduceColWidth = (() => Boolean(!isNode() && !isChrome() && !isSafari() && !isFirefox()));

//
var ifNeedReduceColWidth = detectIfNeedReduceColWidth();
var config = {
  DEFAULT_GUTTER_X: 16,
  DEFAULT_GUTTER_Y: 16,
  COL_WIDTH_REDUCE: 0.09,
  // for some browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200
  },
  ROW_HEIGHT_CALCULATION: true
};
var script = {
  DEFAULT_GUTTER: 16,
  COL_WIDTH_REDUCE: 0.09,
  // for some browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200
  },
  ROW_HEIGHT_CALCULATION: true,
  props: {
    gutter: {
      default() {
        return [config.DEFAULT_GUTTER_X, config.DEFAULT_GUTTER_Y];
      },

      type: [Number, Array]
    },
    heightCalculation: {
      type: Boolean,

      default() {
        return config.ROW_HEIGHT_CALCULATION;
      }

    },
    // responsive
    breakPoints: {
      type: Object,

      default() {
        return config.BREAK_POINTS;
      }

    },
    xsGutterX: {
      type: Number
    },
    xsGutterY: {
      type: Number
    },
    smGutterX: {
      type: Number
    },
    smGutterY: {
      type: Number
    },
    mdGutterX: {
      type: Number
    },
    mdGutterY: {
      type: Number
    },
    lgGutterX: {
      type: Number
    },
    lgGutterY: {
      type: Number
    },
    xlGutterX: {
      type: Number
    },
    xlGutterY: {
      type: Number
    }
  },

  // components: {},
  data() {
    return {
      gutterX: null,
      gutterY: null,
      className: "cr-row-".concat(this._uid),
      innerHeight: null,
      updateInnerHeight: () => {
        var {
          inner
        } = this.$refs;

        if (inner) {
          var h = getBoundingClientRect(inner).height;

          if (h !== this.innerHeight) {
            this.innerHeight = h;
          }
        }
      }
    };
  },

  computed: {
    styleText() {
      var baseStyleText = (gutterX, gutterY) => {
        if (gutterX == null) {
          gutterX = this.gutterX;
        }

        if (gutterY == null) {
          gutterY = this.gutterY;
        }

        var styleText = ".".concat(this.className, "{\n");
        styleText += "margin-right: -".concat(gutterX, "px;");

        if (this.innerHeight == null) {
          styleText += "margin-bottom: -".concat(gutterY, "px;");
        } else if (this.innerHeight !== 0) {
          styleText += "height: ".concat(this.innerHeight - gutterY, "px;");
        }

        styleText += "}";
        styleText += ".".concat(this.className, " > .cr-row-inner{\n          width: calc(100% + ").concat(gutterX, "px);\n        }");
        return styleText;
      };

      var styleText = baseStyleText(this.gutterX, this.gutterY); // responsive

      var bp = this.breakPoints;
      var {
        xsGutterX,
        xsGutterY,
        smGutterX,
        smGutterY,
        mdGutterX,
        mdGutterY,
        lgGutterX,
        lgGutterY,
        xlGutterX,
        xlGutterY
      } = this;

      if (xsGutterX != null || xsGutterY != null) {
        styleText += "@media (max-width: ".concat(bp.xs, "px) {").concat(baseStyleText(xsGutterX, xsGutterY), "}");
      }

      if (smGutterX != null || smGutterY != null) {
        styleText += "@media (min-width: ".concat(bp.xs, "px) {").concat(baseStyleText(smGutterX, smGutterY), "}");
      }

      if (mdGutterX != null || mdGutterY != null) {
        styleText += "@media (min-width: ".concat(bp.sm, "px) {").concat(baseStyleText(mdGutterX, mdGutterY), "}");
      }

      if (lgGutterX != null || lgGutterY != null) {
        styleText += "@media (min-width: ".concat(bp.md, "px) {").concat(baseStyleText(lgGutterX, lgGutterY), "}");
      }

      if (xlGutterX != null || xlGutterY != null) {
        styleText += "@media (min-width: ".concat(bp.lg, "px) {").concat(baseStyleText(xlGutterX, xlGutterY), "}");
      } // 


      return "<style type=\"text/css\">".concat(styleText, "</style>").replace(/\n/g, '');
    }

  },
  watch: {
    gutter: {
      immediate: true,
      deep: true,

      handler(gutter) {
        var t = isArray(gutter) ? gutter : [gutter, gutter];

        if (t[0] == null) {
          t[0] = config.DEFAULT_GUTTER_X;
        }

        if (t[1] == null) {
          t[1] = config.DEFAULT_GUTTER_Y;
        }

        this.gutterX = t[0];
        this.gutterY = t[1];
      }

    }
  },

  // methods: {},
  // created() {},
  mounted() {
    if (this.heightCalculation) {
      this.updateInnerHeight();
      onDOM(window, 'resize', this.updateInnerHeight);

      if (window.MutationObserver && !this._heightCalculation_observer) {
        // Select the node that will be observed for mutations
        var targetNode = document.body.parentElement; // Options for the observer (which mutations to observe)

        var _config = {
          attributes: true,
          childList: true,
          subtree: true
        }; // Callback function to execute when mutations are observed

        var callback = (mutationsList, observer) => {
          this.updateInnerHeight();
        }; // Create an observer instance linked to the callback function


        var observer = new MutationObserver(callback); // Start observing the target node for configured mutations

        observer.observe(targetNode, _config);
        this._heightCalculation_observer = observer;
      }
    }
  },

  beforeDestroy() {
    offDOM(window, 'resize', this.updateInnerHeight);

    if (this._heightCalculation_observer) {
      var observer = this._heightCalculation_observer;
      this._heightCalculation_observer = null; // Later, you can stop observing

      observer.disconnect();
    }
  }

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
    class: _vm.className
  }, [_c("div", {
    ref: "inner",
    staticClass: "cr-row-inner"
  }, [_vm._t("default")], 2), _c("div", {
    staticClass: "cr-dynamic-style",
    staticStyle: {
      display: "none"
    },
    domProps: {
      innerHTML: _vm._s(_vm.styleText)
    }
  })]);
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
var script$1 = {
  props: {
    width: {
      type: [Number, String]
    },
    // default 1; default 1.1 if grow
    grow: {
      type: [Boolean, Number]
    },
    // responsive
    xs: {
      type: [Number, String]
    },
    xsGrow: {
      type: [Boolean, Number]
    },
    sm: {
      type: [Number, String]
    },
    smGrow: {
      type: [Boolean, Number]
    },
    md: {
      type: [Number, String]
    },
    mdGrow: {
      type: [Boolean, Number]
    },
    lg: {
      type: [Number, String]
    },
    lgGrow: {
      type: [Boolean, Number]
    },
    xl: {
      type: [Number, String]
    },
    xlGrow: {
      type: [Boolean, Number]
    },
    colWidthReduce: {
      type: Number,

      default() {
        return config.COL_WIDTH_REDUCE;
      }

    }
  },

  // components: {},
  data() {
    return {
      className: "cr-col-".concat(this._uid)
    };
  },

  computed: {
    styleText() {
      var baseStyleText = (width, grow, gutterX, gutterY) => {
        var empty = true;
        var styles = [];

        if (gutterX != null) {
          styles.push("margin-right: ".concat(gutterX, "px;"));
          empty = false;
        }

        if (gutterY != null) {
          styles.push("margin-bottom: ".concat(gutterY, "px;"));
          empty = false;
        }

        if (width == null && grow) {
          width = 2;
        }

        if (width != null || gutterX != null) {
          styles.push("width: ".concat(this.widthText(width, gutterX), ";"));
          empty = false;
        }

        if (grow != null && grow !== false) {
          if (grow === true) {
            grow = 1;
          }

          styles.push("flex-grow: ".concat(grow, ";"));
          empty = false;
        }

        var style = ".".concat(this.className, "{").concat(styles.join(''), "}");
        return {
          empty,
          style
        };
      };

      var styleText = "";
      var w = this.width;

      if (w == null && !this.grow) {
        w = 1;
      }

      styleText += baseStyleText(w, this.grow, this.$parent.gutterX, this.$parent.gutterY).style; // responsive

      var bp = this.$parent.breakPoints;
      var {
        xs,
        xsGrow,
        sm,
        smGrow,
        md,
        mdGrow,
        lg,
        lgGrow,
        xl,
        xlGrow
      } = this;
      var {
        xsGutterX,
        xsGutterY,
        smGutterX,
        smGutterY,
        mdGutterX,
        mdGutterY,
        lgGutterX,
        lgGutterY,
        xlGutterX,
        xlGutterY
      } = this.$parent;
      var t;
      t = baseStyleText(xs, xsGrow, xsGutterX, xsGutterY);

      if (!t.empty) {
        styleText += "\n          @media (max-width: ".concat(bp.xs, "px) {\n            ").concat(t.style, "\n          }\n        ");
      }

      t = baseStyleText(sm, smGrow, smGutterX, smGutterY);

      if (!t.empty) {
        styleText += "\n          @media (min-width: ".concat(bp.xs, "px) {\n            ").concat(t.style, "\n          }\n        ");
      }

      t = baseStyleText(md, mdGrow, mdGutterX, mdGutterY);

      if (!t.empty) {
        styleText += "\n          @media (min-width: ".concat(bp.sm, "px) {\n            ").concat(t.style, "\n          }\n        ");
      }

      t = baseStyleText(lg, lgGrow, lgGutterX, lgGutterY);

      if (!t.empty) {
        styleText += "\n          @media (min-width: ".concat(bp.md, "px) {\n            ").concat(t.style, "\n          }\n        ");
      }

      t = baseStyleText(xl, xlGrow, xlGutterX, xlGutterY);

      if (!t.empty) {
        styleText += "\n          @media (min-width: ".concat(bp.lg, "px) {\n            ").concat(t.style, "\n          }\n        ");
      } // 


      return "<style type=\"text/css\">".concat(styleText, "</style>").replace(/\n/g, '');
    }

  },
  // watch: {},
  methods: {
    // convert width to css text
    widthText(width, gutterX) {
      if (width == null) {
        width = this.width;
      }

      if (gutterX == null) {
        gutterX = this.$parent.gutterX;
      }

      if (isNumber(width)) {
        if (width <= 1) {
          var reduce = ifNeedReduceColWidth ? " - ".concat(this.colWidthReduce, "px") : '';
          return "calc(100% * ".concat(width, " - ").concat(gutterX, "px").concat(reduce, ")");
        } else {
          return "".concat(width, "px");
        }
      } else {
        return width; // such as 100px, 100em, 10cm
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
    class: _vm.className
  }, [_vm._t("default"), _c("div", {
    staticClass: "cr-dynamic-style",
    staticStyle: {
      display: "none"
    },
    domProps: {
      innerHTML: _vm._s(_vm.styleText)
    }
  })], 2);
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
var script$2 = {
  props: {
    xs: {
      type: Boolean
    },
    sm: {
      type: Boolean
    },
    md: {
      type: Boolean
    },
    lg: {
      type: Boolean
    },
    xl: {
      type: Boolean
    }
  },

  data() {
    return {
      className: "cr-break-row-".concat(this._uid)
    };
  },

  computed: {
    styleText() {
      var {
        xs,
        sm,
        md,
        lg,
        xl
      } = this;

      if (xs || sm || md || lg || xl) {
        var styleText = ".".concat(this.className, "{display: none;}");
        var bp = this.$parent.breakPoints;

        if (xs) {
          styleText += "\n            @media (max-width: ".concat(bp.xs, "px){\n              .").concat(this.className, "{display: block;}\n            }\n          ");
        }

        if (sm) {
          styleText += "\n            @media (max-width: ".concat(bp.sm, "px) and (min-width: ").concat(bp.xs, "px){\n              .").concat(this.className, "{display: block;}\n            }\n          ");
        }

        if (md) {
          styleText += "\n            @media (max-width: ".concat(bp.md, "px) and (min-width: ").concat(bp.sm, "px){\n              .").concat(this.className, "{display: block;}\n            }\n          ");
        }

        if (lg) {
          styleText += "\n            @media (max-width: ".concat(bp.lg, "px) and (min-width: ").concat(bp.md, "px){\n              .").concat(this.className, "{display: block;}\n            }\n          ");
        }

        if (xl) {
          styleText += "\n            @media (min-width: ".concat(bp.lg, "px){\n              .").concat(this.className, "{display: block;}\n            }\n          ");
        }

        return "<style type=\"text/css\">".concat(styleText, "</style>").replace(/\n/g, '');
      }
    }

  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "cr-break-row",
    class: _vm.className
  }, [_c("div", {
    staticClass: "cr-dynamic-style",
    staticStyle: {
      display: "none"
    },
    domProps: {
      innerHTML: _vm._s(_vm.styleText)
    }
  })]);
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

export { __vue_component__$2 as BreakRow, __vue_component__$1 as Col, __vue_component__ as Row, config };
