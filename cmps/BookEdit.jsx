import { storageService } from "../services/async-storage.service.js";
const { useState } = React;

export function BookEdit(props) {
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    listPrice: { amount: 0, currencyCode: "ILS", isOnSale: true },
  });

  function onHandleExit(ev) {
    ev.preventDefault();
    props.onHandleAddBook();
  }

  function onHandleAdd(ev) {
    ev.preventDefault();
    if (
      newBook.title !== "" &&
      newBook.listPrice.amount > 0 &&
      newBook.description !== ""
    ) {
      storageService.post("bookDB",newBook);
    } else {
      console.log("Error creating new book");
    }
    onHandleExit(ev);
  }
  function onHandleChange(ev) {
    const { value, name, dataset,type } = ev.target;
    const numValue = parseFloat(value);
    const parentKey = dataset.parent;
    if (parentKey) {
      setNewBook((prev) => {
        if (type==="number"){
            return {
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [name]: numValue
                },
            };
        }else{
            return {
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [name]: value
                },
            };
        }
      });
    } else {
      setNewBook((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }

  return (
    <section className="modal-preview new-book-section">
      <h3>Enter new book</h3>
      <form className="book-edit-form">
        <button className="modal-btn" onClick={onHandleExit}>
          X
        </button>
        <div className="item-new-book">
          <label name="title">Title :</label>
          <input
            type="text"
            name="title"
            onChange={onHandleChange}
            value={newBook.title}
          />
        </div>
        <div className="item-new-book">
          <label name="price">Price (ILS) :</label>
          <input
            type="number"
            data-parent="listPrice"
            name="amount"
            onChange={onHandleChange}
          />
        </div>
        <div className="item-new-book">
          <label name="description">Description :</label>
          <input
            type="text"
            name="description"
            onChange={onHandleChange}
            value={newBook.description}
          />
        </div>

        <div>
          <p>Is available?</p>
          <input
            type="radio"
            data-parent="listPrice"
            name="isOnSale"
            value={true}
            onChange={onHandleChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            data-parent="listPrice"
            name="isOnSale"
            value={false}
            onChange={onHandleChange}
          />
          <label>No</label>
        </div>
        <button className="btn-add-book" onClick={onHandleAdd}>
          Add
        </button>
      </form>
    </section>
  );
}
