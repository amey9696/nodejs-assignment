const http = require('http');
const Url = require('url');

const requestListener = function (req, res) {
    
    const { method, url, headers } = req;
    const urlparse = Url.parse(req.url, true);

    if(method=="GET" && urlparse.pathname =="/metrics"){

        let urlParts = new URL(url, `http://${headers.host}`);

        let object = urlParts.searchParams.get("object");
        let metric = urlParts.searchParams.get("metric");
        let radius = urlParts.searchParams.get("radius");

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        // let dateParse = new Date( month+" "+ date + " "+ year);
        if(metric=='volume'){
            res.write(responseVolumeFunction(calculatevolume(radius)));
            res.end();
        }
        if(metric=='area'){
            res.write(responseAreaFunction(calculateArea(radius)));
            res.end();
        }
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

function responseAreaFunction(area) {
    return (
    `area of circle is:${area}`
    );
}

function responseVolumeFunction(volume) {
    return (
    `volume of circle is:${volume}`
    );
}

function calculateArea(radius) { 
    var ar=3.14*radius*radius;
    return ar;
}

function calculatevolume(radius) { 
    var vol=1.33*3.14*radius*radius*radius;
    return vol;
}