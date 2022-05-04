// const express = require("express");

// const app = express();

// app.listen(3000, () => {
//   console.log("listening on 3000");
// });

const fetch = require("node-fetch");

// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
const URL = "https://www.screener.in/company/GPIL/consolidated/";

// start of the program
const getCricketWorldCupsList = async () => {
  const cricketWorldCupRawData = await getRawData(URL);
  console.log(cricketWorldCupRawData);
};

// invoking the main function
getCricketWorldCupsList();
