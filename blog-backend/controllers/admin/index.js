import crypto from 'node:crypto'
import Admin from "../../models/Admin.js"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (admin && await admin.comparePasswords(password)) {
            const token = jwt.sign(
                { adminId: admin._id },
                process.env.JWT_SECRET, // Store this securely in your environment variables
                { expiresIn: '1h' }    // Token expires in 1 hour
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