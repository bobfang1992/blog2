import './App.css';
import { Route, Routes, Link } from "react-router-dom"
import Home from './Home'
import About from './About'

function NavBar(user) {
  return (
    <ul className='navbar-ul'>
      <li className='navbar-li'><Link to='/'>Home</Link></li>
      <li className='navbar-li'><Link to='/about'>About</Link></li>
    </ul >
  )
}

function App() {
  return (
    <>
      <div className="App">
        <h1>CS Grinding</h1>
        <NavBar />
        <hr />
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>


        <footer>
          <hr></hr>
          <h2>Contact</h2>
          <a class="twitter-share-button"
            href="https://twitter.com/intent/tweet?text=@bobfang1992">
            twitter</a>
        </footer>

      </div>
    </>
  );

}

export default App;
