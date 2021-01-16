// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Page.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Page =
/** @class */
function () {
  function Page(name) {
    this.name = name;
    this._html = "";
  }

  Object.defineProperty(Page.prototype, "html", {
    get: function get() {
      return this._html;
    },
    set: function set(html) {
      this._html = html;
    },
    enumerable: false,
    configurable: true
  });

  Page.prototype.preRender = function () {};

  Page.prototype.postRender = function () {};

  Page.prototype.render = function (html) {
    this.preRender(); //html.empty();

    html.html(this.html);
    this.postRender();
  };

  return Page;
}();

exports.default = Page;
},{}],"pages/QuestionPage.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Page_1 = __importDefault(require("../Page"));

var QuestionPage =
/** @class */
function (_super) {
  __extends(QuestionPage, _super);

  function QuestionPage(question, questionType) {
    var _this = _super.call(this, "Question") || this;

    _this._category = "";
    _this._pageNumber = 0;
    _this.type = questionType;
    _this.question = question;
    _this.html = "\n        <h1 class=\"questionCategory\"></h1>\n        <h2 class=\"questionNumber\"></h2>\n        <p>" + question + "</p>\n        <button class=\"previousQuestion\">Prev.</button>\n        <button class=\"skipQuestion\">Skip</button>";
    return _this;
  }

  QuestionPage.prototype.updatePageName = function () {
    this.name = this._category + " Question " + this._pageNumber;
  };

  QuestionPage.prototype.category = function (category) {
    this._category = category;
    this.updatePageName();
    return this;
  };

  QuestionPage.prototype.number = function (pageNumber) {
    this._pageNumber = pageNumber;
    this.updatePageName();
    return this;
  };

  QuestionPage.prototype.onNextQuestion = function (nextCallback) {
    this.nextCallback = nextCallback;
    return this;
  };

  QuestionPage.prototype.onPrevQuestion = function (prevCallback) {
    this.prevCallback = prevCallback;
    return this;
  };

  QuestionPage.prototype.postRender = function () {
    $("h1.questionCategory").text(this._category);
    $("h2.questionNumber").text("Question " + this._pageNumber);
    $("button.skipQuestion").on('click', this.nextCallback);
    $("button.prevQuestion").on('click', this.prevCallback);
  };

  return QuestionPage;
}(Page_1.default);

exports.default = QuestionPage;
},{"../Page":"Page.ts"}],"pages/ResultsPage.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Page_1 = __importDefault(require("../Page"));

var ResultsPage =
/** @class */
function (_super) {
  __extends(ResultsPage, _super);

  function ResultsPage(results) {
    var _this = _super.call(this, "Results") || this;

    _this.results = results;
    return _this;
  }

  return ResultsPage;
}(Page_1.default);

exports.default = ResultsPage;
},{"../Page":"Page.ts"}],"pages/WelcomePage.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Page_1 = __importDefault(require("../Page"));

var WelcomePage =
/** @class */
function (_super) {
  __extends(WelcomePage, _super);

  function WelcomePage() {
    var _this = _super.call(this, "Welcome") || this;

    _this.html = "<h1>Welcome to the Beemer Test!</h1>\n        <p>Welcome! This test will measure the level of \"Beemer\" you are. You will be given a percentage result based on how similar you are to Beemer,\n        along with a short analysis of what it should mean to be around your resulting percentage.<br />Click the start button below to begin!</p>\n        <button id=\"startButton\">Start</button>";
    return _this;
  }

  WelcomePage.prototype.onBeginClicked = function (callback) {
    this.beginCallback = callback;
    return this;
  };

  WelcomePage.prototype.preRender = function () {};

  WelcomePage.prototype.postRender = function () {
    $("button#startButton").on('click', this.beginCallback);
  };

  return WelcomePage;
}(Page_1.default);

exports.default = WelcomePage;
},{"../Page":"Page.ts"}],"Paginator.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Page_1 = __importDefault(require("./Page"));

var Paginator =
/** @class */
function () {
  function Paginator() {
    this.pages = [];
    this.index = 0;
  }

  Paginator.prototype.addPages = function () {
    var _this = this;

    var pages = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      pages[_i] = arguments[_i];
    }

    if (pages.length <= 0) throw "addPages cannot be called with 0 args";
    pages.forEach(function (page) {
      if (typeof page === 'string') _this.pages.push(new Page_1.default(page));else _this.pages.push(page);
    });
  };

  Paginator.prototype.nextPage = function () {
    if (this.index === this.pages.length - 1) return;
    this.index = this.index + 1;
  };

  Paginator.prototype.prevPage = function () {
    if (this.index === 0) return;
    this.index = this.index - 1;
  };

  Paginator.prototype.finished = function () {
    return this.index === this.pages.length - 1;
  };

  Paginator.prototype.preRender = function (html) {};

  Paginator.prototype.postRender = function (html) {};

  Paginator.prototype.render = function (html) {
    this.preRender(html);
    this.pages[this.index].render(html);
    this.postRender(html);
  };

  Paginator.prototype.renderPage = function (html, page) {
    page.render(html);
  };

  return Paginator;
}();

