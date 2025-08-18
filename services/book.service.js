import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const BOOK_KEY = "bookDB";
// _createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getMinMaxPrice,
};

var booksDemo = [
  {
    id: "OXeMG8wNskc",
    title: "metus hendrerit",
    description:"placerat nisi sodales suscipit tellus",
    listPrice: { amount: 109, currencyCode: "ILS", isOnSale: false },
  },
  {
    id: "OXeaG8sNsoc",
    title: "coca cola",
    description:"wealawrat nishsdi soawales sueqwqscipit tellus",
    listPrice: { amount: 60, currencyCode: "ILS", isOnSale: true },
  },
  {
    id: "OXeLG8wRsK1",
    title: "shrek book",
    description:"weajydsat niftsdi sdeea ssoawales sbookslodfeit lifeless",
    listPrice: { amount: 170, currencyCode: "ILS", isOnSale: false },
  },
];

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    books = booksDemo;
    utilService.saveToStorage(BOOK_KEY, books);
  }
}

function _createBook(
  title,
  listPrice = { amount: "", currencyCode: "ILS", isOnSale: true }
) {
  const book = getEmptyBook(title, listPrice);
  book.id = utilService.makeId();
  return book;
}

function query(filterBy) {
  _createBooks();
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      books = books.filter((book) => regExp.test(book.title));
    }
    if (filterBy.priceRange) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.priceRange);
    }
    if(filterBy.availability === "sold-out"){
      books = books.filter((book) => !book.listPrice.isOnSale);
    }else if(filterBy.availability === "in-stock"){
      books = books.filter((book) => book.listPrice.isOnSale);
    }
    return books;
  });
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    book = _setNextPrevBookId(book);
    return book;
  });
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(title = "", listPrice = {}) {
  return { title, listPrice };
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextBookId = nextBook.id;
    book.prevBookId = prevBook.id;
    return book;
  });
}

function getMinMaxPrice() {
  return storageService
    .query(BOOK_KEY)
    .then((books) => {
      let minPrice = books[0].listPrice.amount;
      let maxPrice = books[0].listPrice.amount;
      books.forEach((book) => {
        if (book.listPrice.amount < minPrice) {
          minPrice = book.listPrice.amount;
        }
        if (book.listPrice.amount > maxPrice) {
          maxPrice = book.listPrice.amount;
        }
      });
      const range = { min: minPrice, max: maxPrice };
      return range;
    })
    .catch((err) => {
      return console.log(
        "error trying to query Books in func getMinMaxPrice: ",
        err
      );
    });
}
