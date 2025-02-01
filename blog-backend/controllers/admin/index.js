import jwt from 'jsonwebtoken'
import Admin from "../../models/Admin.js"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin || !(await admin.comparePasswords(password))) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const accessToken = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        admin.jwtRefreshToken = refreshToken
        await admin.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        console.log("✅ Login successful, refresh token set:", refreshToken)

        res.status(200).json({ 
            message: "Login successful", 
            accessToken 
        })

    } catch (err) {
        next(err)
    }
}

export const getDashboardAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password')

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        res.status(200).json(admin)
    } catch (err) {
        next(err)
    }
}

export const refreshAccessToken = async (req, res, next) => {
    try {
        console.log("🔹 Incoming refresh request...");
        console.log("🔹 Cookies received:", req.cookies); // ✅ Log received cookies

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            console.warn("❌ No refresh token found in request cookies.");
            return res.status(401).json({ message: "Unauthorized - No refresh token" });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        } catch (error) {
            console.error("❌ Expired or invalid refresh token:", error.message);
            return res.status(401).json({ message: "Refresh token expired. Please log in again." });
        }

        const admin = await Admin.findById(decoded.adminId);
        if (!admin || admin.jwtRefreshToken !== refreshToken) {
            console.error("❌ Refresh token mismatch in database.");
            admin.jwtRefreshToken = null;
            await admin.save();
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // ✅ Generate a new Access Token
        const newAccessToken = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken: newAccessToken });

    } catch (err) {
        console.error("❌ Error refreshing token:", err.message);
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        console.log("🔹 Received logout request...");

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            console.warn("❌ No refresh token found in cookies before logout.");
            return res.status(400).json({ message: "No refresh token found" });
        }

        console.log("🔹 Refresh Token Found:", refreshToken);

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        } catch (error) {
            console.error("❌ Invalid or expired refresh token during logout:", error.message);
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            console.warn("❌ No admin found for the provided refresh token.");
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // ✅ Clear jwtRefreshToken from database
        admin.jwtRefreshToken = null;
        await admin.save();
        console.log("✅ Refresh token removed from database");

        // ✅ Try Different Cookie Expiration Methods
        res.cookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false, // ✅ Set to true in production
            expires: new Date(0), // ✅ Forces immediate expiration
            maxAge: -1, // ✅ Forces immediate removal
        });

        console.log("✅ Logout successful");
        return res.status(200).json({ message: "Logout successful" });

    } catch (err) {
        console.error("❌ Logout error:", err.message);
        next(err);
    }
};