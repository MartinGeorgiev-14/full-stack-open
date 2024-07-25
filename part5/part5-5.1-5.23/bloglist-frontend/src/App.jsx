import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogCreator from './components/BlogsCreator'
import LoggedUser from './components/LoggedUser'
import Message from './components/Message'
import Toggable from './components/Toggable'
import BlogList from './components/BlogList'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userData, setUserData] = useState({})
  const [message, setMessage] = useState({text: null, type: "hidden"})

  const handleUserData = (data) => {
    setUserData(data)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedPerson")

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUserData(user)
      blogService.setToken(user.token)
    }
  }, [])

  

  return (
    <div>
      <Message message={message} setMessage={setMessage}/>
      {Object.keys(userData).length !== 0 ? <>
        <LoggedUser userData={userData} setUserData={setUserData}/>
        <Toggable buttonLabelOpen={"Create blog"} buttonLabelClose={"Cancel"}>
          <BlogCreator blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
        </Toggable>
      </>
        : <Toggable buttonLabelOpen={"Login"} buttonLabelClose={"Close"}>
            <Login onLogin={setUserData} message={message} setMessage={setMessage} setUserData={setUserData}/>
          </Toggable>}


      <h2 style={{margin: "0"}}>Blogs</h2>
      <BlogList blogs={blogs} setBlogs={setBlogs} userData={userData}/>
    </div>
  )
}

export default App