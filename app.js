const path = require("path");
const request = require("postman-request");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./src/utils/forecast");
const geocode = require("./src/utils/geocode");
const routes = require("./src/routers/routes");

const app = express();
const port = process.env.PORT || 4000;
const homepage = `localhost:${port}`;

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
app.use(express.json())
app.use(routes);



app.listen(port, () => {
    console.log(`serve running on port ${port}`);
});