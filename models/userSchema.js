// const mongoConnect = require('../util/database')



// class Users {
//     constructor(name, email, created, password, lastActive, active, otp) {
//         this.name = name;
//         this.email = email;
//         this.created = created;
//         this.password = password;
//         this.lastActive = lastActive;
//         this.active = active;
//         this.otp = otp:
//     }

//     save() {

//     }



// }




// module.exports = Users



const mongoose = require("mongoose");
const { MongoTopologyClosedError } = require('mongodb');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        requried: true,
    },
    created: {
        type: String,
        default: new Date().toISOString(),
    },
    password: {
        type: String,
        required: true,
    },
    lastActive: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        required: true,
    },

});















module.exports = mongoose.model('User', userSchema);