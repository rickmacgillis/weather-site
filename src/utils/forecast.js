const request = require('request');

module.exports = (lat, long, callback) => {

    const coords = lat + ',' + long;
    const weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + encodeURIComponent(coords);

    request({
        url: weatherUrl,
        json: true,
    }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the weather service!');
        } else if (body.error !== undefined) {
            callback('Unable to find location');
        } else {

            const currently = body.currently;
            const daily = body.daily.data[0];
            const summary = daily.summary;
            const low = daily.temperatureMin;
            const high = daily.temperatureMax;

            const data = summary +
                ' It is currently ' + currently.temperature + ' degrees out. ' +
                'The high today is ' + high + ' with a low of ' + low + '. ' +
                'There is a ' + currently.precipProbability + '% chance of rain. ';

            callback(undefined, data);

        }

    });

};
