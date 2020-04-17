import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Search from './components/Search';

class BooksApp extends React.Component {
  
  render() {
    return (
      <Router>
      <div className="app">
        
      <Route exact path='/' component={Shelf}/>
      <Route exact path='/search' component={Search}/>
      </div>

      </Router>
    )
  }
}

export default BooksApp
