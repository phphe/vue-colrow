/*!
 * vue-smart-layout-assistant v1.0.3
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hp = require('helper-js');

// get vue prop, return true when it is ''
function prop(vm, name) {
  if (vm[name] === '') {
    return true;
  }

  return vm[name];
}

var Row = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "layout-row"
    }, [_c('div', {
      ref: "inner",
      staticClass: "layout-row-inner"
    }, [_vm._t("default"), _c('div', {
      staticClass: "clearfix"
    })], 2)]);
  },
  staticRenderFns: [],
  props: {
    gutter: {
      default: 16,
      type: [Number, Array]
    }
  },
  // components: {},
  data: function data() {
    return {
      mounted: false,
      width: null,
      gutterX: null,
      gutterY: null,
      colsMapping: {}
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
      this.gutterX = t[0];
      this.gutterY = t[1];
    },
    // get responsive width
    getColCurrentPropWidth: function getColCurrentPropWidth(col) {
      var w = window.innerWidth;

      var prioritized = function prioritized() {
        for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
          arr[_key] = arguments[_key];
        }

        for (var _i = 0; _i < arr.length; _i++) {
          var item = arr[_i];

          if (item != null) {
            return item;
          }
        }

        return hp.arrayLast(arr);
      };

      if (w < 768) {
        return prioritized(col.xs, col.width);
      } else if (w < 992) {
        return prioritized(col.sm, col.width);
      } else if (w < 1200) {
        return prioritized(col.md, col.sm, col.width);
      } else {
        return prioritized(col.lg, col.md, col.sm, col.width);
      }
    },
    // find last col, row
    update: function update() {
      var _this = this;

      if (!this.mounted) {
        return;
      }

      var rowWidth = this.width + this.gutterX;
      var rows = [];
      var currentRow;
      var raw; // row accumulate width; row累加宽度

      var sameWidthStore = {}; // {same width name: cols}

      if (!this.$refs.inner) {
        // prevent error when hot reload npm run dev
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var el = _step.value;

          if (el.tagName === 'BR') {
            currentRow = null;
            return "continue";
          }

          if (!hp.hasClass(el, 'layout-col')) {
            return "continue";
          }

          if (!currentRow) {
            currentRow = [];
            rows.push(currentRow);
            raw = 0;
          }

          var id = el.getAttribute('data-vm-id');
          var col = _this.colsMapping[id];
          col.isFirstCol = false;
          col.isLastCol = false;
          col.isLastRow = false; //

          var cw = void 0; // col width. _realWidth. contain margin

          var setCw = function setCw(col, w) {
            if (w < 1) {
              // width is proportion; 小于1的是比例
              cw = rowWidth * w;
              col.cssWidth = cw - _this.gutterX;
            } else {
              // width is px; 指定像素
              cw = w + _this.gutterX;
              col.cssWidth = w;
            }
          };

          if (prop(col, 'sameWidth')) {
            if (sameWidthStore[col.sameWidth]) {
              var sameCols = sameWidthStore[col.sameWidth];
              sameCols.push(col);
              setCw(col, sameCols[0].cssWidth);
            } else {
              sameWidthStore[col.sameWidth] = [col];
              setCw(col, _this.getColCurrentPropWidth(col));
            }
          } else {
            var cpw = _this.getColCurrentPropWidth(col); // col prop width for current screen size


            setCw(col, cpw);
          } //


          col._realWidth = cw;
          raw += cw;

          if (raw > rowWidth) {
            currentRow = [col];
            rows.push(currentRow);
            raw = cw;
          } else {
            currentRow.push(col);
          }
        };

        for (var _iterator = this.$refs.inner.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (rows.length === 0) {
        return;
      } // when screen narrower than first col, first row is empty, so remove it


      if (rows[0].length === 0) {
        rows.shift();
      } // grow col


      var _loop2 = function _loop2() {
        var row = rows[_i2];
        row[0].isFirstCol = true;
        hp.arrayLast(row).isLastCol = true; // sort

        var restW = rowWidth; // rest width; 递减后剩余宽度

        var sorted = []; // without fixed, same-width

        row.forEach(function (col, i) {
          if (prop(col, 'fixed')) {//
          } else if (!prop(col, 'sameWidth')) {
            sorted.push(col);
            col._colIndex = i;
          }

          restW -= col._realWidth;
        });

        if (restW <= 0) {
          return "continue";
        }

        sorted.sort(function (a, b) {
          var aGrow = a.grow || 0;
          var bGrow = b.grow || 0;

          if (aGrow == bGrow) {
            return -(a._colIndex - b._colIndex);
          }

          return aGrow - bGrow;
        });
        sorted.reverse();
        var sameWidthIgnoreColNames = {}; //

        for (var _i3 = 0; _i3 < sorted.length; _i3++) {
          var col = sorted[_i3];

          if (prop(col, 'sameWidth')) {
            var swn = col.sameWidth; // 'same width' name

            if (sameWidthIgnoreColNames[swn]) {
              continue;
            }

            sameWidthIgnoreColNames[swn] = true;
            var sameCols = sameWidthStore[swn];
            var t = restW / sameCols.length;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = sameCols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var col2 = _step2.value;
                col2.cssWidth += t;
                col2._realWidth += t;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            break;
          } else {
            col.cssWidth += restW;
            col._realWidth += restW;
            break;
          }
        }
      };

      for (var _i2 = 0; _i2 < rows.length; _i2++) {
        var _ret2 = _loop2();

        if (_ret2 === "continue") continue;
      }

      hp.arrayLast(rows).forEach(function (col) {
        col.isLastRow = true;
      });
    },
    registerCol: function registerCol(colVm) {
      this.colsMapping[colVm._uid] = colVm;
      this.update();
    },
    unregisterCol: function unregisterCol(colVm) {
      delete this.colsMapping[colVm._uid];
      this.update();
    }
  },
  // created() {},
  mounted: function mounted() {
    this.mounted = true;
    this.updateWidth();
    hp.onDOM(window, 'resize', this.updateWidth);
    this.$watch('gutter', this.updateGutter, {
      deep: true,
      immediate: true
    });
    this.$watch('gutterX', this.update);
    this.$watch('gutterY', this.update);
    this.$watch('width', this.update);
    this.update();
  },
  beforeDestroy: function beforeDestroy() {
    hp.offDOM(window, 'resize', this.updateWidth);
  }
};

var Col = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "layout-col",
      style: [_vm.$parent.colStyle, _vm.colStyle],
      attrs: {
        "data-vm-id": _vm.vmId
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  props: {
    width: {
      default: 0.1,
      type: Number
    },
    fixed: {
      default: false
    },
    // fixed width
    grow: {},
    // grow priority, the front is more preferred; 扩展的优先级, 靠前的更优先
    sameWidth: {},
    // cols with same value will be set same width
    // responsive
    xs: {
      type: Number
    },
    sm: {
      type: Number
    },
    md: {
      type: Number
    },
    lg: {
      type: Number
    }
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
  // created() {},
  mounted: function mounted() {
    this.$parent.registerCol(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.$parent.unregisterCol(this);
  }
};

exports.Row = Row;
exports.Col = Col;
