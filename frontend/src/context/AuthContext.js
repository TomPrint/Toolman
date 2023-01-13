import { createContext, useReducer, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })
  const inactivityTimeoutIdRef = useRef(null);

  const logout = async () => {
    try {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const decoded = jwtDecode(user.token);
      if (!decoded || decoded.exp < Date.now() / 1000) {
        logout();
      } else {
        dispatch({ type: 'LOGIN', payload: user }) 
        inactivityTimeoutIdRef.current = setTimeout(logout, 2 * 60 * 1000)  
      }
    }
    // clear the timeout on user activity
    window.addEventListener("click", () => {
      clearTimeout(inactivityTimeoutIdRef.current);
      inactivityTimeoutIdRef.current = setTimeout(logout, 2 * 60 * 1000)
    });
    window.addEventListener("keydown", () => {
    clearTimeout(inactivityTimeoutIdRef.current);
    inactivityTimeoutIdRef.current = setTimeout(logout, 2 * 60 * 1000)
    });
    window.addEventListener("mousemove", () => {
    clearTimeout(inactivityTimeoutIdRef.current);
    inactivityTimeoutIdRef.current = setTimeout(logout, 2 * 60 * 1000)
    });
    return () => {
    clearTimeout(inactivityTimeoutIdRef.current);
    };
    }, [])
    
    return (
    <AuthContext.Provider value={{ ...state, dispatch, logout }}>
    {children}
    </AuthContext.Provider>
    )
    }
