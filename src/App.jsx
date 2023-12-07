import './App.css'
import Navbar from './components/header/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/main/Home';
import Search from './components/main/Search';

function App() {


  return (
    <>
     <Router>
     <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
    </>
  )
}

export default App
