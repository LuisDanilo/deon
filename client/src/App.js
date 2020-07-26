import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Testo from './pages/Testo/Testo'
import './App.scss';



function App() {
  return (
    <div className="App ">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/testo' component={Testo}/>
      </Switch>
    </div>  
  );
}

export default App;
