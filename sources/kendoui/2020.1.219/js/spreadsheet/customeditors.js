module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1533);
	module.exports = __webpack_require__(1533);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

	module.exports = require("../kendo.core");

/***/ }),

/***/ 929:
/***/ (function(module, exports) {

	module.exports = require("../kendo.popup");

/***/ }),

/***/ 1009:
/***/ (function(module, exports) {

	module.exports = require("../kendo.listview");

/***/ }),

/***/ 1533:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(20), __webpack_require__(929), __webpack_require__(1534), __webpack_require__(1009), __webpack_require__(1535) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function(kendo) {

	    "use strict";

	    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
	        return;
	    }

	    // jshint eqnull:true

	    var $ = kendo.jQuery;

	    var EDITORS = {};

	    var registerEditor = kendo.spreadsheet.registerEditor = function(name, editor) {
	        EDITORS[name] = editor;
	    };

	    kendo.spreadsheet.Sheet.prototype.activeCellCustomEditor = function() {
	        var cell = this.activeCell().first();

	        if (this.range(cell).enable()) {
	            var val = this.validation(cell);
	            var key = this._properties.get("editor", this._grid.cellRefIndex(cell));
	            var editor;

	            if (key != null) {
	                editor = EDITORS[key];
	            }
	            else if (val && val.showButton) {
	                key = "_validation_" + val.dataType;
	                editor = EDITORS[key];
	            }

	            if (typeof editor == "function") {
	                editor = EDITORS[key] = editor();
	            }

	            return editor;
	        }
	    };

	    registerEditor("_validation_date", function(){
	        var context, calendar, popup;

	        function create() {
	            if (!calendar) {
	                calendar = $("<div>").kendoCalendar();
	                popup = $("<div>").kendoPopup();
	                calendar.appendTo(popup);
	                calendar = calendar.getKendoCalendar();
	                popup = popup.getKendoPopup();

	                calendar.bind("change", function(){
	                    popup.close();
	                    var date = calendar.value();
	                    if (!context.range.format()) {
	                        context.range.format("yyyy-mm-dd");
	                    }
	                    context.callback(kendo.spreadsheet.dateToNumber(date));
	                });
	            }
	            popup.setOptions({
	                anchor: context.view.element.find(".k-spreadsheet-editor-button")
	            });
	        }

	        function open() {
	            create();
	            var date = context.range.value();
	            if (date != null) {
	                calendar.value(kendo.spreadsheet.numberToDate(date));
	            } else {
	                calendar.value(null);
	            }
	            var val = context.validation;
	            if (val) {
	                var min = kendo.ui.Calendar.fn.options.min;
	                var max = kendo.ui.Calendar.fn.options.max;
	                if (/^(?:greaterThan|between)/.test(val.comparerType)) {
	                    min = kendo.spreadsheet.numberToDate(val.from.value);
	                }
	                if (val.comparerType == "between") {
	                    max = kendo.spreadsheet.numberToDate(val.to.value);
	                }
	                if (val.comparerType == "lessThan") {
	                    max = kendo.spreadsheet.numberToDate(val.from.value);
	                }
	                calendar.setOptions({
	                    disableDates: function(date) {
	                        var from = val.from ? val.from.value|0 : 0;
	                        var to = val.to ? val.to.value|0 : 0;
	                        date = kendo.spreadsheet.dateToNumber(date) | 0;
	                        return !kendo.spreadsheet.validation
	                            .validationComparers[val.comparerType](date, from, to);
	                    },
	                    min: min,
	                    max: max
	                });
	            } else {
	                calendar.setOptions({ disableDates: null, min: null, max: null });
	            }
	            popup.open();
	        }

	        return {
	            edit: function(options) {
	                context = options;
	                open();
	            },
	            icon: "k-i-calendar"
	        };
	    });

	    registerEditor("_validation_list", function(){
	        var context, list, popup;
	        function create() {
	            if (!list) {
	                list = $("<ul class='k-list k-reset'/>").kendoStaticList({
	                    template   : "#:value#",
	                    selectable : true,
	                    autoBind   : false
	                });
	                popup = $("<div>").kendoPopup();
	                list.appendTo(popup);
	                popup = popup.getKendoPopup();
	                list = list.getKendoStaticList();

	                list.bind("change", function(){
	                    popup.close();
	                    var item = list.value()[0];
	                    if (item) {
	                        context.callback(item.value);
	                    }
	                });
	            }
	            popup.setOptions({
	                anchor: context.view.element.find(".k-spreadsheet-editor-button")
	            });
	        }
	        function open() {
	            create();
	            var items = context.validation.from.value;
	            var data = [], add = function(el){ data.push({ value: el }); };
	            if (items instanceof kendo.spreadsheet.calc.runtime.Matrix) {
	                items.each(add);
	            } else {
	                // actually Excel expects a simple string for list
	                // validation (comma-separated labels).
	                (items+"").split(/\s*,\s*/).forEach(add);
	            }
	            var dataSource = new kendo.data.DataSource({ data: data });
	            list.setDataSource(dataSource);
	            dataSource.read();
	            popup.open();
	        }
	        return {
	            edit: function(options) {
	                context = options;
	                open();
	            },
	            icon: "k-i-arrow-60-down"
	        };
	    });

	})(window.kendo);
	}, __webpack_require__(3));


/***/ }),

/***/ 1534:
/***/ (function(module, exports) {

	module.exports = require("../kendo.calendar");

/***/ }),

/***/ 1535:
/***/ (function(module, exports) {

	module.exports = require("./sheet");

/***/ })

/******/ });