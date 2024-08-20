
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div>
           filter <input type="text" onChange={handleChange}/>
        </div>
    )
}

export default Filter