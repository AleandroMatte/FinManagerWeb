import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';


function App() {


  return (
    <Routes>
      <Route path="" element = {<LoginPage/>}></Route>
      <Route path="/Register" element = {<RegisterPage/>}/>
      <Route path= "/Home" element = {<h1>home </h1>}></Route>
      <Route path= "/Debts" element = {<></>}></Route>
      <Route path= "/Wins" element = {<></>}></Route>
    </Routes>
  )
}

export default App
