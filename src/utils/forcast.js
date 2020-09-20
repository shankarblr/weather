const request = require('request')

const forcast = (geocode, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e0992750dcf596329cdffafe5e202e50&query=' + geocode.latitude + ',' + geocode.longitute+'&units=f'

    request({ url: url }, (error, response) => {

        const data = JSON.parse(response.body)

        if (error) {
            callback("Unable to connect to Webservice", undefined);
        } else if (data.error) {
            callback("Invalid data", undefined);
        } else {
            callback(undefined, {
                lcoation : geocode.location,
                temperature: data.current.temperature,
                descriptions: data.current.weather_descriptions,
                precip: data.current.precip,
                forcastData : data.current.weather_descriptions + ". The temp is going to be " + data.current.temperature + " with a precip of " + data.current.precip
            });
        }
    });
}

module.exports = forcast;