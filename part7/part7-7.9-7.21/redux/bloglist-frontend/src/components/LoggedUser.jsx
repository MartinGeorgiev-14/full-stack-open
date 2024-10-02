import PropType from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../reducers/userReducer"
import { Button } from '@mui/material'

const LoggedUser = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    const style = {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
    }

    const handleLogout = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('loggedPerson')
    }
    
    return(
        <div style={style}>
            <p style={{ fontWeight: 'bold' }}>{user.name} logged in</p>
            <Button color="inherit" variant="contained" type="submit" onClick={handleLogout} sx={{
                p: '0.2rem'
            }}>Logout</Button>
        </div>
    )
}

export default LoggedUser;