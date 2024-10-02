import {useState} from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropType from "prop-types"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { setUser } from "../reducers/userReducer"
import useField from '../hooks/useField'
import { useNavigate } from "react-router-dom"
import { TextField, Button } from "@mui/material"

const LoginForm = (data) => {

    const username = useField()
    const password = useField()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const clearForm = () => {
        username.clearValue()
        password.clearValue()
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            if(username.value && password.value) {
                const result = await loginService.login({username: username.value, password: password.value})
                window.localStorage.setItem("loggedPerson", JSON.stringify(result))
                dispatch(setUser(result))
                dispatch(setNotification({text: "Successfully logged in", type: "success"}))
                blogService.setToken(result.token)
                navigate("/")
                clearForm()
            }
            else {
                dispatch(setNotification({text: "Please fill in the username and password", type: "error"}))
                clearForm()
            }
        }
        catch(error){
            console.log(error)
            dispatch(setNotification({text: "Invalid username or password", type: "error"}))
        }

     
    }

    return(
        <div>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', gap: '0.5rem', marginBottom: '1rem' }}>
                <div data-testid='username-div'>
                    <TextField label='Username' type="text" onChange={(event) => username.onChange(event)}/>
                </div>
                <div data-testid='password-div'>
                    <TextField label='Password' type="password" onChange={(event) => password.onChange(event)}/>
                </div>
                <div>
                    <Button color="primary" variant="contained" type="submit">Blogs</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm