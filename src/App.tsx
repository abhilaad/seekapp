import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import CountryDetailPage from "./pages/CountryDetailPage";
import { ThemeProvider } from "./themes/themeContext";
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (    
    <Provider store={store}>
    <ThemeProvider>      
     <Router>    
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<CountryDetailPage />} />
        </Routes>
      </Router> 
    </ThemeProvider> 
    </Provider>
  )
}

export default App
