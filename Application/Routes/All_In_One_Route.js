const mongoose = require("mongoose");

const {
  LoginModel,
  RegisterModel,
  BoxListSchemaModel,
  InputSchemaModel,
  coachTypeListModel,
  biotankNameListModel,
  divisionListModel,
  zoneListModel,
  QuestionSetModel 
} = require("../Models/All_In_One");


// =================== Register API ===================
const register = async (req, res) => {
  const { name, lastname, email, password, number } = req.body;
  try {
    const newUser = await RegisterModel.create({ name, lastname, email, password, number });
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Something went wrong"
    });
  }
};

// =================== Login API ===================
const login = async (req, res) => {
  const { number, password } = req.body;
  try {
    const registeredUser = await RegisterModel.findOne({ number });
    if (!registeredUser) return res.status(404).json({ message: "User not found" });
    if (registeredUser.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    await LoginModel.create({ number, password });
    const { password: _, ...userWithoutPassword } = registeredUser.toObject();
    return res.status(200).json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// =================== List API ===================
const Listbox = async (req, res) => {
  try {
    const existingList = await BoxListSchemaModel.find();
    if (existingList.length === 0) {
      const data = [];
      const listLetters = ["A", "B", "C", "D"];
      for (let i = 1; i <= 6; i++) {
        listLetters.forEach(letter => {
          data.push({ itemName: `${letter}${i}`, isShow: true });
        });
      }
      const inserted = await BoxListSchemaModel.insertMany(data);
      return res.status(201).json({ message: "List created", data: inserted });
    }
    return res.status(200).json({ message: "List already exists", data: existingList });
  } catch (error) {
    console.error("Listbox Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// =================== Input Box API ===================

const InputBox = async (req, res) => {
  const {
    search,
    coachNumber,
    coachtype,
    biotankNumber,
    biotankName,
    placement,
    creatAt,
    devision,
    zone,
  } = req.body;

  try {
    // Step 1: Get the last login
    const lastLogin = await LoginModel.findOne().sort({ _id: -1 }); 

    if (!lastLogin || !lastLogin.number) {
      return res.status(401).json({ message: "No logged in user found" });
    }

   
    const user = await RegisterModel.findOne({ number: lastLogin.number });

    if (!user) {
      return res.status(404).json({ message: "User not found in Register collection" });
    }

    const myId = user._id.toString();

    // Step 3: Create InputSchema entry
    const inputForm = await InputSchemaModel.create({
      search,
      myId,
      coachNumber,
      coachtype,
      biotankNumber,
      biotankName,
      placement,
      creatAt,
      devision,
      zone,
    });

    return res.status(201).json({
      message: "Input data submitted successfully",
      data: inputForm,
    });

  } catch (error) {
    console.error("InputBox Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};




// =================== Coach Type Section Insert API ===================
const coachTypesectionlist = async (req, res) => {
  const coachTypeList = [
    { key: 'First AC coach.1', value: 'First AC coach.1' },
    { key: 'Second AC coach.2', value: 'Second AC coach.2' },
    { key: 'Third AC coach.3', value: 'Third AC coach.3' },
    { key: 'GS. General Seating', value: 'GS. General Seating' },
    { key: 'WGSCN Sleeper Coach (non-AC)', value: 'WGSCN Sleeper Coach (non-AC)' }
  ];

  try {
    const insertedData = await coachTypeListModel.insertMany(coachTypeList);
    return res.status(201).json({
      status: true,
      message: "Coach type section list inserted successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Coach Type Insert Error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to insert coach type section list",
      error: error.message,
    });
  }
};

// =================== BioTenk Section Insert API ===================
const biotankNamesectionlist = async (req, res) => {
  const biotankList = [
    { key: 'AC1', value: 'AC1' },
    { key: 'AC2', value: 'AC2' },
    { key: 'AC3', value: 'AC3' },
  ];

  try {
    const biotenkData = await biotankNameListModel.insertMany(biotankList);
    return res.status(201).json({
      status: true,
      message: "Biotenk inserted successfully",
      data: biotenkData,
    });
  } catch (error) {
    console.error("Biotank Insert Error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to insert Biotanklist",
      error: error.message,
    });
  }
};

// =================== Division Section Insert API ===================
const divistiosectionlist = async (req, res) => {
  const devisionList = [
    { key: 'Division 1', value: 'Division 1' },
    { key: 'Division 2', value: 'Division 2' },
    { key: 'Division 3', value: 'Division 3' },
  ];

  try {
    const divistionData = await divisionListModel.insertMany(devisionList);
    return res.status(201).json({
      status: true,
      message: "devisionList inserted successfully",
      data: divistionData,
    });
  } catch (error) {
    console.error("devisionList Insert Error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to insert devisionList",
      error: error.message,
    });
  }
};

// =================== Zone Section Insert API ===================
const zonesectionlist = async (req, res) => {
  const zoneList = [
    { key: 'zone1', value: 'zone1' },
    { key: 'zone2', value: 'zone2' },
    { key: 'zone3', value: 'zone3' },
  ];

  try {
    const zoneData = await zoneListModel.insertMany(zoneList);
    return res.status(201).json({
      status: true,
      message: "zoneList inserted successfully",
      data: zoneData,
    });
  } catch (error) {
    console.error("zoneList Insert Error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to insert zoneList",
      error: error.message,
    });
  }
};

// =================== Submit 24 QuestionSet API ===================

const submitQuestionSet = async (req, res) => {
  try {
    const { quiz, loginRef } = req.body;

    if (!Array.isArray(quiz) || quiz.length !== 24) {
      return res.status(400).json({ status: false, message: 'Exactly 24 questions required' });
    }

    const data = await QuestionSetModel.create({ quiz, loginRef });
    res.status(201).json({ status: true, message: 'QuestionSet submitted', data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  register,
  login,
  Listbox,
  InputBox,
  coachTypesectionlist,
  biotankNamesectionlist,
  divistiosectionlist,
  zonesectionlist,
  submitQuestionSet 
};
