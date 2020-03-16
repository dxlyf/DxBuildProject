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

	__webpack_require__(31);
	module.exports = __webpack_require__(31);


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	(function( window, undefined ) {
	    kendo.cultures["agq-CM"] = {
	        name: "agq-CM",
	        numberFormat: {
	            pattern: ["-n"],
	            decimals: 2,
	            ",": " ",
	            ".": ",",
	            groupSize: [3],
	            percent: {
	                pattern: ["-n%","n%"],
	                decimals: 2,
	                ",": " ",
	                ".": ",",
	                groupSize: [3],
	                symbol: "%"
	            },
	            currency: {
	                name: "Central African CFA Franc",
	                abbr: "XAF",
	                pattern: ["-n$","n$"],
	                decimals: 0,
	                ",": " ",
	                ".": ",",
	                groupSize: [3],
	                symbol: "FCFA"
	            }
	        },
	        calendars: {
	            standard: {
	                days: {
	                    names: ["tsuʔntsɨ","tsuʔukpà","tsuʔughɔe","tsuʔutɔ̀mlò","tsuʔumè","tsuʔughɨ̂m","tsuʔndzɨkɔʔɔ"],
	                    namesAbbr: ["nts","kpa","ghɔ","tɔm","ume","ghɨ","dzk"],
	                    namesShort: ["nts","kpa","ghɔ","tɔm","ume","ghɨ","dzk"]
	                },
	                months: {
	                    names: ["ndzɔ̀ŋɔ̀nùm","ndzɔ̀ŋɔ̀kƗ̀zùʔ","ndzɔ̀ŋɔ̀tƗ̀dʉ̀ghà","ndzɔ̀ŋɔ̀tǎafʉ̄ghā","ndzɔ̀ŋèsèe","ndzɔ̀ŋɔ̀nzùghò","ndzɔ̀ŋɔ̀dùmlo","ndzɔ̀ŋɔ̀kwîfɔ̀e","ndzɔ̀ŋɔ̀tƗ̀fʉ̀ghàdzughù","ndzɔ̀ŋɔ̀ghǔuwelɔ̀m","ndzɔ̀ŋɔ̀chwaʔàkaa wo","ndzɔ̀ŋèfwòo"],
	                    namesAbbr: ["nùm","kɨz","tɨd","taa","see","nzu","dum","fɔe","dzu","lɔm","kaa","fwo"]
	                },
	                AM: ["AM","am","AM"],
	                PM: ["PM","pm","PM"],
	                patterns: {
	                    d: "d/M/yyyy",
	                    D: "dddd d MMMM yyyy",
	                    F: "dddd d MMMM yyyy HH:mm:ss",
	                    g: "d/M/yyyy HH:mm",
	                    G: "d/M/yyyy HH:mm:ss",
	                    m: "MMMM d",
	                    M: "MMMM d",
	                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
	                    t: "HH:mm",
	                    T: "HH:mm:ss",
	                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
	                    y: "yyyy MMMM",
	                    Y: "yyyy MMMM"
	                },
	                "/": "/",
	                ":": ":",
	                firstDay: 1
	            }
	        }
	    }
	})(this);


/***/ })

/******/ });