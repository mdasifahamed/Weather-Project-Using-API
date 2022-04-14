const express = require('express');
const https = require('https'); // This library required for loadung data from api
const bodyparser = require('body-parser'); // this Libray is used for getting the The value from the
                                          // the user have inputed.
const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true})); // to use body-parser this has to be written

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html'); // sendindg the html file from the root folder

  });

app.post('/',function(req,res) { //this will when the go is pressed
  var cityName = req.body.cityname;
  const location = cityName; // declaring location
  const apikey = '43b7c5df43d7971ae8ff4a209fcdf2bc'; //declaring apikey


    const url = 'https://api.openweathermap.org/data/2.5/weather?appid='+ apikey+'&units=metric&q=' + location; // breaking the url into fewer
    https.get(url,function(response){ // this method helps on getting the feacthed data from the api

      console.log(response.statusCode); // to check the url is it working or not
      response.on("data",function(data){ // to response data gotten from the api.
      const weatherData = JSON.parse(data); // parsing the the data gotten form api to json format
      const Tempa = weatherData.main.temp;  // storing the specific chosen data to a variable.
      const descp = weatherData.weather[0].description // storing the specific chosen data to a variable.
      console.log(weatherData);
      console.log(Tempa);
      console.log(descp);
      res.write("<h1>The temperature today at  is "+ cityName +"  " + Tempa  + "  Degree Celcius</h1>");
      res.write("<p>The envirounment is </p>" + descp);
      res.send();
  })
  });


  console.log(cityName);
});

app.listen(port,function(){
  console.log("Server Started");
});
