import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  

  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state

  }
}

export const AuthContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (user) {
        const {expiresIn} = user
        const now = Date.now().valueOf() / 1000
        if (expiresIn < now) {
            logout()
        } else {
            dispatch({ type: 'LOGIN', payload: user }) 
            setTimeout(() => {
                logout()
            }, (2 * 24 * 60 * 60) * 1000)
            // (2 * 24 * 60 * 60) * 1000 for 2 days instead of (expiresIn - now) * 1000  for 1m
            // time needs to match backend token expiration time
        }
    }
 }, [])

  const logout = async () => {
    
    try {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })

    
    } catch (error) {
      console.log(error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
    }
  }
  

  return (
    <AuthContext.Provider value={{ ...state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  )
}