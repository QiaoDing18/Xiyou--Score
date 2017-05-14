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
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	(function(){
	  var iStruct = function(){};
	  iStruct.prototype = {
	    constructor: iStruct,
	    iAjax: function(url, data, type, callback){
	      $.ajax({
	        url: url,
	        type: type,
	        data: data,
	        dataTye: 'jsonp',
	        success: function(data){
	          callback(data);
	        }
	      });
	    }
	  };
	  var struct = {
	    struct: function(){
	      return new iStruct();  
	    }
	  };

	  var InputMainBox = React.createClass({displayName: "InputMainBox",
	    render: function(){
	      return (
	        React.createElement("div", {id: "login", ref: "login"}, 
	          React.createElement("div", {id: "title"}), 
	          React.createElement("div", {id: "inputBox"}, 
	            React.createElement("h5", null, "学 号 "), 
	            React.createElement("input", {type: "text", id: "num", placeholder: "学号"}), 
	            React.createElement("h5", null, "密 码 "), 
	            React.createElement("input", {type: "passWord", id: "password", placeholder: "密码"}), 
	            React.createElement("h5", null, "验 证 码 "), 
	            React.createElement("input", {type: "text", id: "vercode", placeholder: "验证码"}), 
	            React.createElement("img", {src: ""})
	          ), 
	          React.createElement("button", null, "登录")
	        )
	      );
	    }
	  });

	  ReactDOM.render(
	    React.createElement(InputMainBox, null),
	    document.getElementById('indexBox')
	  );

	})();

/***/ })
/******/ ]);