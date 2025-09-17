const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "Cet email existe déjà" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ firstName, lastName, email, password: hashedPassword, phone});
  await newUser.save();

  res.status(200).json({ message: "Utilisateur crée avec succès" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Informations invalides" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Informations invalides" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};


module.exports = { register, login };
