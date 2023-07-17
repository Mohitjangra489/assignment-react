import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Admin from './components/Admin';
import Mainpage from './components/Mainpage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/mainpage' element={<Mainpage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
