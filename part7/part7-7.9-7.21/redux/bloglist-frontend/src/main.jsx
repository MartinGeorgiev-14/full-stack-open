import ReactDOM from 'react-dom/client'
import App from './App'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notification from './reducers/notificationReducer'
import blogs from './reducers/blogsReducer'
import user from './reducers/userReducer'
import userList from './reducers/userListReducer'
import Navigation from './components/Navigation'

const store = configureStore({
    reducer: {  
        notification,
        blogs,
        user,
        userList
    }
})


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <App />
</Provider>)