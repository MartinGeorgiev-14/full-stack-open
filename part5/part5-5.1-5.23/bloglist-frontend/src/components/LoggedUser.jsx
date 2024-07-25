import PropType from "prop-types"

const LoggedUser = ({userData, setUserData}) => {
    
    const handleLogout = () => {
        setUserData({})
        window.localStorage.removeItem('loggedPerson')
    }

    if(userData){
        
    }
    
    return(
        <div>
            <p>{userData.name} logged in</p>
            <button type="input" onClick={handleLogout}>Logout</button>
        </div>
    )
}

LoggedUser.propTypes = {
    userData: PropType.object,
    setUserData: PropType.func
}

export default LoggedUser;