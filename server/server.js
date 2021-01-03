var express = require("express");
const request = require('request');

const app = express();
const cors = require("cors");

const options = {  
    url: 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=25bfd122210c448c912246ee9c0a27f3',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};

app.use(cors());

app.get("/", (req, res, next) => {
    if(req.query.about){
        options.url = `https://newsapi.org/v2/everything?q=${req.query.about}&apiKey=25bfd122210c448c912246ee9c0a27f3`
    }
    request(options, function(err, output, body) {  
        var json = JSON.parse(body);
        console.log(json); // Logging the output within the request function
        res.json(json) //then returning the response.. The request.json is empty over here
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});