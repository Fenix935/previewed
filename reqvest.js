// const http = require("http");
// const fs = require("fs");

// const options = {
//     hostname: "www.random.org",
//     path: "/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new",
//     method: 'GET',
// };

// const proxyreq = http.request(options, (response) => {
//     let Alldata = "";
//     // response.setEncoding('utf8');

//     response.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//         Alldata += chunk;
//     });

//     response.on('end', (data) => {
//         console.log('No more data in response.');

//         fs.writeFileSync("google.html", Alldata);

//     });

//     proxyreq.on('error', (e) => {
//         console.error(`problem with request: ${e.message}`);
//     });
// }).end();

var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
      console.log(chunk);
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();