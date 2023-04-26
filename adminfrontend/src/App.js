
import './App.css';
import React , {Fragment} from 'react'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
        <Router>
          <Routes>
            <Route index path='/' element={<HomePage />} />
            <Route index path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
  );
}

export default App;
