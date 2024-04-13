const Input = ({text, handleFnc}) => {
    return (
        <div>{text} <input onChange={handleFnc} /></div>
    )
}

export default Input