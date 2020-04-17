import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';




class Shelf extends Component {



    renderShelf(books, title, allBooks, moveBookToShelf) {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books && books.map((book, index) =>
                                <Book
                                    key={index}
                                    book={book}
                                    allBooks={allBooks}
                                    moveBookToShelf={moveBookToShelf}
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

        const { allBooks, moveBookToShelf } = this.props;
        const currentlyReadingBooks = allBooks ? allBooks.filter(book => book.shelf === 'currentlyReading') : null;
        const readBooks = allBooks ? allBooks.filter(book => book.shelf === 'wantToRead') : null;
        const wantToReadBooks = allBooks ? allBooks.filter(book => book.shelf === 'read') : null;

        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {this.renderShelf(currentlyReadingBooks, 'Currently Reading', allBooks, moveBookToShelf)}
                        {this.renderShelf(readBooks, 'Want to Read', allBooks,moveBookToShelf)}
                        {this.renderShelf(wantToReadBooks, 'Read', allBooks, moveBookToShelf)}
                    </div>
                </div>
                <Link className="open-search" to="/search" />
            </div>
        )
    }
}

export default Shelf;