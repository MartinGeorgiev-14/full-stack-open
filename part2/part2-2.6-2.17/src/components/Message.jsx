const Message = (props) => {
    const messageStyles = {
        color: "green",
        backgroundColor: "gray",
        border: "4px solid green",
        fontSize: "2rem",
        padding: "0.5rem"
    }


    return(
        <div className={props.class}>
        {props.message}
        </div>
    )
}

export default Message