import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './Components/AnimatedRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <NavBar/>
      <div>
        <AnimatedRoutes/>
      </div>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;