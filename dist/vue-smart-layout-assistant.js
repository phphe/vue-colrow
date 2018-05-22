/*!
 * vue-smart-layout-assistant v1.0.2
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueSmartLayoutAssistant = {})));
}(this, (function (exports) { 'use strict';

  /*!
   * helper-js v1.0.53
   * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // resolve global
  var glb;

  try {
    glb = global;
  } catch (e) {
    glb = window;
  } // local store
  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }
  function arrayLast(arr) {
    return arr[arr.length - 1];
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  } // source: http://youmightnotneedjquery.com/

  function onDOM(el, name, handler) {
    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener(name, handler);
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent("on".concat(name), handler);
    }
  }
  function offDOM(el, name, handler) {
    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener(name, handler);
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent("on".concat(name), handler);
    }
  } // advance
  var URLHelper =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this = this;

      _classCallCheck(this, URLHelper);

      Object.defineProperty(this, "baseUrl", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: ''
      });
      Object.defineProperty(this, "search", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {}
      });
      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this2 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this2.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  function makeStorageHelper(storage) {
    return {
      storage: storage,
      set: function set(name, value, minutes) {
        if (value == null) {
          this.storage.removeItem(name);
        } else {
          this.storage.setItem(name, JSON.stringify({
            value: value,
            expired_at: minutes && new Date().getTime() / 1000 + minutes * 60
          }));
        }
      },
      get: function get$$1(name) {
        var t = this.storage.getItem(name);

        if (t) {
          t = JSON.parse(t);

          if (!t.expired_at || t.expired_at > new Date().getTime()) {
            return t.value;
          } else {
            this.storage.removeItem(name);
          }
        }

        return null;
      },
      clear: function clear() {
        this.storage.clear();
      }
    };
  }
  var localStorage2 = makeStorageHelper(glb.localStorage);
  var sessionStorage2 = makeStorageHelper(glb.sessionStorage); // 事件处理

  var EventProcessor =
  /*#__PURE__*/
  function () {
    function EventProcessor() {
      _classCallCheck(this, EventProcessor);

      Object.defineProperty(this, "eventStore", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: []
      });
    }

    _createClass(EventProcessor, [{
      key: "on",
      value: function on(name, handler) {
        this.eventStore.push({
          name: name,
          handler: handler
        });
      }
    }, {
      key: "once",
      value: function once(name, handler) {
        var _this3 = this;

        var off = function off() {
          _this3.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler();
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "off",
      value: function off(name, handler) {
        var indexes = []; // to remove indexes; reverse; 倒序的

        var len = this.eventStore.length;

        for (var i = 0; i < len; i++) {
          var item = this.eventStore[i];

          if (item.name === name && item.handler === handler) {
            indexes.unshift(i);
          }
        }

        for (var _i4 = 0; _i4 < indexes.length; _i4++) {
          var index = indexes[_i4];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.eventStore[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          var _item = items[_i5];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindow =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindow, _EventProcessor);

    function CrossWindow() {
      var _this4;

      _classCallCheck(this, CrossWindow);

      _this4 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized(_this4), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM(window, 'storage', function (ev) {
          if (ev.key === _this4.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this4))).call.apply(_get2, [_this4, event.name].concat(_toConsumableArray(event.args)));
          }
        });
      }

      return _this4;
    }

    _createClass(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb.localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }]);

    return CrossWindow;
  }(EventProcessor);

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
        var t = isArray(gutter) ? gutter : [gutter, gutter];
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

          return arrayLast(arr);
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

            if (!hasClass(el, 'layout-col')) {
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

            if (col.sameWidth) {
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
          arrayLast(row).isLastCol = true; // sort

          var restW = rowWidth; // rest width; 递减后剩余宽度

          var sorted = []; // without fixed, same-width

          row.forEach(function (col, i) {
            if (col.fixed) {//
            } else if (!col.sameWidth) {
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

            if (col.sameWidth) {
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

        arrayLast(rows).forEach(function (col) {
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
      onDOM(window, 'resize', this.updateWidth);
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
      offDOM(window, 'resize', this.updateWidth);
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
