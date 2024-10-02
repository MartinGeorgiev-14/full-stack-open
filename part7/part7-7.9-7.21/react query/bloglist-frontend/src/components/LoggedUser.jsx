import PropType from "prop-types"

const LoggedUser = (prop) => {
    
    const handleLogout = () => {
        prop.user.removeUser()
        window.localStorage.removeItem('loggedPerson')
    }
    
    return(
        <div>
            <p>{prop.user.state.name} logged in</p>
            <button type="input" onClick={handleLogout}>Logout</button>
        </div>
    )
}


export default LoggedUser;