exports.default = Paginator;
},{"./Page":"Page.ts"}],"Question.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionType = void 0;
var QuestionType;

(function (QuestionType) {
  QuestionType[QuestionType["YesNo"] = 0] = "YesNo";
  QuestionType[QuestionType["Scale"] = 1] = "Scale";
  QuestionType[QuestionType["AgreeDisagree"] = 2] = "AgreeDisagree";
  QuestionType[QuestionType["SelectAllThatApply"] = 3] = "SelectAllThatApply";
  QuestionType[QuestionType["RankOrder"] = 4] = "RankOrder";
  QuestionType[QuestionType["MultipleChoice"] = 5] = "MultipleChoice";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));

;
},{}],"QuestionPaginator.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Paginator_1 = __importDefault(require("./Paginator"));

var QuestionPaginator =
/** @class */
function (_super) {
  __extends(QuestionPaginator, _super);

  function QuestionPaginator(category) {
    var _this = _super.call(this) || this;

    _this.category = category;
    return _this;
  }

  QuestionPaginator.prototype.addPages = function () {
    var _this = this;

    var pages = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      pages[_i] = arguments[_i];
    }

    if (pages.length <= 0) throw "addPages cannot be called with 0 args";

    for (var i = 0; i < pages.length; i++) {
      var page = pages[i].category(this.category).number(i + 1);
      page.onNextQuestion(function () {
        return _this.nextPage();
      });
      page.onPrevQuestion(function () {
        return _this.prevPage();
      });
      this.pages.push(page);
    }
  };

  QuestionPaginator.prototype.postRender = function (html) {};

  return QuestionPaginator;
}(Paginator_1.default);

exports.default = QuestionPaginator;
},{"./Paginator":"Paginator.ts"}],"BeemerTest.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var QuestionPage_1 = __importDefault(require("./pages/QuestionPage"));

var ResultsPage_1 = __importDefault(require("./pages/ResultsPage"));

var WelcomePage_1 = __importDefault(require("./pages/WelcomePage"));

var Paginator_1 = __importDefault(require("./Paginator"));

var Question_1 = require("./Question");

var QuestionPaginator_1 = __importDefault(require("./QuestionPaginator"));

var BeemerTest =
/** @class */
function () {
  function BeemerTest() {
    var _this = this;

    this.finished = false;
    this.paginator = new Paginator_1.default();
    $("body").append("<div class='beemer-test'></div>");
    this.html = $("div.beemer-test");
    this.identity = new QuestionPaginator_1.default("Identity");
    this.past = new QuestionPaginator_1.default("Past");
    this.career = new QuestionPaginator_1.default("Career");
    this.sexlife = new QuestionPaginator_1.default("Sexlife");
    this.future = new QuestionPaginator_1.default("Future");
    this.hypothetical = new QuestionPaginator_1.default("Hypothetical");
    this.addIdentityPages();
    this.paginator.renderPage(this.html, new WelcomePage_1.default().onBeginClicked(function () {
      _this.paginator = _this.identity;

      _this.paginator.render(_this.html);
    }));
  }

  BeemerTest.prototype.addIdentityPages = function () {
    var _a;

    var pages = [new QuestionPage_1.default("Test Question", Question_1.QuestionType.YesNo)];

    (_a = this.identity).addPages.apply(_a, pages);
  };

  BeemerTest.prototype.nextCategory = function () {
    if (this.paginator === this.identity) this.paginator = this.past;else if (this.paginator == this.past) this.paginator = this.career;else if (this.paginator == this.career) this.paginator = this.sexlife;else if (this.paginator == this.sexlife) this.paginator = this.future;else if (this.paginator == this.future) this.paginator = this.hypothetical;else if (this.paginator == this.hypothetical) this.paginator.renderPage(this.html, new ResultsPage_1.default(this.getResults()));
  };

  BeemerTest.prototype.nextQuestion = function () {
    if (this.paginator.finished() && !this.finished) {
      this.nextCategory();
      return;
    }

    this.paginator.nextPage();
  };

  BeemerTest.prototype.getResults = function () {
    return 0;
  };

  return BeemerTest;
}();

exports.default = BeemerTest;
},{"./pages/QuestionPage":"pages/QuestionPage.ts","./pages/ResultsPage":"pages/ResultsPage.ts","./pages/WelcomePage":"pages/WelcomePage.ts","./Paginator":"Paginator.ts","./Question":"Question.ts","./QuestionPaginator":"QuestionPaginator.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BeemerTest_1 = __importDefault(require("./BeemerTest"));

var test = new BeemerTest_1.default();
},{"./BeemerTest":"BeemerTest.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60071" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map