
const PersonLine = ({name, number, id, fnc}) => {

    return(
        <>
            <p>{name} {number} <button onClick={fnc(id)}>delete</button></p>   
        </>
        
    )
}

export default PersonLine