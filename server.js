var http = require('http');
var url = require('url');
var fs = require('fs');
var mongoose = require('mongoose');
var querystring = require('querystring'); 
var static = require('serve-static');
var express = require('express');
var path = require('path');

var app = express();

var story = mongoose.Schema({
  title : 'string',
  writer : 'string',
  wrt_dt : 'string',
  cont : 'string'
});


mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});

app.use('/',static(path.join(__dirname, '')));
app.use(function(req, res, next){
  var parsedUrl = url.parse(req.url);
  var resource = parsedUrl.pathname;

  // 1. 요청된 자원 체크 
  switch(resource){
    case '/index':    //list 보여줌 
      f_index(req,res);
      break;
    case '/item':     // 조회 
      f_item(req,res);
      break;
    case '/newitem':     // 생성 
      f_newitem(req,res);
      break;
    case '/updateitem':     // 수정
      f_updateitem(req,res);
      break;  
    case '/deleteitem':     // 삭제 
      f_deleteitem(req,res);
      break;  
    default :
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end('404 Page Not Found');
  }
  res.end();
});
function f_index(req,res){
  // 2. hello.html 파일을 읽은 후
  var cursor = db.collection('test').find();
  // 2. 읽어온 document 를 cursor 에 넣고 반복처리
  cursor.each(function(err,doc){ // document 가 예약어이기 때문에 변수명을 doc로 변경
    if(err){
        console.log(err);
    }else{
        if(doc != null){
            // 3. document 가 정상적으로 있으면 console 에 출력해준다.
            console.log(doc);
        }
    }
  });
  fs.readFile('index.html', 'utf-8', function(error, data) {
    // 2.1 읽으면서 오류가 발생하면 오류의 내용을
    if(error){
      res.writeHead(500, {'Content-Type':'text/html'});
      res.end('500 Internal Server Error : '+error);
    // 2.2 아무런 오류가 없이 정상적으로 읽기가 완료되면 파일의 내용을 클라이언트에 전달
    }else{
      res.writeHead(200, {'Content-Type':'text/html'});
      //{JJH} html 에 데이터 내용 추가 
      res.end(data);
    }
  });
};
function f_item(req,res){
  var parsedUrl = url.parse(req.url);
  // 1. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  console.log(parsedQuery);
  console.log('[f_item]parsedQuery.no:['+parsedQuery.no+']');  

  // 2. DB에서 해당하는 글 가져오기 

  // 3. 데이터를 html 소스에 뿌리기 

      // 2. hello.html 파일을 읽은 후
  fs.readFile('item.html', 'utf-8', function(error, data) {
    // 2.1 읽으면서 오류가 발생하면 오류의 내용을
    if(error){
      res.writeHead(500, {'Content-Type':'text/html'});
      res.end('500 Internal Server Error : '+error);
    // 2.2 아무런 오류가 없이 정상적으로 읽기가 완료되면 파일의 내용을 클라이언트에 전달
    }else{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    }
  });
};

function f_newitem(req,res){
  
	try {
    var paramTitle = req.body.title
		var paramAuthor = req.body.writer;
    var paramCreateDate = req.body.wt_dt;
		var paramContents = req.body.cont;
    
    console.log('제목 : ' + paramTitle);
		console.log('작성자 : ' + paramAuthor);
		console.log('내용 : ' + paramContents);
		console.log('일시 : ' + paramCreateDate);
    
    var item = mongoose.model('Schema',story);

    var newItem = new item({title:paramTitle, writer:paramAuthor, wrt_dt:paramCreateDate, cont:paramContents});

    newItem.save(function(err, data){
      if(err){
        console.log(err);
    }else{
        if(doc != null){
            // 3. document 가 정상적으로 있으면 console 에 출력해준다.
            console.log('saved');
        }
    }
    });

    res.writeHead(302, {
      'Location': 'your/404/path.html'
    });
    response.end();

	} catch(err) {
		console.dir(err.stack);
		
		res.writeHead(400, {'Content-Type':'text/html;charset=utf8'});
		res.write('<div><p> 저장 시 에러 발생</p></div>');
		res.end();
	}	
};
function f_updateitem(req,res){
  var parsedUrl = url.parse(req.url);
  // 1. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  console.log(parsedQuery);
  console.log('parsedQuery.no:['+parsedQuery.no+']');  

  fs.readFile('index.html', 'utf-8', function(error, data) {
    if(error){
      res.writeHead(500, {'Content-Type':'text/html'});
      res.end('500 Internal Server Error : '+error);
    }else{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    }
  });
};
function f_deleteitem(req,res){
  var parsedUrl = url.parse(req.url);
  // 1. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  console.log(parsedQuery);
  console.log('parsedQuery.no:['+parsedQuery.no+']');  

  fs.readFile('index.html', 'utf-8', function(error, data) {
    if(error){
      res.writeHead(500, {'Content-Type':'text/html'});
      res.end('500 Internal Server Error : '+error);
    }else{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    }
  });
};

http.createServer(app).listen(8899, function(){
    console.log('Server is running...');
});
