import { useState } from 'react'
import Login from './Components/Login'
import Header from './Components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login/>
      <Header/>
    </div>
  )
}

export default App
