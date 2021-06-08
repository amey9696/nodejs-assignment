const http = require('http');
const Url = require('url');

const requestListener = function (req, res) {
    
    const { method, url, headers } = req;
    const urlparse = Url.parse(req.url, true);

    if(method=="GET" && urlparse.pathname =="/age"){

        let urlParts = new URL(url, `http://${headers.host}`);

        let year = urlParts.searchParams.get("year");
        let month = urlParts.searchParams.get("month");
        let date = urlParts.searchParams.get("date");
        let name = urlParts.searchParams.get("name");

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        let dateParse = new Date( month+" "+ date + " "+ year);
        res.write(responseFunction(name, calculateAge(dateParse)));
        res.end();
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write("<p>Resource Not Found</P>");
        res.end();
    }
}

const server = http.createServer(requestListener);
const hostname = '127.0.0.1';
const port = 8080;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function responseFunction(name, age) {
    return (
    `<p>Hello ${name}</p> \n<p>You are currently ${age} years old</p>`
    );
}

function calculateAge(birthday) { 
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}