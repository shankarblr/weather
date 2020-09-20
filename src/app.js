const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode')
const forcast = require('./utils/forcast')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.use(express.static(path.join(__dirname, '../public')))
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Shankar Subramanyam"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Subramanyam"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a node's module",
        title: "Help",
        name: "Mama Subramanyam"
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: " Address querystring is missing"
        })
    }


    geocode(req.query.address, (error, response) => {

        if (error) {
            return res.send({ errorMessage: error })
        }


        if (response) {

            forcast(response, (error, data) => {

                if (error) {

                    return res.send({ errorMessage: error })
                }


                if (data) {
                      return res.send({
                        address: req.query.address,
                        forecast: data.forcastData,
                        lcoation : data.lcoation
                    })
                }
                console.log(data.descriptions + ". The temp is going to be " + data.temperature + " with a precip of " + data.precip)

            })
        }


    })



    // res.send({
    //     address: req.query.address,
    //     forecast: '',
    //     temperature: 0,
    //     precip: ''

    // })
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            errorMessage: "You need to send Search Term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page Not found",
        title: "404 page",
        name: "Mama Subramanyam"
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});