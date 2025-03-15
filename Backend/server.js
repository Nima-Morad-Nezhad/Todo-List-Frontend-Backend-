const express = require('express')
const main = require("./config/connect")
const app = express()
const cors = require("cors")
const port = 8000
const TodoTask = require("./Model/listModel")
app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})