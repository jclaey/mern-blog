import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

const AdminSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

AdminSchema.methods.comparePasswords = async function(suppliedPassword) {
    return await bcrypt.compare(suppliedPassword, this.password)
}

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin