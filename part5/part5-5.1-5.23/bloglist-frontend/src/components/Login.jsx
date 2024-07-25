import {useState} from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropType from "prop-types"

const LoginForm = (data) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   
    const clearForm = () => {
        setUsername("")
        setPassword("")
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            if(username && password) {
                const result = await loginService.login({username, password})
                data.onLogin(result)

                window.localStorage.setItem("loggedPerson", JSON.stringify(result))
                blogService.setToken(result.token)
                data.setUserData(result)
                data.setMessage({text: "Successfully logged in", type: "success"})
                clearForm()
            }
            else {
                data.setMessage({text: "Please fill in the username and password", type: "error"})
                clearForm()
            }
        }
        catch(error){
            data.setMessage({text: "Invalid username or password", type: "error"})
        }

     
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <div data-testid='username-div'>
                    Username
                    <input type="text" name="username"
                    onChange={({target}) => setUsername(target.value)} data-testid='username'/>
                </div>
                <div data-testid='password-div'>
                    Password
                    <input type="password" name="password" 
                    onChange={({target}) => setPassword(target.value)} data-testid='password'/>
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onLogin: PropType.func.isRequired,
    setMessage: PropType.func.isRequired
}

export default LoginForm