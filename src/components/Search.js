import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';


class Search extends Component {

    state = {
        searchResults: [],
        queryString: '',
    }

    performSearchAndUpdateState = event => {
        const queryString = event.target.value;
        this.setState({ queryString });

        BooksAPI.search(queryString).then(searchResults => searchResults ? this.setState({ searchResults }) : []);

    }


    getSearchResults(queryString, searchResults, allBooks, moveBookToShelf) {

        if (queryString) {

            return (
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults && searchResults.error ? <div>No results</div> : searchResults.map(
                            (book, index) => {
                                return (
                                    <Book
                                        key={index}
                                        book={book}
                                        moveBookToShelf={moveBookToShelf}
                                        allBooks={allBooks}
                                    />

                                )
                            }
                        )}

                    </ol>
                </div>);
        }

    }



    render() {
        const { searchResults, queryString } = this.state;
        const { allBooks, moveBookToShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    />
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input type="text" placeholder="Search by title or author"
                            value={queryString}
                            onChange={this.performSearchAndUpdateState} />

                    </div>
                </div>
                {this.getSearchResults(queryString, searchResults, allBooks, moveBookToShelf)}
            </div>
        );
    }



}

export default Search;