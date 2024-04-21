import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './Components/Explore';
import Header from './Components/Header';
import Auth from './Pages/Auth';
import Home from './Components/Home';
import Dashboard from './Pages/Dashboard';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';


function App() {

  const  {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)


  return (
    <div >
      {/* <Routes>
        <Route  element={<Header />} />
        <Route path='about' element={<About />} />
        <Route element={<Explore />} />
        <Route  element={<Contacts />} />
        <Route path='/login' element={ <Auth />} />
        <Route path='/register' element={ <Auth />} />
      </Routes> */}


  
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"}/>} />
        <Route path='/dashboard' element={isAuthToken ? <Dashboard/> : <Home/>} />

        <Route path='/wishlist' element={<Wishlist head={"head"}/>} />
        <Route path='/cart' element={<Cart head={"head"}/>} />
        <Route path='/profile' element={<Profile head={"head"}/>} />
        <Route path='/explore' element={<Explore head={"head"}/>} />
        




      </Routes>


    </div>
  );
}

export default App;

{/* <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"} />} />
      </Routes> */}