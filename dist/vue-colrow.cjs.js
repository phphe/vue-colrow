/*!
 * vue-colrow v1.1.6
 * (c) 2019-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var promise = _interopDefault(require('core-js/library/fn/promise'));
var _parseInt = _interopDefault(require('core-js/library/fn/parse-int'));
var _parseFloat = _interopDefault(require('core-js/library/fn/parse-float'));
var getIterator = _interopDefault(require('core-js/library/fn/get-iterator'));
require('core-js/modules/es6.number.constructor');
require('core-js/modules/es6.string.ends-with');
require('core-js/modules/web.dom.iterable');
require('regenerator-runtime/runtime');
var hp = require('helper-js');
var vf = require('vue-functions');

var promise$1 = promise;

var _parseInt$1 = _parseInt;

var _parseFloat$1 = _parseFloat;

var getIterator$1 = getIterator;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise$1.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise$1(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var update =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _this = this;

    var rowWidth, rows, currentRow, raw, growExisted, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, _i, row, restW, growCol, lastCol, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.mountedPromise;

          case 2:
            this.updateWidth();
            rowWidth = this.width + this.gutterX;
            rows = [];

            if (this.$refs.inner) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            // row只允许一个grow col
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;

            _loop = function _loop() {
              var el = _step.value;

              if (el.tagName === 'BR') {
                // new row
                currentRow = null;
                return "continue";
              }

              if (hp.hasClass(el, 'clearfix')) {
                // don't add .clearfix as row child
                return "continue";
              }

              if (!hp.hasClass(el, 'cr-col')) {
                console.error("Only Col, br can be child of Row. Wrong element:", el);
              }

              var id = el.getAttribute('data-vm-id');
              var col = _this.colsMapping[id];
              col.isFirstCol = false;
              col.isLastCol = false;
              col.isLastRow = false;

              if (vf.isPropTrue(col.grow)) {
                if (growExisted) {
                  // new row
                  currentRow = null;
                } else {
                  growExisted = true;
                }
              } //


              if (!currentRow) {
                // new row
                growExisted = false;
                currentRow = [];
                rows.push(currentRow);
                raw = 0;
              } //


              var cw = void 0; // col width. _realWidth. contain margin

              var setCw = function setCw(col, w) {
                var isPx;

                if (hp.isString(w)) {
                  if (w.endsWith('px')) {
                    isPx = true;
                  }

                  w = _parseFloat$1(w);
                }

                if (!isPx && w <= 1) {
                  // width is proportion; 小于等于1的是比例
                  cw = _parseInt$1(rowWidth * w);
                  cw = cw > rowWidth ? rowWidth : cw; // col max width is 100%

                  col.cssWidth = cw - _this.gutterX;
                } else {
                  // width is px; 指定像素
                  cw = w + _this.gutterX;
                  cw = cw > rowWidth ? rowWidth : cw; // col max width is 100%

                  col.cssWidth = w;
                }
              };

              var restW = rowWidth - raw;

              var cpw = _this.getColCurrentPropWidth(col, rowWidth, restW); // col prop width for current screen size


              setCw(col, cpw); //

              col._realWidth = cw;
              raw += cw;

              if (raw > rowWidth) {
                // new row
                growExisted = false;
                currentRow = [col];
                rows.push(currentRow);
                raw = cw;
              } else {
                currentRow.push(col);
              }
            };

            _iterator = getIterator$1(this.$refs.inner.children);

          case 13:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 20;
              break;
            }

            _ret = _loop();

            if (!(_ret === "continue")) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("continue", 17);

          case 17:
            _iteratorNormalCompletion = true;
            _context.next = 13;
            break;

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 26:
            _context.prev = 26;
            _context.prev = 27;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 29:
            _context.prev = 29;

            if (!_didIteratorError) {
              _context.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context.finish(29);

          case 33:
            return _context.finish(26);

          case 34:
            if (!(rows.length !== 0)) {
              _context.next = 58;
              break;
            }

            // when screen narrower than first col, first row is empty, so remove it
            if (rows[0].length === 0) {
              rows.shift();
            } // grow col


            for (_i = 0; _i < rows.length; _i++) {
              row = rows[_i];
              row[0].isFirstCol = true;
              hp.arrayLast(row).isLastCol = true; // sort

              restW = rowWidth; // rest width; 递减后剩余宽度

              growCol = void 0;
              row.forEach(function (col, i) {
                if (vf.isPropTrue(col.grow)) {
                  growCol = col;
                }

                restW -= col._realWidth;
              });

              if (growCol) {
                growCol.cssWidth += restW;
                growCol._realWidth += restW;
              } else if (restW <= 3) {
                // 当剩下3px以内的剩余时, 加到最后一列上
                lastCol = hp.arrayLast(row);
                lastCol.cssWidth += restW;
                lastCol._realWidth += restW;
              }
            }

            hp.arrayLast(rows).forEach(function (col) {
              col.isLastRow = true;
            });
            this.$emit('updated', this); // update children row

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 42;

            for (_iterator2 = getIterator$1(this.childrenRows); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              child = _step2.value;
              child.update();
            }

            _context.next = 50;
            break;

          case 46:
            _context.prev = 46;
            _context.t1 = _context["catch"](42);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 50:
            _context.prev = 50;
            _context.prev = 51;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 53:
            _context.prev = 53;

            if (!_didIteratorError2) {
              _context.next = 56;
              break;
            }

            throw _iteratorError2;

          case 56:
            return _context.finish(53);

          case 57:
            return _context.finish(50);

          case 58:
            this.$nextTick(function () {
              _this.inited = true;
            });

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 22, 26, 34], [27,, 29, 33], [42, 46, 50, 58], [51,, 53, 57]]);
  }));

  return function update() {
    return _ref.apply(this, arguments);
  };
}();

var DEFAULT_GUTTER = 16;
var script = {
  isColRow_row: true,
  props: {
    gutter: {
      default: DEFAULT_GUTTER,
      type: [Number, Array]
    }
  },
  // components: {},
  data: function data() {
    var _this2 = this;

    return {
      mountedPromise: new promise$1(function (resolve, reject) {
        _this2._mountedResolve = resolve;
      }),
      width: null,
      gutterX: null,
      gutterY: null,
      colsMapping: {},
      inited: false,
      // structure
      parentRow: null,
      childrenRows: []
    };
  },
  computed: {
    colStyle: function colStyle() {
      return {
        marginRight: this.gutterX + 'px',
        marginBottom: this.gutterY + 'px'
      };
    }
  },
  // watch: {},
  methods: {
    updateWidth: function updateWidth() {
      this.width = this.$el.offsetWidth;
    },
    updateGutter: function updateGutter() {
      var gutter = this.gutter;
      var t = hp.isArray(gutter) ? gutter : [gutter, gutter];

      if (t[0] == null) {
        t[0] = DEFAULT_GUTTER;
      }

      if (t[1] == null) {
        t[1] = DEFAULT_GUTTER;
      }

      this.gutterX = t[0];
      this.gutterY = t[1];
    },
    getColWidthProp: function getColWidthProp(col) {
      if (col.width === 'auto') {
        if (vf.isPropTrue(col.grow)) {
          return '1px';
        } else {
          return 1;
        }
      } else {
        return col.width;
      }
    },
    // get responsive width
    getColCurrentPropWidth: function getColCurrentPropWidth(col, rowWidth, restW) {
      var w = window.innerWidth;
      var cw = this.getColWidthProp(col);
      var r;

      if (w < 768) {
        r = getPrioritized(col.xs, cw);
      } else if (w < 992) {
        r = getPrioritized(col.sm, cw);
      } else if (w < 1200) {
        r = getPrioritized(col.md, col.sm, cw);
      } else {
        r = getPrioritized(col.lg, col.md, col.sm, cw);
      }

      if (hp.isFunction(r)) {
        return r(rowWidth, restW);
      }

      return r;
    },
    // find last col, row
    update: update,
    // updateDebounced,
    registerCol: function registerCol(colVm) {
      this.colsMapping[colVm._uid] = colVm;
      this.updateDebounced();
    },
    unregisterCol: function unregisterCol(colVm) {
      delete this.colsMapping[colVm._uid];
      this.updateDebounced();
    },
    findParentRow: function findParentRow() {
      var parentRow = this;

      while (true) {
        parentRow = parentRow.$parent;

        if (!parentRow || parentRow.$options.isColRow_row) {
          break;
        }
      }

      if (parentRow) {
        this.parentRow = parentRow;
        this.parentRow.childrenRows.push(this);
      }
    }
  },
  created: function created() {
    this.updateDebounced = hp.debounce(update);
    this.findParentRow();
  },
  mounted: function mounted() {
    var _this3 = this;

    this._mountedResolve();

    this.$watch('gutter', this.updateGutter, {
      deep: true,
      immediate: true
    });
    this.$watch('gutterX', this.updateDebounced);
    this.$watch('gutterY', this.updateDebounced); //

    this.onresize = function (e) {
      if (!_this3.parentRow) {
        _this3.update();
      }
    };

    hp.onDOM(window, 'resize', this.onresize); //

    if (!this.parentRow) {
      this.update();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentRow) {
      hp.arrayRemove(this.parentRow.childrenRows, this);
    }

    if (this.onresize) {
      hp.offDOM(window, 'resize', this.onresize);
    }
  }
};

function getPrioritized() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  for (var _i2 = 0; _i2 < arr.length; _i2++) {
    var item = arr[_i2];

    if (item != null) {
      return item;
    }
  }

  return hp.arrayLast(arr);
}

/* script */
            const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-row",class:{'cr-row-cloak': !_vm.inited}},[_c('div',{ref:"inner",staticClass:"cr-row-inner"},[_vm._t("default"),_c('div',{staticClass:"clearfix"})],2)])};
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

//
var script$1 = {
  props: {
    width: {
      default: 'auto'
    },
    grow: {},
    // responsive
    xs: {},
    sm: {},
    md: {},
    lg: {}
  },
  components: {},
  data: function data() {
    return {
      vmId: this._uid,
      cssWidth: null,
      isFirstCol: false,
      isLastCol: false,
      isLastRow: false
    };
  },
  computed: {
    colStyle: function colStyle() {
      var r = {
        width: this.cssWidth + 'px'
      };

      if (this.isFirstCol) {
        r.clear = 'both';
      }

      if (this.isLastCol) {
        r.marginRight = '0';
      }

      if (this.isLastRow) {
        r.marginBottom = '0';
      }

      return r;
    }
  },
  // watch: {},
  // methods: {},
  created: function created() {
    this.$parent.registerCol(this);
  },
  // mounted() {},
  beforeDestroy: function beforeDestroy() {
    this.$parent.unregisterCol(this);
  }
};

/* script */
            const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-col",style:([_vm.$parent.colStyle, _vm.colStyle]),attrs:{"data-vm-id":_vm.vmId,"isLastCol":_vm.isLastCol}},[_vm._t("default")],2)};
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

exports.Row = Row;
exports.Col = Col;
