const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidHJhc2h5bXV0YSIsImEiOiJjanRlOHNnYmkxMjduNGJvN2ExcW1wN3F6In0.RXZOC2_E1qxsID3oTVhQuw&limit=1`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service.', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode

