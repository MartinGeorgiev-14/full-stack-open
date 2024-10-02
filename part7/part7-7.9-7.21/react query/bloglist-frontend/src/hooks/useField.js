import { useState } from "react";

const useField = () => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = () => {
        setValue('')
    }

    console.log(value)

    return { value, onChange, clear }  
} 

export default useField