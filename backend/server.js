const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leads = [];

app.get("/leads", (req, res) => {
  res.json(leads);
});

app.post("/leads", (req, res) => {
  const lead = req.body;
  leads.push(lead);
  res.json(lead);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});