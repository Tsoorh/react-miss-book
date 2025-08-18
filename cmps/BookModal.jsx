
export function BookModal(props){

    return <section className="modal-preview">
        <button className="modal-btn" onClick={props.onHandleClick}> X </button>
          <h3>{props.book.title}</h3>
          <p>{props.book.listPrice.amount} {props.book.listPrice.currencyCode}</p>
          <p>{props.book.description}</p>
          <p>{props.book.isOnSale?"In stock":"Sold out"}</p>
      </section>
}