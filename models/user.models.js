import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const roles = ["admin","user"];
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true,"username required"],
        unique : true,
        trim : true,
    },

    email :{
        type : String,
        required : [true, "email required"],
        unique : true,
        lowercase : true,
        trim : true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },

    password :{
        type : String,
        required : [true, "password required"],
        select : false,
        minlength : 6,
    },

    role :{
        type : String,
        enum : roles,
        default : "user",
    },
}, { timestamps : true, });


// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        next();
    } catch (err) {
        return next(err);
    }
});

//Compare password
userSchema.methods.comparePassword = async function (userPassword) {
    try {
        return await bcrypt.compare(userPassword, this.password);
    } catch (err) {
        throw new Error("Error comparing passwords");
    }
};

const User = mongoose.model("User", userSchema);
export default User;