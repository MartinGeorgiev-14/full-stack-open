import { useReducer } from "react";

const useUser = () => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_USER': 
                return action.payload
            case 'REMOVE_USER':
                return {}
        }
    }, {})

    const setUser = (user) => dispatch({ type: 'SET_USER', payload: user })
    
    const removeUser = () => dispatch({ type: 'REMOVE_USER' })

    return { state, setUser, removeUser }
}

export default useUser