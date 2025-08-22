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

//simple data
// var booksDemo = [
//   {
//     id: "OXeMG8wNskc",
//     title: "metus hendrerit",
//     description:"placerat nisi sodales suscipit tellus",
//     listPrice: { amount: 109, currencyCode: "ILS", isOnSale: false },
//   },
//   {
//     id: "OXeaG8sNsoc",
//     title: "coca cola",
//     description:"wealawrat nishsdi soawales sueqwqscipit tellus",
//     listPrice: { amount: 60, currencyCode: "ILS", isOnSale: true },
//   },
//   {
//     id: "OXeLG8wRsK1",
//     title: "shrek book",
//     description:"weajydsat niftsdi sdeea ssoawales sbookslodfeit lifeless",
//     listPrice: { amount: 170, currencyCode: "ILS", isOnSale: false },
//   },
// ];

//full Data
var booksDemo = [
  {
    id: "OXeMG8wNskc",
    title: "metus hendrerit",
    subtitle: "mi est eros dapibus himenaeos",
    authors: ["Barbara Cartland"],
    publishedDate: 1999,
    description: "placerat nisi sodales suscipit tellus",
    pageCount: 713,
    categories: ["Computers", "Hack"],
    thumbnail: "http://ca.org/books-photos/20.jpg",
    language: "en",
    listPrice: { amount: 109, currencyCode: "EUR", isOnSale: false },
  },
];

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    // books = booksDemo; // relevant for ex-part1 with the simple data
    books = _createDemoBooks()
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

function _createDemoBooks() {
  const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
  const books = [];
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: "en",
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
  }
  console.log("books", books);
  return books;
}

function query(filterBy) {
  _createBooks();
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      books = books.filter((book) => regExp.test(book.title));
    }
    if (filterBy.priceRange) {
      books = books.filter(
        (book) => book.listPrice.amount <= filterBy.priceRange
      );
    }
    if (filterBy.availability === "sold-out") {
      books = books.filter((book) => !book.listPrice.isOnSale);
    } else if (filterBy.availability === "in-stock") {
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
    return storageService.post(BOOK_KEY, newBook);
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
