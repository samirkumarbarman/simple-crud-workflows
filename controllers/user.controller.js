import User from '../models/user.models.js';

export const registerUser = async (req, res) =>{
    try {
        const {username, email, password, role} = req.body;

        //if user already exist
        const existUser = await User.findOne({email});
        if(existUser) {
            res.status(400).json({message:"User already exist"})
        }
        //Create new user
        const newUser = new User({username, email, password, role});
        await newUser.save();
        res.status(201).json({message:"New user created successfully"});
    } catch (error) {
        res.status(500).json({message:"server error", error});
    }
};

//Get all user
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:"server error", error});
    }
};

//Get user by id
export const getUserById = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:"server error", error});
    }
};

//Update an user 
export const updateUser = async (req, res) => {
    try {
        const {username, email, role} = req.body;
        const update = {username, email, role};

        if(req.body.password){
            update.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        }

        const updateUs = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
            context: 'query'
        });

        if(!update) {
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({message:"server error", error});
    }
};

//Delete an user
export const deleteUser = async (req, res) => {
    try {
        const deleteUs = await User.findByIdAndDelete(req.params.id);
        if(!deleteUs){
            res.status(404).json({message:"user not found"});
        }
        res.status(200).json({message:"User deleted suuccessfully"});
    } catch (error) {
        res.status(500).json({message:"server error", error});
    }
};