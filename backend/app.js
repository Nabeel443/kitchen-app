const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://developerthings:developerthings443@kitchencluster.dnhw9k4.mongodb.net/?retryWrites=true&w=majority")
  .then(()  =>  { console.log('Connected to database!'); })
  .catch(() =>  { console.log('Connection failed!'); })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)  =>  {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/users", userRoutes);

module.exports = app;
