let http = require('http');
let url = require('url');
let qs = require('querystring');
require('dotenv').config();

let responder = (req, res, params) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(params);
};
let routes = {
  'GET': {
    '/': (req,res) => {
      let filepath = __dirname+"/index.html";
      responder(req,res,filepath);
    },
    '/home': (req, res) => {
      let filepath = __dirname+"/index.html";
      responder(req,res,filepath);
    }, 
    '/index': (req,res) => {
      let filepath = __dirname+"/index.html";
      responder(req,res,filepath);
    },
    '/about': (req,res) => {
      let filepath = __dirname+"/about.html";
      responder(req,res,filepath);
    }
    
  },
  'POST': {
    '/': (req, res) => {
      responder(req,res,'<h1>Method POST => path / </h1>');
    },
    '/api/login': (req, res) => {
        let body = '';
        req.on('data',data  => {
            body += data;
            if(body.length > 1024) {
              res.writeHead(403,{"Content-Type": 'text/html'});
              res.end("<h1>File size is over 1MB</h1>")
            }
        });
        req.on('end',() => {
            let query = qs.parse(body);
            console.log("Email = " +query.email + " And Password = " + query.password);
            res.end();
        });
    }, 
  },
  NA: (req, res) => {
    responder(req,res,'<h1>Page not found.</h1>');
  },
};

const start = (req, res) => {
  let reqMethod = req.method;
  let params = url.parse(req.url,true);
  // // console.log(params);
  // let name = params.query.name;
  // let age = params.query.age;

  // console.log('name = ' + name, 'age = ' + age);

  let pagesRoutes = routes[reqMethod][params.pathname];
  // console.log(pagesRoutes);

  if (pagesRoutes != null && pagesRoutes != undefined) {
    pagesRoutes(req, res, params);
  } else {
    routes['NA'](req, res, params);
  }
};

let server = http.createServer(start);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

