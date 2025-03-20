import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Todo from "./components/Todo"
import React from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
   <Todo/>
    </div>
   
   
  )
}

export default App
