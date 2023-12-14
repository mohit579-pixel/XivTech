const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    let temperatureData = '';
    res.render("show", { temperatureData });
});

app.post("/", async (req, res) => {
    try {
        let citiesInput = req.body.city;
        let API_KEY = "53395da5cc625cdaa2cf446545065933";
        let citiesArray = citiesInput.split(",");

        let temperatureData = [];

        for (let city of citiesArray) {
            let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            let response = await axios.get(URL);

            let temperature = response.data.main.temp;
            temperatureData.push({ city, temperature });
        }

        console.log(temperatureData);
        res.render("show.ejs", { temperatureData });
    } catch (error) {
        console.error(error);
        res.render("error", { error: "Error fetching weather data" });
    }
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
