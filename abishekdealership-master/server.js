var express = require("express");
var path = require("path");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

var app = express();
app.use(express.static(path.join(__dirname,"/static")));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

var vehicles = [
    {
        ID: 123,
        VIN: 'A001',
        Type: 'Sedan',
        Year: 2019,
        Manufacturer: 'Tesla',
        Model: 'Model S',
        Colors: ['Red','Black'],
        Mileage: 32120,
        Price: 69000
    },
    {
        ID: 456,
        VIN: 'B020',
        Type: 'Coupe',
        Year: 2018,
        Manufacturer: 'Tesla',
        Model: 'Model X',
        Colors: ['Blue'],
        Mileage: 82120,
        Price: 99000
    }
];

app.get('/vehicles', function (req, res) {
    console.log('vehicleList ');
    res.send({status: 'success', vehicles: vehicles});
})

app.listen(8000,function(){
    console.log("Listening on Port: ", 8000);
})


