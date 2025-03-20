const mongoose = require("mongoose");

const todoTaskSchema = new mongoose.Schema({
   task: {type : String, require:true},
    status:{
        type: String,
        require: true
    },
    deadline: {
        type: Date,
    },
})
const TodoList = mongoose.model("TodoTask" , todoTaskSchema)
module.exports = TodoList;