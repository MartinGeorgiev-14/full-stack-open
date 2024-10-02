import BlogList from "./BlogList"
import UserList from "./UserList"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoggedUser from "./LoggedUser"
import { AppBar, Toolbar, Button } from "@mui/material"

const Navigation = () => {

    const user = useSelector(state => state.user)
    console.log(user)
    return (
        <AppBar position="static" sx={{
            marginBottom: '1rem'
        }}>
            <Toolbar sx={{ gap: "0.5rem" }}>
                <Button color="inherit" component={Link} to={'/'}>Home</Button>
                <Button color="inherit" component={Link} to={'/users'}>Users</Button>
                <Button color="inherit" component={Link} to={'/blogs'}>Blogs</Button>
                
                {
                    Object.keys(user).length > 0 ?
                    <LoggedUser user={user} /> :
                    <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                }
            </Toolbar>
        </AppBar>

    )
}

export default Navigation