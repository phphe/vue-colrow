/*!
 * vue-colrow v2.0.4
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: undefined
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.vueColrow = {}));
}(this, (function (exports) { 'use strict';

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  /*!
   * helper-js v1.4.37
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */


  var store = {}; // get global
  // `this` !== global or window because of build tool

  function glb() {
    if (store.glb) {
      return store.glb;
    } else {
      // resolve global
      var t;

      try {
        t = global;
      } catch (e) {
        t = window;
      }

      store.glb = t;
      return t;
    }
  }

  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]';
  }

  function getBoundingClientRect(el) {
    // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
    var xy = el.getBoundingClientRect();
    var top = xy.top - document.documentElement.clientTop,
        //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
    bottom = xy.bottom,
        left = xy.left - document.documentElement.clientLeft,
        //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
    right = xy.right,
        width = xy.width || right - left,
        //IE67不存在width 使用right - left获得
    height = xy.height || bottom - top;
    var x = left;
    var y = top;
    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: width,
      height: height,
      x: x,
      y: y
    };
  }


  function onDOM(el, name, handler) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
      args[_key8 - 3] = arguments[_key8];
    }

    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener.apply(el, [name, handler].concat(args));
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }

  function offDOM(el, name, handler) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
      args[_key9 - 3] = arguments[_key9];
    }

    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener.apply(el, [name, handler].concat(args));
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }

  function isWindowDefined() {
    try {
      return window && true;
    } catch (error) {
      return false;
    }
  }

  function isNode() {
    return Boolean(typeof glb().module !== 'undefined' && glb().module.exports);
  }

  // detect if need reduce col width

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


  var detectIfNeedReduceColWidth = (function () {
    return Boolean(!isNode() && isWindowDefined() && !isChrome() && !isSafari() && !isFirefox());
  });

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
        default: function _default() {
          return [config.DEFAULT_GUTTER_X, config.DEFAULT_GUTTER_Y];
        },
        type: [Number, Array]
      },
      heightCalculation: {
        type: Boolean,
        default: function _default() {
          return config.ROW_HEIGHT_CALCULATION;
        }
      },
      // responsive
      breakPoints: {
        type: Object,
        default: function _default() {
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
    data: function data() {
      var _this = this;

      return {
        gutterX: null,
        gutterY: null,
        className: "cr-row-".concat(this._uid),
        innerHeight: null,
        updateInnerHeight: function updateInnerHeight() {
          var inner = _this.$refs.inner;

          if (inner) {
            var h = getBoundingClientRect(inner).height;

            if (h !== _this.innerHeight) {
              _this.innerHeight = h;
            }
          }
        }
      };
    },
    computed: {
      styleText: function styleText() {
        var _this2 = this;

        var baseStyleText = function baseStyleText(gutterX, gutterY) {
          if (gutterX == null) {
            gutterX = _this2.gutterX;
          }

          if (gutterY == null) {
            gutterY = _this2.gutterY;
          }

          var styleText = ".".concat(_this2.className, "{\n");
          styleText += "margin-right: -".concat(gutterX, "px;");

          if (_this2.innerHeight == null) {
            styleText += "margin-bottom: -".concat(gutterY, "px;");
          } else if (_this2.innerHeight !== 0) {
            styleText += "height: ".concat(_this2.innerHeight - gutterY, "px;");
          }

          styleText += "}";
          styleText += ".".concat(_this2.className, " > .cr-row-inner{\n          width: calc(100% + ").concat(gutterX, "px);\n        }");
          return styleText;
        };

        var styleText = baseStyleText(this.gutterX, this.gutterY); // responsive

        var bp = this.breakPoints;
        var xsGutterX = this.xsGutterX,
            xsGutterY = this.xsGutterY,
            smGutterX = this.smGutterX,
            smGutterY = this.smGutterY,
            mdGutterX = this.mdGutterX,
            mdGutterY = this.mdGutterY,
            lgGutterX = this.lgGutterX,
            lgGutterY = this.lgGutterY,
            xlGutterX = this.xlGutterX,
            xlGutterY = this.xlGutterY;

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
        handler: function handler(gutter) {
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
    mounted: function mounted() {
      var _this3 = this;

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

          var callback = function callback(mutationsList, observer) {
            _this3.updateInnerHeight();
          }; // Create an observer instance linked to the callback function


          var observer = new MutationObserver(callback); // Start observing the target node for configured mutations

          observer.observe(targetNode, _config);
          this._heightCalculation_observer = observer;
        }
      }
    },
    beforeDestroy: function beforeDestroy() {
      offDOM(window, 'resize', this.updateInnerHeight);

      if (this._heightCalculation_observer) {
        var observer = this._heightCalculation_observer;
        this._heightCalculation_observer = null; // Later, you can stop observing

        observer.disconnect();
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

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

  var __vue_component__ = normalizeComponent({
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
        default: function _default() {
          return config.COL_WIDTH_REDUCE;
        }
      }
    },
    // components: {},
    data: function data() {
      return {
        className: "cr-col-".concat(this._uid)
      };
    },
    computed: {
      styleText: function styleText() {
        var _this = this;

        var baseStyleText = function baseStyleText(width, grow, gutterX, gutterY) {
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
            styles.push("width: ".concat(_this.widthText(width, gutterX), ";"));
            empty = false;
          }

          if (grow != null && grow !== false) {
            if (grow === true) {
              grow = 1;
            }

            styles.push("flex-grow: ".concat(grow, ";"));
            empty = false;
          }

          var style = ".".concat(_this.className, "{").concat(styles.join(''), "}");
          return {
            empty: empty,
            style: style
          };
        };

        var styleText = "";
        var w = this.width;

        if (w == null && !this.grow) {
          w = 1;
        }

        styleText += baseStyleText(w, this.grow, this.$parent.gutterX, this.$parent.gutterY).style; // responsive

        var bp = this.$parent.breakPoints;
        var xs = this.xs,
            xsGrow = this.xsGrow,
            sm = this.sm,
            smGrow = this.smGrow,
            md = this.md,
            mdGrow = this.mdGrow,
            lg = this.lg,
            lgGrow = this.lgGrow,
            xl = this.xl,
            xlGrow = this.xlGrow;
        var _this$$parent = this.$parent,
            xsGutterX = _this$$parent.xsGutterX,
            xsGutterY = _this$$parent.xsGutterY,
            smGutterX = _this$$parent.smGutterX,
            smGutterY = _this$$parent.smGutterY,
            mdGutterX = _this$$parent.mdGutterX,
            mdGutterY = _this$$parent.mdGutterY,
            lgGutterX = _this$$parent.lgGutterX,
            lgGutterY = _this$$parent.lgGutterY,
            xlGutterX = _this$$parent.xlGutterX,
            xlGutterY = _this$$parent.xlGutterY;
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
      widthText: function widthText(width, gutterX) {
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

  var __vue_component__$1 = normalizeComponent({
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
    data: function data() {
      return {
        className: "cr-break-row-".concat(this._uid)
      };
    },
    computed: {
      styleText: function styleText() {
        var xs = this.xs,
            sm = this.sm,
            md = this.md,
            lg = this.lg,
            xl = this.xl;

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

  var __vue_component__$2 = normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

  exports.BreakRow = __vue_component__$2;
  exports.Col = __vue_component__$1;
  exports.Row = __vue_component__;
  exports.config = config;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
