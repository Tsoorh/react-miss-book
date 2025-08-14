export function BookPreview(props) {
  return (
    <div key={props.book.id} className="book-div">
      <h3>{props.book.title}</h3>
      <p>
        {props.book.listPrice.amount} {props.book.listPrice.currencyCode}
      </p>
      <p>{props.book.listPrice.isOnSale ? "In stock" : "Sold out"} </p>
    </div>
  );
}
