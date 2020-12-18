const express = require("express");
const router = new express.Router();

router.get("", async (req, res) => {
    try {
        await res.render("index", {
            title: "Weather App",
            message: "Weatherness app",
            
        });
    } catch (e) {
        res.status(500).send(e.stack);
    }

});

router.get("/projectinfo", async (req, res) => {
    try {
        await res.render("projectinfo", {
            title: "Project info",
            message: "Info on the project..."
        });
    } catch (e) {
        res.status(500).send();
    }

});

router.get("/aboutdeveloper", async (req, res) => {
    try {
        await res.render("aboutdeveloper", {
            title: "About the developer",
            message: "Welcome...",
        });
    } catch (e) {
        res.status(500).send();
    }

});

router.get("/weather", async (req, res) => {
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

router.get("/products", async (req, res) => {
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
router.get("/help/*", async (req, res) => {
    try {
        await res.render("404", {
            message: "Help article not found.",
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.get("*", async (req, res) => {
    try {
        res.render("404", {
            message: "404, jack...Page not found",
        });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;