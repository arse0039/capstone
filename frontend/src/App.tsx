import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InputBar } from './components/Input';
import { NavBar } from './components/Nav';
import { About } from './components/About';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
`

const App = () => {
  const links = [
    {name: 'Home', url: '/'},
    {name: 'About', url: '/about'},
  ]
  return (
    <div className="App">
      <GlobalStyles />   
      <NavBar navLinks={links} />
        <Router>
          <Routes>
            <Route path='/' Component={InputBar} />
            <Route path='/about' Component={About} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
