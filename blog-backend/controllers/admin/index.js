import jwt from 'jsonwebtoken'
import Admin from "../../models/Admin.js"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (admin && await admin.comparePasswords(password)) {
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

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            await admin.save()

            res.status(200).json({
                message: 'Login successful',
                accessToken,
                adminId: admin._id
            })
        } else {
            res.status(401)
            throw new Error('Invalid credentials')
        }
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
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)

        const admin = await Admin.findById(decoded.adminId)

        if (!admin || admin.refreshToken !== refreshToken) {
            if (admin) {
                admin.refreshToken = null
                await admin.save()
            }
            return res.status(403).json({ message: 'Invalid refresh token' })
        }

        const newAccessToken = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        res.status(200).json({
            accessToken: newAccessToken,
        })
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        const { adminId } = req.body

        const admin = await Admin.findById(adminId)

        if (admin) {
            admin.refreshToken = null
            await admin.save()
            res.status(200).json({ message: 'Logged out successfully' })
        } else {
            res.status(400).json({ message: 'Admin not found' })
        }
    } catch (err) {
        next(err)
    }
}