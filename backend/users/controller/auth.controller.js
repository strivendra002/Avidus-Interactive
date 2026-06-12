import { User } from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      
      success: false,
      message: error.message,
      
    });
  }
};
