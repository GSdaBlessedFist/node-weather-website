const request = require('postman-request');
const chalk = require('chalk');
const apiKey = "35adf6adbe0bb5aac2ed0d973503c3bb";



const forecast = (latitude,longtitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=35adf6adbe0bb5aac2ed0d973503c3bb&query=" + latitude + "," + longtitude+"&units=f";

  request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
               	weatherDescription: body.current.weather_descriptions[0],
               	currentTime: body.current.observation_time,
               	timezone: body.location.timezone_id,
                precipitation: body.current.precip
            })
        }
    })
}

module.exports = forecast;

// "http://api.weatherstack.com/current?access_key=35adf6adbe0bb5aac2ed0d973503c3bb/-75.7088,44.1545"
// "http://api.weatherstack.com/current?access_key=35adf6adbe0bb5aac2ed0d973503c3bb&query=New%20York"

