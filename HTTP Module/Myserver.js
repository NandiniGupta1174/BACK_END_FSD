//create my own server using http module
import http from"http";
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/html"});
    res.write("<h1> hello CSE24 </h1>");
res.write("welcome to my server");
res.end();
})
server.listen(8000,()=>{
    console.log("server is running on port 8000");
})