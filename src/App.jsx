import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';


function App() {


  return (
    <Routes>
      <Route path="/Login" element = {<LoginPage/>}></Route>
      <Route path="/Register" element = {<RegisterPage/>}></Route>
      <Route  element={<></>}> {/*Autenticar para entrar*/}
        <Route path= "/Home" element = {<></>}></Route>
        <Route path= "/Debts" element = {<></>}></Route>
        <Route path= "/Wins" element = {<></>}></Route>
      </Route>
    </Routes>
  )
}

export default App
