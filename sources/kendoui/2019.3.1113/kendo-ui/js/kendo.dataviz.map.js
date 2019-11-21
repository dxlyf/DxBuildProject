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

	module.exports = __webpack_require__(1091);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1016:
/***/ (function(module, exports) {

	module.exports = require("./kendo.data");

/***/ }),

/***/ 1025:
/***/ (function(module, exports) {

	module.exports = require("./kendo.mobile.scroller");

/***/ }),

/***/ 1041:
/***/ (function(module, exports) {

	module.exports = require("./kendo.userevents");

/***/ }),

/***/ 1056:
/***/ (function(module, exports) {

	module.exports = require("./kendo.tooltip");

/***/ }),

/***/ 1062:
/***/ (function(module, exports) {

	module.exports = require("./kendo.draganddrop");

/***/ }),

/***/ 1063:
/***/ (function(module, exports) {

	module.exports = require("./kendo.dataviz.core");

/***/ }),

/***/ 1091:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1016), __webpack_require__(1041), __webpack_require__(1056), __webpack_require__(1025), __webpack_require__(1062),
	        __webpack_require__(1063),

	        __webpack_require__(1093),
	        __webpack_require__(1094),
	        __webpack_require__(1095),
	        __webpack_require__(1092),
	        __webpack_require__(1096),
	        __webpack_require__(1097),
	        __webpack_require__(1098),
	        __webpack_require__(1099),
	        __webpack_require__(1100),
	        __webpack_require__(1101),
	        __webpack_require__(1102),
	        __webpack_require__(1103)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	    var __meta__ = { // jshint ignore:line
	        id: "dataviz.map",
	        name: "Map",
	        category: "dataviz",
	        description: "The Kendo DataViz Map displays spatial data",
	        depends: [ "data", "userevents", "tooltip", "dataviz.core", "drawing", "mobile.scroller" ]
	    };

	    return window.kendo;

	}, __webpack_require__(3));


/***/ }),

/***/ 1092:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/zoom");

/***/ }),

/***/ 1093:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/location");

/***/ }),

/***/ 1094:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/attribution");

/***/ }),

/***/ 1095:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/navigator");

/***/ }),

/***/ 1096:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/crs");

/***/ }),

/***/ 1097:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/base");

/***/ }),

/***/ 1098:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/shape");

/***/ }),

/***/ 1099:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/bubble");

/***/ }),

/***/ 1100:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/tile");

/***/ }),

/***/ 1101:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/bing");

/***/ }),

/***/ 1102:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/layers/marker");

/***/ }),

/***/ 1103:
/***/ (function(module, exports) {

	module.exports = require("./dataviz/map/main");

/***/ })

/******/ });