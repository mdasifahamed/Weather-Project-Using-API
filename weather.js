const express = require('express');
const https = require('https'); // This library required for loadung data from api
const app = express();
const port = 3000;

app.get('/', function(req,res){
  const url = 'https://api.openweathermap.org/data/2.5/weather?appid=43b7c5df43d7971ae8ff4a209fcdf2bc&units=metric&q=Dhaka';
  https.get(url,function(response){ // this method helps on getting the feacthed data from the api
    console.log(response.statusCode);


    response.on("data",function(data){ // to response data gotten from the api.
      const weatherData = JSON.parse(data); // parsing the the data gotten form api to json format
      const temp = weatherData.main.temp; // storing the specific chosen data to a variable.
      const descp = weatherData.weather[0].description // storing the specific chosen data to a variable.
      console.log(weatherData);
      console.log(temp);
      console.log(descp);
      res.write("<h1>The temperature today at Dhaka is " + temp  + " Degree Celcius</h1>");
      res.write("<p>The envirounment is </p>" + descp);
      res.send();
    })
  })
});


app.listen(port,function(){
  console.log("Server Started");
});
