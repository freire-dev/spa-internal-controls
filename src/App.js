import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Workarea from './pages/Workarea';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/workarea" element={<Workarea/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
