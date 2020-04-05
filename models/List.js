import {
    model,
    Schema
} from 'mongoose'

const ListSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    house: {
        type: String,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    repeat: {
        type: Array,
        default: []
    },
    day: {
        type: Array,
        default: []
    },
    enable: {
        type: Boolean,
        default: true
    },
    purpose: String,
    adminId: String
})

const List = model('list', ListSchema)

export default List;