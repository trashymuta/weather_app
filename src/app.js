const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather.js')
const geocode = require('./utils/geocode.js')

const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'SkepticalHippo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'SkepticalHippo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'If you\'re here than means you ran out of luck.',
        name: 'SkepticalHippo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            title: 'No address provided.',
            message: 'Address must be provided.'
        })
    }
    // to do: set default addres to location of the user
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        weather(latitude, longitude, (error, { summary, temperature }) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                summary: summary,
                temperature: temperature,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'We\'re very sorry.',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'We\'re very sorry.',
        message: 'Error 404 Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is up on port: ' + port)
})

// app.com
// app.com/help
// app.com/about