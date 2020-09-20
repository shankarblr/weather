const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhbmthcmJsciIsImEiOiJja2Vscm9hMDMyM3RyMnJudm8zYmJxbjQ5In0.uW9ROfTzC7ZlE6KV14uPqA'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log("E")
            callback(error, null)
        } else if (response.body.features.length === 0) {
            callback("error", null)
        } else {
            callback(null, {
                latitude: response.body.features[0].center[1],
                longitute: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}


module.exports = geocode;