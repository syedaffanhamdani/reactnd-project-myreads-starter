import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom'
import Book from './Book';




class Shelf extends Component {

    state = {
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        alreadyReadBooks: []
    };
    componentDidMount() {
        this.getBooks();
    }

    moveBookToShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }


    getBooks() {


        BooksAPI.getAll().then(books => {
            let currentlyReadingBooks = books ? books.filter(book => 'currentlyReading' === book.shelf) : null;

            let wantToReadBooks = books ? books.filter(book => book.shelf === 'wantToRead') : null;

            let alreadyReadBooks = books ? books.filter(book => book.shelf === 'read') : null;

            this.setState({ currentlyReadingBooks, wantToReadBooks, alreadyReadBooks });
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
                    <Link to="/search" className="open-search"></Link>
                </div>
            </div>
        )
    }

    render() {
        const { currentlyReadingBooks, wantToReadBooks, alreadyReadBooks } = this.state;
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {this.renderShelf(currentlyReadingBooks, 'Currently Reading')}
                        {this.renderShelf(wantToReadBooks, 'Want to Read')}
                        {this.renderShelf(alreadyReadBooks, 'Read')}
                    </div>
                </div>
                <Link lassName="open-search" to="/search" />
            </div>
        )
    }
}

export default Shelf;