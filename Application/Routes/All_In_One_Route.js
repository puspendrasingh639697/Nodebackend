const mongoose = require("mongoose");
const { dataList } = require("../../utils/JsonData.js");


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
  const dataList = [
    { key: '1', value: 'Place the coach at maintenance workshop’s pit line, where forklift can be placed under the tank.' },
    { key: '2', value: 'Mark all the tanks with their respective coach number and lavatory number.' },
    { key: '3', value: 'Remove all the nut bolts used for fastening of safety ropes and safety ropes prokeye for IR-DRDE bio toilet retention tank.' },
    { key: '4', value: 'Dismount hose clamp prokeye for securing of Rubber hose at Lavatory Pan.' },
    { key: '5', value: 'Remove all the pneumatic pipes for flapper valve if any.' },
    { key: '6', value: 'Open all the nuts and washer with the help of suitable spanner/wrench. At least one bolt should remain in the holes of each mounting bracket and tank to avoid accidental dropage of tank during placement and lifting of the tank.' },
    { key: '7', value: 'Place the arms of fork lifter below tank and lift the tank slowly about half inch. Remove remaining bolts carefully.' },
    { key: '8', value: 'Remove all the tank with the help of fork lifter for thorough cleaning, tank and mounting brackets should be inspected for any damage, leakages etc.' },
    { key: '9', value: 'Complete tank evacuation and cleaning of whole tank.' },
    { key: '10', value: 'Ball valve should be overhauled and PTFE seal of Ball valve should be renewed 100% during POH. (Only in "P" Trap)' },
    { key: '11', value: 'Rubber connector should be renewed during POH.' },
    { key: '12', value: 'Replacement of poly grass mat with proper securing arrangement.' },
    { key: '13', value: 'If there is any damage or leakage in the tanks or non-confirming results of effluent discharges are being reported etc., these tanks should be drained out at designated place having proper drainage, cleaned properly and tank should be rectified for the deficiency noticed.' },
    { key: '14', value: 'If there is no deficiency found, it should be stored after cleaning in the racks (3-tier stacks as suggested by CAMTECH / Gwalior) earmarked for bio toilets. Racks should be placed in cool, safe area and without sunlight.' },
    { key: '15', value: 'Ingress of water, chemicals or any other foreign object to the tank should be prevented during storage of the bio toilet tanks.' },
    { key: '16', value: 'Then the coach should be sent to all regular stages of POH attention.' },
    { key: '17', value: 'After completion of POH of the coaches, tanks marked with respective coach number and lavatory number should be taken out from storage racks and restored in position.' },
    { key: '18', value: 'Check the rubber hose used for joining of P-trap and Lavatory pan for any defects, remove all dirt, scaling and old sealant before fixing it again.' },
    { key: '19', value: 'Reconnect pneumatic pipes for flapper valve if fitted with PLC version.' },
    { key: '20', value: 'Nut, bolts and spring washers used for mounting bracket and securing of safety rope should be checked for wear, tear or corrosion etc. and should be replaced with same size material and grades if defective.' },
    { key: '21', value: 'Check the safety rope before re-mounting for any defects.' },
    { key: '22', value: 'Ensure all the nuts and bolts used for mounting and securing of safety rope are properly tightened before dispatch of the coach.' },
    { key: '23', value: 'NDT of J Brackets/Positive mounting bracket.' },
    { key: '24', value: 'Tanks should be refilled with the required level of bacterial inoculum before dispatch of the coach.' }
  ];

  try {
    const { loginRef } = req.body;

    if (!loginRef) {
      return res.status(400).json({
        status: false,
        message: 'loginRef is required',
      });
    }

    if (!Array.isArray(dataList) || dataList.length !== 24) {
      return res.status(400).json({
        status: false,
        message: 'DataList must contain exactly 24 questions',
      });
    }

    const dataToInsert = dataList.map((item, index) => ({
      ...item,
      id: index + 1,
      question: `Step ${index + 1}: ${item.value.slice(0, 50)}...?`, 
      quiz: 'Yes',
      loginRef,
    }));

    // Bulk insert
    const savedData = await QuestionSetModel.insertMany(dataToInsert);

    return res.status(201).json({
      status: true,
      message: 'Question set submitted successfully',
      data: savedData,
    });

  } catch (error) {
    console.error('Error submitting question set:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error: ' + error.message,
    });
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
