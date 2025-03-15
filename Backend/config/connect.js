const mongoose = require("mongoose");
// const url = 'mongodb+srv://nmoradidev:1234nima@cluster0.vfer8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
main().then(()=> {console.log("connected to the DB")}).catch(err => console.log("Is not able to connect" ,err));
async function main(){
    await mongoose.connect(process.env.MONGO_DB)
}
module.exports = main;