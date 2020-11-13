const path = require("path");
const request = require("postman-request");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(
    express.static(publicDirectory, {
        extensions: ["html", "htm"],
        // Other options here
    })
);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Admiral Akbar",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        weathermanName: "Admiral-Akbar",
        message: "My GF is a loser!",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        message: "This is the help page",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address.",
        });
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            console.log(forecastData);
            res.send({
                forecast: forecastData.forecast,
                weatherDescription: forecastData.weatherDescription,
                location,
                precipitation : forecastData.precipitation,
                address: req.query.address,
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.searchVariable) {
        return res.send({
            error: "You must provide search term.",
        });
    }
    console.log(req.query.searchVariable);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Help article not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        message: "404, jack...Page not found",
    });
});

app.listen(port, () => {
    console.log(`serve running on port ${port}`);
});
