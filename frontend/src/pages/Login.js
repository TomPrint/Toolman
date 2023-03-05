import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'


const Login = () => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()


    await login (email, password)
  }


  return (
    <div className="flex justify-center">
    <form className="login bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h3 className="block text-[#00df9a] text-sm font-bold mb-2 text-center">Zaloguj do Toolman</h3>

       <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Adres Email:</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      </div>
      <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">Hasło:</label>
      <input
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      </div>

        <div className="container min-w-full flex flex-col items-center">
      <button disabled= {isLoading} className=" bg-gray-500 hover:bg-[#00df9a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-2">
        {error}</div>}
      </div>
      <Link to='/resetpassword'><div className="block text-[#00df9a] text-xs font-bold mt-5 text-center">Nie pamiętasz hasła?</div></Link>
    </form>
    
    </div>
 
  )
}

export default Login