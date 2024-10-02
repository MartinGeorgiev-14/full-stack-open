import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogCreator from './components/BlogsCreator'
import LoggedUser from './components/LoggedUser'
import Message from './components/Message'
import Toggable from './components/Toggable'
import BlogList from './components/BlogList'
import useNotification from './hooks/useNotification'
import useUser from './hooks/useUser'


const App = () => {
  // const [blogs, setBlogs] = useState([])
  const message = useNotification()
  const user = useUser()
  

  const handleUserData = (data) => {
    setUserData(data)
  }

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedPerson")

    if (loggedUserJson) {
      const response = JSON.parse(loggedUserJson)
      user.setUser(response)
      blogService.setToken(response.token)
    }
  }, [])



 

  return (
    <div>
      <Message message={message}/>
      {Object.keys(user.state).length !== 0 ? <>
        <LoggedUser user={user}/>
        <Toggable buttonLabelOpen={"Create blog"} buttonLabelClose={"Cancel"}>
          <BlogCreator message={message}/>
        </Toggable>
      </>
        : <Toggable buttonLabelOpen={"Login"} buttonLabelClose={"Close"}>
            <Login  message={message} user={user}/>
          </Toggable>}


      <h2 style={{margin: "0"}}>Blogs</h2>
      <BlogList user={user}/>
    </div>
  )
}
export default App