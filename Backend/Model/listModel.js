const mongoose = require("mongoose");

const todoTaskSchema = new mongoose.Schema({
   task: {type : String, require:true},
    content:{
        type: String,
        require: true
    },
    date:{
        type:Date ,
        default: Date.now
    }
})
module.exports = mongoose.model("TodoTask", todoTaskSchema);