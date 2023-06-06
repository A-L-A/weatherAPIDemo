const { log } = require("console");
const express =require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
    
const url ="https://api.openweathermap.org/data/2.5/weather?q=Kigali&appid=9b892efc02d6461e7d846186ea05fdea&units=metric";

    https.get(url, function(response){
    console.log(response.statusCode);
    
    response.on("data", function(data){
        
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon;
       const image = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
       console.log(weatherDescription)
       res.write("<p>The weather is currently " + weatherDescription + " </p>");
       res.write("<h1>The temperature in Kigali is " + temp + " degrees celcius</h1>");
       res.write("<img src = "+ image+ ">")
       res.send();
    })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})