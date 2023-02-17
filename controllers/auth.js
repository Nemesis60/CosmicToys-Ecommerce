const userModel = require('../models/userModel');
const bcryptAuth = require('../middleware/auth/encrypt-compare');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fName, lName, email, password, rol, imagePath } = req.body;

    
    if (!fName || !lName || !email || !password) {
        return res.status(400).json({ message: "all field are necessary" })
    }
    
    const isMatch = await userModel.findOne({ email: email })
    if (!isMatch) {
        // Using the function to encrypt created from ../middleware/auth/encrypt-decrypt
        const encryptPassword = await bcryptAuth.encrypt(password);

        const userObject = ({
            fName, lName, email, password: encryptPassword, rol, imagePath
        });

        const userSaved = await userModel.create(userObject)

        if (userSaved) {
            res.status(201).json(userSaved)
        } else {
            res.status(400).json({ message: "Invalid user data received" })
        }
    } else {
        res.send({ message: "this email is already used" })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(401).json({ message: "all fields are required" });
    }

    const user = await userModel.findOne({ email });
    
    // // Using the function to compare password with the encrypt password created from ../middleware/auth/encrypt-decrypt
    const pwdIsMatch = await bcryptAuth.compare(password, user.password)
    if (!pwdIsMatch) {
        return res.status(401).json({ message: "Incorrect Password" });
    }
    
    // Generate token
    const loginToken = jwt.sign(
        {
            _id: user._id,
            role: user.rol
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
        { "email": user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // this create a cookie that storage refreshToken
    res.cookie('jwt', loginToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    
    res.send({ user, loginToken })
}

const refreshToken = (req, res) => {
    const cookies = req.cookies

    if (!cookies.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });

            const user = await userModel.findOne({ email: decoded.email });

            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.rol
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '15m' }
            );

            res.json({ token });
        }
    )
}

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie Cleared' });
}

module.exports = {
    registerUser,
    login,
    refreshToken,
    logout
}