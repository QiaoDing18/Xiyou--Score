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

  var InputMainBox = React.createClass({
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
      ReactDOM.findDOMNode(this.refs.vercode).value = null;
      this.base().baseAjax('http://scoreapi.xiyoumobile.com/users/login', that.data, 'GET', function(data){
        if(data.error == false){
          // $.cookie('username', that.data.username);
          // $.cookie('password', that.data.password);
          // $.cookie('session', data.result.session);
          // $.cookie('verCode', that.data.verCode);
          localStorage.username = that.data.username;
          localStorage.password = that.data.password;
          localStorage.session = data.result.session;
          localStorage.verCode = that.data.verCode;
          window.location.href = 'score.html';
        }else{
          alert("请检输入");
          that.checkChangeVerCode();
        }
      });
    },

    render: function(){
      return (
        <form id="login" ref="login">
          <div id="title"></div>
          <div id="inputBox">
            <h5>学 号 </h5>
            <input type="text" id="num" ref="num" placeholder="学号"/>
            <h5>密 码 </h5>
            <input type="passWord" id="password" ref="password" placeholder="密码"/>
            <h5>验 证 码 </h5>
            <input type="text" id="vercode" ref="vercode" placeholder="验证码"/>
            <img src={this.state.verCode} onClick={this.checkChangeVerCode}/>
          </div>
          <div id="button" onClick={this.loginHandle}>
            <p>登录</p>
          </div>
        </form>
      );
    }
  });

  ReactDOM.render(
    <InputMainBox/>,
    document.getElementById('indexBox')
  );

})();