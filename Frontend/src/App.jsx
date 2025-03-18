import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Routers , Router} from "react-router-dom";
import Todo from "./components/Todo"
import React from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <h1>Todo List</h1>
    <BrowserRouter>
    <Routers>
      <Router path="/" element={<Todo/>}></Router>
    </Routers>
    </BrowserRouter>
    </div>
   
   
  )
}

export default App
