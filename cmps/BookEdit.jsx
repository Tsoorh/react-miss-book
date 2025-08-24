import { storageService } from "../services/async-storage.service.js";
const { useState } = React;

export function BookEdit(props) {
  const [newBook, setNewBook] = useState({
    title: "",
    subtitle:"",
    description: "",
    authors:[""],
    categories:[""],//list of categories?
    language:"",//list of languages
    pageCount:0,//
    publishedDate:0,//list of years
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
      newBook.subtitle !== "" &&
      newBook.authors[0]!== "" &&
      newBook.description !== "" &&
      newBook.pageCount !== 0 &&
      newBook.publishedDate !==0 &&
      newBook.listPrice.amount > 0 
    ) {
      storageService.post("bookDB",newBook);
    } else {
      console.log("Error creating new book");
      prompt("You missed something :/")
    }
    onHandleExit(ev);
    props.setfilterBy(prev=>({...prev}))
  }

  function onHandleChange(ev) {
    const { value, name, dataset,type ,id} = ev.target;
    const numValue = parseFloat(value);
    const parentKey = dataset.parent;
    if(parentKey) {//טיפול באובייקט
      console.log("in parentKey");
      
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
      } else if(id){//טיפול במערך        
        setNewBook(prev=>{
          const newArray =  [...prev[name]]
          return {...prev,[name]:newArray}
        })
      }else{
      setNewBook((prev) => {
        return { ...prev, [name]: value };
      });
    }
  }

  function onHandleAuthors(ev){
    ev.preventDefault();
    const {name,id} = ev.target;
    switch (name) {
      case "-":
      setNewBook(prev=>(
        {...prev,authors : prev.authors.filter((author,idx)=>{
          return (String(idx)!==String(id))
        })}
        
      ))      
      break;
      case "+":
        setNewBook(prev=>(
          {...prev,...prev.authors.push("")}
        ))
        break;
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
          <label name="subtitle">Subtitle :</label>
          <input
            type="text"
            name="subtitle"
            onChange={onHandleChange}
            value={newBook.subtitle}
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
        <div className="item-new-book multiple-inputs-author">
        {newBook.authors.map((author,index)=>{
          return(
            <div className="author-container" key={`${author}${index}`}>
            <label name="authors">Author :</label>
            <input
            type="text"
            name="authors"
            onChange={onHandleChange}
            value={author[index]}
            id={index}
            />
            <button name="+" id={index} onClick={onHandleAuthors}>+</button> 
            {(index>0)&&<button name="-" id={index} onClick={onHandleAuthors}>-</button>}
            </div>
          )
        })}
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
