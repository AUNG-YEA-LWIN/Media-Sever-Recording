let http = require('http');
let url = require('url');
require('dotenv').config()

let routes = {
    'GET': {
        '/': (req,res,params) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(`<h1>Method GET => path / and Name = ${params.query.name} and age = ${params.query.age}</h1>`);
            console.log('Method GET and path / ');
        },
        '/home': (req,res,params) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end("<h1>Method GET => path /home</h1>");
            console.log('Method GET and path /home ');
        },
    },
    'POST': {
        '/': (req,res,params) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end("<h1>Method POST => path / </h1>");
            console.log('Method POST and path / ');
        },
        '/about': (req,res,params) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end("<h1>Method POST => path /about </h1>");
            console.log('Method POST and path /about ');
        },
    },
    'NA': (req,res,params) => {
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.end('<h1>Page not found.</h1>')
    }
}

const start = (req,res) => {
    let reqMethod = req.method;
    let params = url.parse(req.url,true);
    // console.log(params);
    let name = params.query.name;
    let age = params.query.age;

    console.log('name = '+name , 'age = '+age)

    let pagesRoutes = routes[reqMethod][params.pathname];
    // console.log(pagesRoutes);

    if(pagesRoutes != null && pagesRoutes != undefined) {
        pagesRoutes(req,res,params);
    } else {
        routes['NA'](req,res,params);
    }
}

let server = http.createServer(start);

server.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});