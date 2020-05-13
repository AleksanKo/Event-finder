const express = require('express');
const cors = require('cors');
const router = require("express").Router()
const request = require("request")
const axios = require("axios")
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const url = "http://open-api.myhelsinki.fi/v1/events/"

const getCurrentWeek = () => {
  const today = new Date()
  const dayNextWeek = new Date().setDate(today.getDate() + 7)
  return dayNextWeek
}

app.get("/", async(req, res, next) => {
    await axios.get(url)
       .then(response => {
    const events = response.data.data.
      filter(event => new Date(event.event_dates.starting_day) >= Date.now() 
      && new Date(event.event_dates.starting_day) <= getCurrentWeek(event.event_dates.starting_day))
    res.status(200).json(events)
  })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});