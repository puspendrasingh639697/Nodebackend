const mongoose = require("mongoose");


// =================== Register Schema ===================
const registerSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  number: Number
});
const RegisterModel = mongoose.model("Register", registerSchema);

// =================== Login Schema ===================
const loginSchema = new mongoose.Schema({
    number: Number,
  password: String
});
const LoginModel = mongoose.model("Login", loginSchema);

// =================== List Box Schema ===================
const boxListSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  isShow: { type: Boolean, default: true }
}, { timestamps: true });
const BoxListSchemaModel = mongoose.model("Listbox", boxListSchema);

// =========================== Input Box Schema =============================
const inputSchema = new mongoose.Schema({
  search: String,
  userId : String,
  coachNumber: { type: String, required: true },
  coachtype: String,
  biotankNumber: { type: String, required: true },
  biotankName: { type: String, required: true },
  placement: { type: String, required: true },
  creatAt: { type: Date, default: Date.now },
  devision: { type: String, required: true },
  zone: { type: String, required: true }


}, { timestamps: true });
const InputSchemaModel = mongoose.model("InputBox", inputSchema);

// =========================== Coach Type List Schema =============================
const coachTypeListSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
}, { timestamps: true });
const coachTypeListModel = mongoose.model("CoachTypeList", coachTypeListSchema);

// ============================== Bio Tank List Schema =============================
const biotankListSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
}, { timestamps: true });
const biotankNameListModel = mongoose.model("BiotankList", biotankListSchema);

// ============================== Division List Schema =============================
const divisionListSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
}, { timestamps: true });
const divisionListModel = mongoose.model("DivisionList", divisionListSchema);

// ============================== Zone List Schema =============================
const zoneListSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
}, { timestamps: true });
const zoneListModel = mongoose.model("ZoneList", zoneListSchema);

// =================== 24 Question Answer Schema ===================
const answerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  quiz: { type: String, enum: ['Yes', 'No'], required: true }
});

const questionSetSchema = new mongoose.Schema({
  quiz: {
    type: [answerSchema],
    validate: [val => val.length === 24, 'Exactly 24 questions required']
  },
  loginRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  submittedAt: { type: Date, default: Date.now }
});
const QuestionSetModel = mongoose.model("QuestionSet", questionSetSchema);

// =================== Export ===================
module.exports = {
  RegisterModel,
  LoginModel,
  BoxListSchemaModel,
  InputSchemaModel,
  coachTypeListModel,
  biotankNameListModel,
  divisionListModel,
  zoneListModel,
  QuestionSetModel
};
