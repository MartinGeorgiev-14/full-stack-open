import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(data => data.user)
  
    const handleUserData = (data) => {
      setUserData(data)
    }
  
    return (
        <div>
            <h1>Home</h1>
      </div>
    )
}

export default Home