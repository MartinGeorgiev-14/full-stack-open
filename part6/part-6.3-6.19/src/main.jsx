import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdote from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'
import notification from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdote,
    filter,
    notification,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)