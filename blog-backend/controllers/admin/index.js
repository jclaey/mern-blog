import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import Admin from "../../models/Admin.js"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (admin && await admin.comparePasswords(password)) {
            const token = jwt.sign(
                { adminId: admin._id },
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            )

            res.status(200).json({
                message: 'Login successful',
                token,
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