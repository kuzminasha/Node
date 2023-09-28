// const http = require('node:http');
// const {parse} = require('querystring');
// const host = "127.0.0.1";
// const port = 3000

// let commentsObj = [];
// let comments = [];

// const users = {user_agent: 0};


// const server = http.createServer((req, res)=>{
//     switch(req.method){
//         case 'POST':
//             postMethod(req, res)
//             break;
//         case 'GET':
//             getMethod(req, res)
//             break;
//     }
// }) 

// server.listen(port, host, () => {
//     console.log(`Server is started http://${host}:${port}`)
// })

// function getMethod(req, res){
//     switch(req.url){
//         case '/':
//             mainGet(req, res)
//             break;
//         case '/stats':
//             statsGet(req, res)
//             break;
//         default:
//             error(req, res)
//             break;
//     }
// }

// function postMethod(req, res){
//     switch(req.url){
//         case '/comments':
//             commentsPost(req, res)
//             break;
//         default:
//             error(req, res)
//             break;
//     }
// }

// function mainGet(req, res){
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello');
// }

// function statsGet(req, res){
//     res.statuse = 200;
//     users.user_agent++;
//     res.setHeader('Content-Type', 'text/html');
//     res.end(`<table>
//         <tr><th>User-agent:</th><th>Request:</th></tr>
//         <tr><td>${req.headers['user-agent']}</td><td>${users.user_agent}</td></tr>
//         </table>`);
// }

// function commentsPost(req, res) {
//     let body = "";
//         req.on("data", (chunk) =>{
//             body += chunk.toString();
//         })
//         req.on("end", ()=>{
//             res.end(body);
//                     })
// }

// function error(req, res){
//     res.status = 404;
//     res.setHeader('Content-Type', 'text/plain');   
//     res.end('400 Bad Request');
// }


const http = require('http');

const PORT = 5000;

let user = { user_agent: 0 };

const server = http.createServer((req, res) => {
    
    console.log(req.method);
    
    switch (req.method) {
        case "GET":
            showMessage(req, res)
            break;
        case "POST":
            showMessagePOST(req, res)
            break;
        default:
            break
    }
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`server started: http://localhost:${PORT}`);
});


function showMessagePOST(req, res) {
    switch(req.url){
        case '/comments':
            showMessageComments(req, res)
            break;
        default:
            error(req, res)
            break;
    }
}

function showMessage(req, res) {
    switch (req.url) {
        case "/":
            showMessageRoot(req, res)
            break
        case "/stats":
            showMessageStats(req, res)
            break
        default:
            showError(req, res)
            break
    }
}

function showMessageRoot(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello \^-^/');
}

function showMessageStats(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    user.user_agent++;
    res.end(`<table>
        <tr><td>User-agent:</td>
        <td>Request:</td></tr>
        <tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
        </table>`);
}

function showMessageComments(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    })
    req.on("end", ()=> {
        res.end(body);
    })
}

function showError(req, res) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
}