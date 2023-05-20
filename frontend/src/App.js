import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main.jsx';
import Login from './components/Login/Login.jsx';


function App() {
  return (
    
		<div className="App">
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
