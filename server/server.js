var express = require("express");

var app = express();

app.get("/", (req, res, next) => {

    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=25bfd122210c448c912246ee9c0a27f3')
    .then(response => response.json())
    .then(data => console.log(data));
    console.log(data)
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});