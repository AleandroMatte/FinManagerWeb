import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Navbar from './components/Sidebar';
import HomeContainer from './pages/Home/HomeContainer';
import useTokenCheck from './custom_hooks';
import DebtContainer from './pages/Debts/DebtContainer';
import WinContainer from './pages/Wins/WinContainer';


function App() {
   const location = useLocation();
   const isLoginPage = location.pathname === '/';
   const isRegisterPage = location.pathname === '/Register';



  return (
    <>

      {!isLoginPage && !isRegisterPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Home" element={<HomeContainer />} />
        <Route path="/Debts" element={<DebtContainer/>}></Route>
        <Route path="/Wins" element={<WinContainer/>}></Route>
      </Routes>
    </>
  )
}

export default App
