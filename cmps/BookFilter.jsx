const { useState, useEffect } = React;
import { bookService } from "../services/book.service.js";

export function BookFilter(props) {
  const [range, setRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    bookService
      .getMinMaxPrice()
      .then((inputRange) => {
        setRange({
          min: inputRange.min,
          max: inputRange.max,
        });
        props.setfilterBy((prev) => ({ ...prev, priceRange: inputRange.max }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function onHandleCheckbox(event) {
    const { value } = event.target;
    props.setfilterBy((prev) => ({ ...prev, availability: value }));
  }
  function onChangeRangeFilter(event) {
    const { value } = event.target;
    props.setfilterBy((prev) => ({ ...prev, priceRange: value }));
  }

  function onFilterByName(event) {
    const { value } = event.target;
    props.setfilterBy((prev) => ({ ...prev, txt: value }));
  }
  return (
    <section className="filters">
      <div className="price-filter">
        <span>Price:</span>
        <input
          type="range"
          name="price-range"
          min={range.min}
          max={range.max}
          onChange={onChangeRangeFilter}
          value={props.filterBy.priceRange}
        />
        <label>{props.filterBy.priceRange} ILS</label>
      </div>
      <div className="text-filter">
        <input
          type="text"
          name="filterByText"
          placeholder="Search"
          onChange={onFilterByName}
          value={props.filterBy.txt}
        />
        <button>Search</button>
      </div>
      <div className="stock-filter">
        <input
          type="radio"
          name="availability"
          value="all"
          onChange={onHandleCheckbox}
        />
        <label>All</label>
        <input
          type="radio"
          name="availability"
          value="in-stock"
          onChange={onHandleCheckbox}
        />
        <label>In stock</label>
        <input
          type="radio"
          name="availability"
          value="sold-out"
          onChange={onHandleCheckbox}
        />
        <label>Sold out</label>
      </div>
    </section>
  );
}
