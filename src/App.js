import './App.css';
import Auth from './components/Auth';
import MainFeed from './components/MainFeed';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path='/feed' element={<MainFeed />} />
      </Routes>
    </Router>
    
  );
}

export default App;
