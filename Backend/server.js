const express = require('express')
const main = require("./config/connect")
const app = express()
const cors = require("cors")
const port = 8000
const TodoTask = require("./Model/listModel")
const TodoList = require('./Model/listModel')
app.use(cors());
app.use(express.json())


app.get('/', async(req, res) => {
 await TodoTask.find({}).then((TodoList) => res.json(TodoList)).catch((err) => res.json(err))
})

app.post("/add", async(req,res) =>{
 await TodoTask.create({
    task: req.body.task,
    status: req.body.status,
  })
  .then((todo) =>{res.status(201).json(todo);
    console.log("added successfully!")
  } )
 .catch((err) =>{ res.status(500).json({ message: "Internal server error", error: err });
  console.error("Error Adding todo", err)
 } )

})

app.put("/update/:id", async (req,res)=>{
  const id = req.params.id;
  const updateData ={
    task: req.body.task,
    status: req.body.status
  };
  await TodoTask.findByIdAndUpdate(id,updateData).then((todo) =>{ res.status(201).json(todo);
    console.log("Your task is updated!")
  }).catch((err)=>{res.status(500).json({error:"Internal Server Error!"});
console.error("error updating task", err)})
})
app.delete("/delete/:id", async(req,res)=>{
 
    const id = req.params.id;
   await TodoTask.findByIdAndDelete({_id:id}).then((todo) => {res.status(201).json(todo);
    console.log("the task has deleted!")
   }).catch((err)=> {res.status(500).json({error: "Internal Server error!",err});
console.error("The task has not deleted!")
   })
 
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})