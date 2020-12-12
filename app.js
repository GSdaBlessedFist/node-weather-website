const path = require("path");
const request = require("postman-request");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./src/utils/forecast");
const geocode = require("./src/utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./src/templates/views");
const partialsPath = path.join(__dirname, "./src/templates/partials");

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

app.get("", async (req, res) => {
    try {
        await res.render("index", {
            title: "Weather App",
            name: "Admiral Akbar",
        });
    } catch (e) {
        res.status(500).send();
    }

});

app.get("/about", async (req, res) => {
    try {
        await res.render("about", {
            title: "About page",
            weathermanName: "Admiral-Akbar",
            message: "My GF is a loser!",
        });
    } catch (e) {
        res.status(500).send();
    }

});

app.get("/help", async (req, res) => {
    try {
        await res.render("help", {
            title: "Help page",
            message: "This is the help page",
        });
    } catch (e) {
        res.status(500).send();
    }

});

app.get("/weather", async (req, res) => {
    try {
        if (!req.query.address) {
            return res.send({
                error: "You must provide an address.",
            });
        }
        await geocode(req.query.address, (error, {
            latitude,
            longtitude,
            location
        } = {}) => {
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
                    precipitation: forecastData.precipitation,
                    address: req.query.address,
                });
            });
        });
    } catch (e) {
        res.status(500).send();
    }

});

app.get("/products", async (req, res) => {
    try {
        if (!req.query.searchVariable) {
            return res.send({
                error: "You must provide search term.",
            });
        }
        console.log(req.query.searchVariable);
        await res.send({
            products: [],
        });
    } catch (e) {
        res.status(500).send();
    }
});
/////////////////////////////////////////////////////   HERE
app.get("/help/*", async (req, res) => {
    try {
        await res.render("404", {
            message: "Help article not found.",
        });
    } catch (e) {
        res.status(500).send();
    }
});

app.get("*", async (req, res) => {
    try {
        res.render("404", {
            message: "404, jack...Page not found",
        });
    } catch (e) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`serve running on port ${port}`);
});