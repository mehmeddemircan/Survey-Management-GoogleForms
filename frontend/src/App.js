
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import SurveyDetailsPage from './pages/SurveyDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
        <Router>
          <Routes>
            <Route index path='/anketler/:id' element={<SurveyDetailsPage />} />
            <Route  path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
  );
}

export default App;
