
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './components/User'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import Message from './components/Message'
import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import './styles/styles.css'

const App = () => {
 
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedPerson")

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Router className='App'>
      <Navigation />
      <Message />

      <div className='routes'>
        <Routes >
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<UserList />}/>
          <Route path="/user/:id" element={<User />}/>
          <Route path='/blogs' element={<BlogList/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App