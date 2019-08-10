var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(MainFunction(request, response));

server.listen(8899, function(){
    console.log('Server is running...');
});

function MainFunction(request,response){
  var parsedUrl = url.parse(request.url);
  var resource = parsedUrl.pathname;

  // 1. 요청된 자원이 /hello 이면
  if(resource == '/index'){
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
  }// 1. 요청된 자원이 /hello 이면
  else if(resource == '/item'){
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
  }
  else{
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Page Not Found');
  }

}