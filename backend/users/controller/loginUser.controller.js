import bcrypt from "bcryptjs";
import { User } from "../../model/user.model.js";
import { logActivity } from "../../utils/logActivity.js";
import { generateToken } from "../../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Account disabled",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    await logActivity({
      userId: user._id,
      action: "LOGIN",
      details: `${user.name} logged in`,
    });

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
