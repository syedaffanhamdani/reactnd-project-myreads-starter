import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom'
import Book from './Book';




class Shelf extends Component{

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };
    componentDidMount() {
        this.getBooks();
    }

    moveBookToShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    getBooks() {

    
        BooksAPI.getAll().then(books => {
            const matchCR = new RegExp(escapeRegExp('currentlyReading'));
            let currentlyReading = books ? books.filter(book => matchCR.test(book.shelf)) : null;
    
            const matchWR = new RegExp(escapeRegExp('wantToRead'));
            let wantToRead = books ? books.filter(book => matchWR.test(book.shelf)) : null;
    
            const matchR = new RegExp(escapeRegExp('read'));
            let read = books ? books.filter(book => matchR.test(book.shelf)) : null;
    
            this.setState({ currentlyReading, wantToRead, read });
        });
    }

    renderShelf(books, title) {
        return (
            <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) =>
                            <Book
                                key={index}
                                book={book}
                                moveBookToShelf={this.moveBookToShelf.bind(this)}
                            />)}
                    </ol>
                </div>
            </div>
            <div className="open-search">
            <Link to="/search"></Link>
          </div>
          </div>
        )
    }

render(){
    const { currentlyReading, wantToRead, read } = this.state;
    return(
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        {this.renderShelf(currentlyReading, 'Currently Reading')}
            {this.renderShelf(wantToRead, 'Want to Read')}
            {this.renderShelf(read, 'Read')}
        </div>
    </div>
)}
}

export default Shelf;