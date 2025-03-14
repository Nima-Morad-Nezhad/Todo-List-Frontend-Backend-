const mongoose = require("mongoose");

main().then(()=> {console.log("connected to the DB")}).catch(err => console.log("Is not able to connect" ,err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
}
module.exports = main;