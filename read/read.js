import express from "express" 
import bodyParser from "body-parser"
import http from 'http'
import fs from 'fs'

const server=express()
const PORT=8080
server.use(bodyParser.json())

//var http = require('http');
var file=fs
var reads=function (req, res) {
    file.readFile('sample.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
     return res.end();
    })//.listen(8080);
}

var homepage=(req,res)=> res.send("Welcome to my library")
server.get("/",homepage)
server.use("/vegetable",reads)

server.listen(PORT)