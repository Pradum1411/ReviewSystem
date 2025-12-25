import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

import './index.css';


function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
          <Route path="/" element={<Home/>}/>
          </Routes>
         <Footer/>
        </div>
      </Router>
      );
}

export default App;