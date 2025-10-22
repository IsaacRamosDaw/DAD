import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Meal from './components/Meal';
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/meal/:id' element={<Meal/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
