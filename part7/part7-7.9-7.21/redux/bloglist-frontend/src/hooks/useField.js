import { useState } from "react"

const useField = () => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    };

    const clearValue = () => {
        setValue("")
    }

    return { value, onChange, clearValue }
}

export default useField