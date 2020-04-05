import {
    model,
    Schema
} from 'mongoose'

const Adminchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const Admin = model('admin', Adminchema)

export default Admin;