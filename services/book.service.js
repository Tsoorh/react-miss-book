import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const BOOK_KEY = 'bookDB'
_createBooks();

const booksDemo = [
  {
    id: "OXeMG8wNskc",
    title: "metus hendrerit",
    listPrice: { amount: 109, currencyCode: "ILS", isOnSale: false },
  },
  {
    id: "OXeaG8sNsoc",
    title: "coca cola",
    listPrice: { amount: 60, currencyCode: "ILS", isOnSale: true },
  },
  {
    id: "OXeLG8wRsK1",
    title: "shrek book",
    listPrice: { amount: 170, currencyCode: "ILS", isOnSale: false },
  },
];

function _createBooks(){
    const books = utilService.loadFromStorage(BOOK_KEY);
    if (!books && !books.length){
        books = booksDemo;
        utilService.saveToStorage(BOOK_KEY,books)
    }
}

function _createBook(title, listPrice = {amount:,currencyCode:"ILS",isOnSale:true}) {
    const car = getEmptyCar(title,listPrice)
    book.id = utilService.makeId()
    return book
}

function query(filterBy = {}) {
    return (
            storageService.query(BOOK_KEY)
            .then(books =>{
                if(filterBy.txt) {
                    const regExp = new RegExp(filterBy.txt, 'i')
                    books = books.filter(book => regExp.test(book.title))
                }
                if (filterBy.listPrice.amount) {
                books = books.filter(book => book.amount <= filterBy.listPrice.amount)
                }
                return books;
            })
    )
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(car)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title ='',listPrice = {}) {
    return { title, listPrice }
}
