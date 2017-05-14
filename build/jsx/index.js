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

  var InputMainBox = React.createClass({
    render: function(){
      return (
        <div id="login" ref="login">
          <div id="title"></div>
          <div id="inputBox">
            <h5>学 号 </h5>
            <input type="text" id="num" placeholder="学号"/>
            <h5>密 码 </h5>
            <input type="passWord" id="password" placeholder="密码"/>
            <h5>验 证 码 </h5>
            <input type="text" id="vercode" placeholder="验证码"/>
            <img src="" />
          </div>
          <button><p>登录</p></button>
        </div>
      );
    }
  });

  ReactDOM.render(
    <InputMainBox/>,
    document.getElementById('indexBox')
  );

})();