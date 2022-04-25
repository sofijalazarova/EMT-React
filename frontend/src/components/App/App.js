import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Redirect, Route, Routes} from 'react-router-dom'
import Books from '../Books/BookList/books'
import BookEdit from "../Books/BookEdit/bookEdit";
import Categories from '../Categories/categories';
import Header from '../Header/header';
import BookAdd from "../Books/BookAdd/bookAdd";
import LibraryService from "../../repository/libraryRepository";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        books: [],
        categories: [],
        authors: [],
        selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
                <Routes>
                    <Route path={"/categories"} exact element={<Categories categories={this.state.categories}/>}/>
                    <Route path={"/books/add"} exact element={<BookAdd onAddBook={this.addBook} authors={this.state.authors} categories={this.state.categories}/>}/>
                    <Route path={"/books/edit/:id"} exact element={
                        <BookEdit
                            book={this.state.selectedBook}
                            onEditBook={this.editBook}
                            authors={this.state.authors}
                            categories={this.state.categories}
                        />}/>
                    <Route path={"/books"} exact element={<Books onMark={this.markBook} onDelete={this.deleteBook} onEdit={this.getBook} books={this.state.books}/>}/>
                    <Route path={"/"} exact element={<Books onMark={this.markBook} onDelete={this.deleteBook} onEdit={this.getBook} books={this.state.books}/>}/>
                    <Route path="*" element={<Navigate to ="/books" />}/>
                </Routes>
            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.loadBooks();
    this.loadAuthors();
    this.loadCategories();
  }

  fetchData = () => {
    this.loadBooks()
    this.loadCategories();
  }


  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        });
  }

  addBook = (name, author, availableCopies, category) => {
    LibraryService.addBook(name, author, availableCopies, category)
        .then(() => {
          this.loadBooks();
        });
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editBook = (id, name, author, availableCopies, category) => {
    LibraryService.editBook(id, name, author, availableCopies, category)
        .then(() => {
          this.loadBooks()
        })
  }
}

export default App;

