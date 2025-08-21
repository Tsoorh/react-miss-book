
export function BookModal({book,onHandleClick}){

    return <section className="modal-preview">
        <button className="modal-btn" onClick={onHandleClick}> X </button>
          <h3>{book.title}</h3>
          <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
          <p>{book.description}</p>
          <p>{book.listPrice.isOnSale?"In stock":"Sold out"}</p>
      </section>
}