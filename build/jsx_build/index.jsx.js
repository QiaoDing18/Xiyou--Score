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
	  var Base = function(){};
	  Base.prototype = {
	    constructor: Base,
	    baseAjax: function(url, data, type, callback){
	      $.ajax({
	        url: url,
	        type: type,
	        data: data,
	        dataType: 'jsonp',
	        success: function(data){
	          callback(data);
	        }
	      });
	    }
	  };
	  var base = {
	    base: function(){
	      return new Base();
	    }
	  };

	  var InputMainBox = React.createClass({displayName: "InputMainBox",
	    mixins: [base],

	    data: {
	      username: '',
	      password: '',
	      session: '',
	      verCode: '',
	    },

	    getInitialState: function(){
	      return {
	        verCode: null,
	      };
	    },

	    componentWillMount: function(){
	      that = this;
	      this.base().baseAjax('http://scoreapi.xiyoumobile.com/users/verCode', null, 'GET', function(data){
	        that.data.session = data.result.session;
	        that.setState({ verCode: data.result.verCode });
	      });
	    },

	    checkChangeVerCode: function(){
	      that = this;
	      this.base().baseAjax('http://scoreapi.xiyoumobile.com/users/verCode', null, 'GET', function(data){
	        that.data.session = data.result.session;
	        that.setState({ verCode: data.result.verCode });
	      });
	    },

	    loginHandle: function(){
	      var that = this;
	      this.data.username = ReactDOM.findDOMNode(this.refs.num).value;
	      this.data.password = ReactDOM.findDOMNode(this.refs.password).value;
	      this.data.verCode = ReactDOM.findDOMNode(this.refs.vercode).value;
	      this.checkChangeVerCode();
	      ReactDOM.findDOMNode(this.refs.vercode).value = null;
	      this.base().baseAjax('http://scoreapi.xiyoumobile.com/users/login', that.data, 'GET', function(data){
	        if(data.error == false){
	          $.cookie('username', that.data.username);
	          $.cookie('password', that.data.password);
	          $.cookie('session', that.data.session);
	          $.cookie('verCode', that.data.verCode);
	          window.location.href = 'score.html';
	        }else{
	          alert("请检输入");
	        }
	      });
	    },

	    render: function(){
	      return (
	        React.createElement("div", {id: "login", ref: "login"}, 
	          React.createElement("div", {id: "title"}), 
	          React.createElement("div", {id: "inputBox"}, 
	            React.createElement("h5", null, "学 号 "), 
	            React.createElement("input", {type: "text", id: "num", ref: "num", placeholder: "学号"}), 
	            React.createElement("h5", null, "密 码 "), 
	            React.createElement("input", {type: "passWord", id: "password", ref: "password", placeholder: "密码"}), 
	            React.createElement("h5", null, "验 证 码 "), 
	            React.createElement("input", {type: "text", id: "vercode", ref: "vercode", placeholder: "验证码"}), 
	            React.createElement("img", {src: this.state.verCode, onClick: this.checkChangeVerCode})
	          ), 
	          React.createElement("button", {onClick: this.loginHandle}, React.createElement("p", null, "登录"))
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