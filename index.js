const express = require('express');
const myDatabase = require('./Application/DB/db');
const
 {register,
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
require("dotenv").config();

myDatabase();

app.post("/api/register",register);
app.post("/api/login", login);
app.get("/api/list", Listbox);
app.post("/api/submit", InputBox);
app.get("/api/coach",coachTypesectionlist );
app.get("/api/biotank",biotankNamesectionlist);
app.get("/api/divistion",divistiosectionlist);
app.get("/api/zone",zonesectionlist);
app.post("/api/quiz",submitQuestionSet);



//    const { name, lastname, email, password } = req.body;

//   try {
//     const newUser = await new RegisterModel({ name, lastname, email, password }).save();
//     res.status(201).json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// app.post("/api/login",async (req, res) => {
//    const { email, password } = req.body;

// try {
//     const loginLog =await new LoginModel({ email }).save();
//     if(loginLog.password == password){
//     res.status(200).json({ message: "Login successful", loginLog });

//     }else{
//     res.status(200).json({ message: "Login Failed", loginLog });

//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
