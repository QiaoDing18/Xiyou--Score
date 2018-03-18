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

  var Content = React.createClass({
    setData: function(){
      var local = this.props.transData;
      var arg = [];
      if(local){
        for(var i=0; i<local.length; i++){
          arg.push(<div className="left" key={local[i].Code}><div className="left-logo"></div><div className="left-angle"></div><div className="left-box">
              <p>课程性质：{local[i].Title}</p>
              <p>课程名称：{local[i].Type}</p>
              <p>卷面成绩：{local[i].RealScore}</p>
              <p>平时成绩：{local[i].UsualScore}</p>
              <p>最终成绩：{local[i].EndScore}</p>
            </div></div>);
        }
        return arg;
      }
      return;
    },

    render: function(){
      return (
        <div id="content" ref="content">
          <div className="right">
            <div className="right-logo"></div>
            <div className="right-angle"></div>
            <div className="right-box">
              <p>西安邮电大学祝您狗年大吉</p>
            </div>
          </div>
          {this.setData()}
        </div>
      );
    }
  });

  var MainBox = React.createClass({
    mixins: [base],

    data: {
      username: '',
      password: '',
      session: '',
      verCode: '',
      year: '',
      semester: '',
      score: '',
    },

    getInitialState: function(){
      return {
        transData: ''
      }
    },

    componentWillMount: function(){
      var that = this;
      this.getUserCookie(that.getAllData);
    },

    getUserCookie: function(callback){
      this.data.username = localStorage.username;
      this.data.password = localStorage.password;
      this.data.session = localStorage.session;
      this.data.verCode = localStorage.verCode;
      callback();
    },

    getAllData: function(){
      var that = this;
      var localData = {
        username: that.data.username,
        password: that.data.password,
        session: that.data.session,
        year: that.data.year,
        semester: that.data.semester,
      };
      this.base().baseAjax('http://scoreapi.xiyoumobile.com/score/year', localData, 'GET', function(data){
        that.data.score = data;
      });
    }, 

    checkScore: function(){
      this.data.year = ReactDOM.findDOMNode(this.refs.year).value;
      this.data.semester = ReactDOM.findDOMNode(this.refs.semester).value;
      var local = this.data;;
      for(var i=0; i<local.score.result.score.length; i++){
        if(local.score.result.score[i].year === local.year){
          local.trueScore = local.score.result.score[i].Terms[local.semester].Scores;
          break;
        }else{
          local.trueScore = "没有查到呢";
        }
      }
      this.setState({transData: local.trueScore});
    },

    backToIndex: function(){
      alert('退出成功');
      window.location.href = 'index.html';
    },

    render: function(){
      return (
        <div id="main">
          <div id="header">
            <div id="return" onClick={this.backToIndex}></div>
            <p>西邮成绩</p>
          </div>

          <Content transData={this.state.transData}></Content>

          <div id="footer">
            <p>学年：</p>
            <select ref="year">
              <option value="2017-2018">2017-2018</option>
              <option value="2016-2017">2016-2017</option>
              <option value="2015-2016">2015-2016</option>
              <option value="2014-2015">2015-2016</option>
              <option value="2013-2014">2015-2016</option>
            </select>
            <p>学期：</p>
            <select ref= "semester">
              <option value="1"> 1</option>
              <option value="2"> 2</option>
            </select>
            <div onClick={this.checkScore}>查询</div>
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(
    <MainBox/>,
    document.getElementById('Box')
  );

})();