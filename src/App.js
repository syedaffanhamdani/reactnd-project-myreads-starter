import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';

class BooksApp extends React.Component {

  state = {
    allBooks:[],
  }

  componentDidMount() {
    this.getBooks().then(allBooks => this.setState({ allBooks }));
  }

  moveBookToShelf= (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(serverResponse => {
      updatedBook.shelf = shelf;
      // just update the book in the local memory
      this.setState(prevState => ({
        allBooks: prevState.allBooks
          .filter(book => book.id !== updatedBook.id)
          .concat(updatedBook) }));
  })}


  getBooks() {
    return BooksAPI.getAll();
  }

  render() {
    const { allBooks } = this.state;
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (<Shelf allBooks={allBooks} moveBookToShelf={this.moveBookToShelf}/>)} />
          <Route exact path='/search' render={() => (<Search allBooks={allBooks} moveBookToShelf={this.moveBookToShelf}/>)} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
