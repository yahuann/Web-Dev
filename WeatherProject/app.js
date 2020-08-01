const express = require('express');
const https = require('https');//native node package
const bodyParser = require("body-parser")
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({extended:true}));


app.listen(port, function() {
  console.log('Weather project listening at http://localhost:' + port);
});

//req: client browser(ur chrome) to our server(localhost:3000)
//res: our server to client browser; Only only have ONE res.send() in one get
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const queryCity = req.body.cityName;
  const apiKey = 'apiKeyPlaceholder';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + queryCity + '&appid=' + apiKey;

//  strict https url with head part
//  response: external openWeather server to our server
   https.get(url, (response) => {
     // console.log('statusCode:', response.statusCode);
     // console.log('headers:', response.headers);
      response.on("data",function(d){
        const weatherData = JSON.parse(d);
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
        res.write("<h1>hi</h1>");
        res.write("<h1>The temperature in " + queryCity + " is " + temp + "</h1>");
        res.write("<img src =" + imgURL + ">")
        res.send();
      });

    }).on('error', (e) => {
     console.error(e);
   });
//  res.sendFile(__dirname + "/index.html");
})
