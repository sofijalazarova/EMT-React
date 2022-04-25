import axios from '../custom-axios/axios';

const LibraryService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    markBook: (id) => {
        return axios.put(`/books/mark/${id}`);
    },
    addBook: (name, author, availableCopies, category) => {
        return axios.post("/books/add", {
            "name": name,
            "author": author,
            "availableCopies": availableCopies,
            "category": category
        });
    },
    editBook: (id, name, author, availableCopies, category) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "author": author,
            "availableCopies": availableCopies,
            "category": category
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
}

export default LibraryService;
