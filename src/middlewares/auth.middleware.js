import jwt from "jsonwebtoken";

export const auth = (req , res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(process.env.JWT_SECRET_KEY)
        console.log(verifiedtoken);
        req.body.userId = verifiedtoken.userId;
        next();
    } catch (error) {
        res.status(401).send({ success: false, message: "Token Invalid" });
    }
}