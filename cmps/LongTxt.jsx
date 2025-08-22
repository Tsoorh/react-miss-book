const { useEffect,useState } =React;

export function LongTxt({txt,length=100}) {

//להציג את האורך הראשוני של הטקסט - 100 תווים עם אופציה לקרא עוד...
    const [textToShow,setTextToShow] = useState("");
    const [readMore,setReadMore] = useState(false);

    function onHandleReadMore(){
        setReadMore(prev=>!prev)
    }

    useEffect(()=>{
        if(readMore){
            setTextToShow(txt)
        } else{
            setTextToShow(txt.substr(0,length) + '...');
        }
    },[readMore])

    return(
        <div>
            <p>{textToShow}</p>
            <button onClick={onHandleReadMore}>{readMore ?"Read Less":"Read more"}</button>
        </div>
    )
    
}