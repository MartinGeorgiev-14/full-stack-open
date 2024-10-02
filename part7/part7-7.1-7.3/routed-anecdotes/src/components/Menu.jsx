import { Link, useMatch } from 'react-router-dom'

const Menu = (props) => {
    const padding = {
      paddingRight: 5
    }
    const match = useMatch('/anecdotes/:id')
    const found = match ? props.anecdotes.find(a => a.id === Number(match.params.id)) : null
    return (
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/createNew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
    )
  }
export default Menu;