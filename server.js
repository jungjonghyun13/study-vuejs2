var http = require('http');
var url = require('url');
var fs = require('fs');
var mongoose = require('mongoose');
var querystring = require('querystring'); 

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});


var server = http.createServer(function(request,response){
  var parsedUrl = url.parse(request.url);
  var resource = parsedUrl.pathname;

  // 1. 요청된 자원 체크 
  switch(resource){
    case '/index':    //list 보여줌 
      f_index(request,response);
      break;
    case '/item':     // 조회 
      f_item(request,response);
      break;
    case '/newitem':     // 생성 
      f_newitem(request,response);
      break;
    case '/updateitem':     // 수정
      f_updateitem(request,response);
      break;  
    case '/deleteitem':     // 삭제 
      f_deleteitem(request,response);
      break;  
    default :
      response.writeHead(404, {'Content-Type':'text/html'});
      response.end('404 Page Not Found');
  }

});
function f_index(request,response){
  // 2. hello.html 파일을 읽은 후
  fs.readFile('index.html', 'utf-8', function(error, data) {
    // 2.1 읽으면서 오류가 발생하면 오류의 내용을
    if(error){
      response.writeHead(500, {'Content-Type':'text/html'});
      response.end('500 Internal Server Error : '+error);
    // 2.2 아무런 오류가 없이 정상적으로 읽기가 완료되면 파일의 내용을 클라이언트에 전달
    }else{
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
};
function f_item(request,response){
  var parsedUrl = url.parse(request.url);
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
      response.writeHead(500, {'Content-Type':'text/html'});
      response.end('500 Internal Server Error : '+error);
    // 2.2 아무런 오류가 없이 정상적으로 읽기가 완료되면 파일의 내용을 클라이언트에 전달
    }else{
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
};

function f_newitem(request,response){
  fs.readFile('index.html', 'utf-8', function(error, data) {
    if(error){
      response.writeHead(500, {'Content-Type':'text/html'});
      response.end('500 Internal Server Error : '+error);
    }else{
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
};
function f_updateitem(request,response){
  var parsedUrl = url.parse(request.url);
  // 1. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  console.log(parsedQuery);
  console.log('parsedQuery.no:['+parsedQuery.no+']');  

  fs.readFile('index.html', 'utf-8', function(error, data) {
    if(error){
      response.writeHead(500, {'Content-Type':'text/html'});
      response.end('500 Internal Server Error : '+error);
    }else{
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
};
function f_deleteitem(request,response){
  var parsedUrl = url.parse(request.url);
  // 1. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  console.log(parsedQuery);
  console.log('parsedQuery.no:['+parsedQuery.no+']');  

  fs.readFile('index.html', 'utf-8', function(error, data) {
    if(error){
      response.writeHead(500, {'Content-Type':'text/html'});
      response.end('500 Internal Server Error : '+error);
    }else{
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
};
server.listen(8899, function(){
    console.log('Server is running...');
});
