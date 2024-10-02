import {useState} from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropType from "prop-types"
import useField from "../hooks/useField"

const LoginForm = (data) => {

    const username = useField()
    const password = useField()
   
    const clearForm = () => {
        username.clear()
        password.clear()
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            if(username && password) {
                const result = await loginService.login({username: username.value, password: password.value})
                window.localStorage.setItem("loggedPerson", JSON.stringify(result))
                blogService.setToken(result.token)
                data.user.setUser(result)
                data.message.setNotificationMessage("Successfully logged in", 'success')
                clearForm()
            }
            else {
                data.message.setNotificationMessage("Please fill in the username and password", 'error')
                clearForm()
            }
        }
        catch(error){
            data.message.setNotificationMessage("Invalid username or password", 'error')
        }

     
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <div data-testid='username-div'>
                    Username
                    <input type="text" name="username"
                    onChange={(target) => username.onChange(target)} data-testid='username' value={username.value}/>
                </div>
                <div data-testid='password-div'>
                    Password
                    <input type="password" name="password" 
                    onChange={(target) => password.onChange(target)} data-testid='password' value={password.value}/>
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}


export default LoginForm