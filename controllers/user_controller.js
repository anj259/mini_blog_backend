const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// method for register user (auth)
const registerUser = async (req, res) => {
  const { user_name, email, password, mobileNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if(!user_name || !email || !password || !mobileNumber)
    {
        return res.status(400).json({ message: "All fields are required" });
    }

    // regular expression for email,password and mobile number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/
    const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one special character"
      });
    }

    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// method for login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    else  if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // Compare password with hash password stored in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token using jsonwebtoken that expires in 1 hour
    const token = jwt.sign(
        { id: user._id, email: user.email ,username: user.user_name },
        process.env.JWT_SECRET ,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login successful",
        user: {
        id: user._id,
        user_name: user.user_name,
        email: user.email,
        mobileNumber: user.mobileNumber
        },
        token
    });

    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};



//method for Get llist of all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // it is Excludes password in response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//method Get user by userid
const getUserById = async (req, res) => {
    try {
    const user = await User.findById(req.params.id).select("-password");  // it is Excludes password in response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// method for Update user
const updateUser = async (req, res) => {

    const { user_name, email, mobileNumber, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({ message: "User not found" });
        } 

        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
            if (emailExists) return res.status(400).json({ message: 'Email already in use' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        ).select("-password");

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// method for Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports ={registerUser,loginUser,getAllUsers,getUserById,updateUser,deleteUser}