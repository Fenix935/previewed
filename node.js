const http = require('http');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    if(req.method === "POST"){
        req.setEncoding("utf-8")
        req.on('data', data => {
            console.log("ondata: ", data);
            
            const text = JSON.parse(data);
            console.log(text);

            
            const options = {
                hostname: text.url,
                path: req.url,
                method: 'GET',
            };
            
            const proxyreq = http.request(options, (response) => {
                console.log(`req to the ${text.url}`);
                let Alldata = "";
                response.setEncoding('utf8');

                response.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                    Alldata += chunk;
                });

                response.on('end', (data) => {
                    console.log(data);
                    console.log('No more data in response.');
                    if(text.give === "file"){
                        fs.writeFileSync("google.html", Alldata);
                        
                        res.writeHead(200, { "Content-Type": "text/plain" })
                        res.end("Create new html file")
                    }else{
                        res.writeHead(200, { "Content-Type": "text/plain" })
                        res.end(Alldata)
                    }

                });

                proxyreq.on('error', (e) => {
                    console.error(`problem with request: ${e.message}`);
                });
            });

        });
    }else{
        switch(req.url){
            case "/":
            case "/index.html":
                res.writeHead(200, { "Content-Type": "text/html" })
                fs.readFile("./index.html", "utf-8", (err, data) => {
                    res.end(data);
                })
                break;
            case "/app.js":
                res.writeHead(200, { "Content-Type": "text/javascript" })
                fs.readFile(`.${req.url}`, "utf-8", (err, data) => {
                    res.end(data);
                })
                break;
            default: 
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.end("404 not founded");
        }
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});






// var http = require('http');

// http.createServer(onRequest).listen(3000);

// function onRequest(client_req, client_res) {
//   console.log('serve: ' + client_req.url);

//   var options = {
//     hostname: 'www.google.com',
//     // port: 80,
//     method: "GET",
//     path: client_req.url,
//     // method: client_req.method,
//     // headers: client_req.headers
//   };

//   var proxy = http.request(options, function (res) {
//     client_res.writeHead(res.statusCode, res.headers)
//     console.log(client_res);
//     res.pipe(client_res, {
//       end: true
//     });
//   });

//   client_req.pipe(proxy, {
//     end: true
//   });
// }
