import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import EmailHelper from "../utils/emailSender.util.js";

const otpGenerator = function () {
  return Math.floor((Math.random() * 10000) + 90000);
}

export const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            res.send({
                success: false,
                message: "The user already exists!",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashPwd = bcrypt.hashSync(req.body.password, salt);

        req.body.password = hashPwd;
        

        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "You've successfully signed up, please login now!",
        });
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.send({
                success: false,
                message: "user does not exist Please Register",
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.send({
                success: false,
                message: "Sorry, invalid password entered!",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
        expiresIn: "1d",
        });

        res.send({
            success: true,
            message: "You've successfully logged in!",
            token: token,
        });
    } catch (error) {
        console.error(error);
    }
}

export const getCurrentUser = async (req, res) => {

    const user = await User.findById(req.body.userId).select("-password");

    res.send({
        success: true,
        message: 'You are authorized to go to the protected route!',
        data: user
    })
}

export const forgotPassword = async function (req, res) {
    try {
        if (req.body.email == undefined) {
            return res.status(401).json({
            status: "failure",
            message: "Please enter the email for forget Password"
            })
        }

        let user = await User.findOne({ email: req.body.email });

        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found for this email"
            })
        }

        const otp = otpGenerator();

        user.otp = otp;

        user.otpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        res.status(200).json({
            status: "success",
            message: "otp sent to your email",
        });

        await EmailHelper(
            "otp.html",
            'BookMyShowDown OTP',
            user.email,
            {
                name: user.name,
                otp: otp
            });
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: "failure"
            })
        }
}

export const resetPassword = async function (req, res) {
    try {
        let resetDetails = req.body;

        if (!resetDetails.password == true || !resetDetails.otp == true) {
            return res.status(401).json({
                status: "failure",
                message: "invalid request"
            })
        }

        const user = await User.findOne({ otp: req.body.otp });

        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }

        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPwd = bcrypt.hashSync(req.body.password, salt);

        user.password = hashPwd;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            status: "success",
            message: "password reset successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}
