import React from 'react';


function Book(props) {
    const { book, allBooks, moveBookToShelf } = props;

    let currentShelf = 'none';

        for (let item of allBooks) {
            if (item.id === book.id) {
                currentShelf = item.shelf;
                console.log("found match");
                console.log("current shelf: "+currentShelf);
                book.shelf=item.shelf;

                break;
            }
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks && props.book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={e => moveBookToShelf(book, e.target.value)} value={book.shelf} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors}</div>
            </div>
        </li>)

}


export default Book;