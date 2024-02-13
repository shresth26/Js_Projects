class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    static displayBooks(){

    const books = store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){

        const list = document.querySelector('#book-list');
        // alternatively we could've used document.getQueryById

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static showAlerts(message, className){

        const div = document.createElement('div');
        //bootstrap className could be success or danger(ex: alert-danger)
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        //container is the parent element where we need to insert this div
        const container = document.querySelector('.container');
        //we need a reference point above which we need to place our div
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }

    static deleteBook(el){
        if(el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
            // first parent element of the delete button is the td which will just remove
            // that particular element but not the whole row so we want to target its 
            // parent element i.e tr which is the whole row basically
        }
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

class store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null)
            books = [];

        else{
            //we need to parse it as json as we need to convert the
            //stored string as array of objects
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        
        const books = store.getBooks();

        books.push(book);

        //in local storage elements can't be stored as objects but 
        //shall be stored as strings
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach((book, index)=>{
            if(book.isbn === isbn)
            {
                books.splice(index, 1);
            } 
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// event for displaying the books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// event for adding new book from user input
document.querySelector('#book-form').addEventListener('submit', (e)=> {

    //this was written to avoid the default behaviour while submitting a form
    // i.e it gets refreshed but for smoother UI experience we do this
    e.preventDefault();

    //fetch values from user input
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
        // alert("please fill in all the required fields");   
        UI.showAlerts("please fill the required fields", 'danger');
    }

    else{

        const book = new Book(title, author, isbn);

        UI.addBookToList(book);

        store.addBook(book);

        UI.showAlerts("Book added successfully", 'success');

        // whatever the user has inputted in the fields, they do not get cleared
        // automatically so we need to clear them explicitly
        UI.clearFields();
    }
});

// remove a book from the list
document.querySelector('#book-list').addEventListener('click', (e)=> {
        //e.target propagates the selected element and gives the info of it
        UI.deleteBook(e.target);

        store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        UI.showAlerts("Book Deleted", 'success');
    });