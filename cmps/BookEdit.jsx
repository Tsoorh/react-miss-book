export function BookEdit(props){
    
    function handleExit(ev){
        ev.preventDefault();
        props.onHandleAddBook();
    }

    return(
        <form>
            <button className="modal-btn" onClick={handleExit}>X</button>
            <h3>Enter new book</h3>
            <input type="text" name="title"/>
            <label name="title">Title</label>
            <input type="number" name="price"/>
            <label name="price">Price in ILS</label>

            <p>Is available?</p>
            <input type="radio" name="availability-true"/>
            <label>Yes</label>
            <input type="radio" name="availability-false"/>
            <label>No</label>

        </form>
    )
}