const express = require('express');
const connectDB = require('./Application/DB/db.js');
require('dotenv').config();

const {
  register,
  login,
  Listbox,
  InputBox,
  coachTypesectionlist,
  biotankNamesectionlist,
  divistiosectionlist,
  zonesectionlist,
  submitQuestionSet
} = require("./Application/Routes/All_In_One_Route");

const app = express();
app.use(express.json());

connectDB();

// Routes
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/list", Listbox);
app.post("/api/submit", InputBox);
app.get("/api/coach", coachTypesectionlist);
app.get("/api/biotank", biotankNamesectionlist);
app.get("/api/divistion", divistiosectionlist);
app.get("/api/zone", zonesectionlist);
app.post("/api/quiz", submitQuestionSet);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
