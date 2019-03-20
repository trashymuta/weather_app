const request = require('request')
const geocode = require('./geocode.js')


const weather = (latitude, longitude, callback) => {
    // const location = address
    // const data = geocode(location, (error, data) => {
    //     console.log(error)
    //     return data
    // })

    // const latitude = data.latitude
    // const longitude = data.longitude

    const url = `https://api.darksky.net/forecast/897168af2696639267e2cf5e52227f55/${latitude},${longitude}?lang=pl&units=ca`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('unable to find location.', undefined)
        } else {
            callback(undefined, {
                // location: data.location,
                summary: body.currently.summary,
                temperature: body.currently.temperature
            })
        }
    })
}

module.exports = weather



