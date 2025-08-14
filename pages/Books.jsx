import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React;

export function Books() {
  const [range, setRange] = useState({ min: 0, max: 0 });
  const [filterBy, setfilterBy] = useState({
    txt: "",
    priceRange: 0,
    availability: "",
  });

  useEffect(() => {
    bookService
      .getMinMaxPrice()
      .then((inputRange) => {
        setRange({
          min: inputRange.min,
          max: inputRange.max,
        });
        setfilterBy((prev) => ({ ...prev, priceRange: inputRange.max }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    bookService.query(filterBy)
  }, [filterBy]);

  function onChangeRangeFilter(event) {
    const { value } = event.target;
    setfilterBy((prev) => ({ ...prev, priceRange: value }));
  }

  function onFilterByName(event) {
    const { value } = event.target;
    setfilterBy((prev) => ({ ...prev, txt: value }));
  }

  function onHandleCheckbox(event) {
    const { value } = event.target;
    setfilterBy((prev)=>({...prev,availability:value}))
  }

  return (
    <section className="books-page">
      <section className="filters">
        <div className="price-filter">
          <span>Price:</span>
          <input
            type="range"
            name="price-range"
            min={range.min}
            max={range.max}
            onChange={onChangeRangeFilter}
            value={filterBy.priceRange}
          />
          <label>{filterBy.priceRange} ILS</label>
        </div>
        <div className="text-filter">
          <input
            type="text"
            name="filterByText"
            placeholder="Search"
            onChange={onFilterByName}
            value={filterBy.txt}
          />
          <button>Search</button>
        </div>
        <div className="stock-filter">
          <input type="radio" name="availability" value="all" onChange={onHandleCheckbox} />
          <label>All</label>
          <input type="radio" name="availability" value="in-stock" onChange={onHandleCheckbox} />
          <label>In stock</label>
          <input type="radio" name="availability" value="sold-out" onChange={onHandleCheckbox} />
          <label>Sold out</label>
        </div>
      </section>
      <h1>Books</h1>
      <BookList 
      filterBy = {filterBy}/>
    </section>
  );
}
