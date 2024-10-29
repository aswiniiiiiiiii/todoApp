import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import History from '../src/pages/History'


function App() {

  return (
    <>
     
      <Routes>
        <Route path='/History' element={<History/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
