import { useState } from "react"


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setisAdmin] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()


    console.log (name, email, password, isAdmin)
  }

  const handleChange = (e) => {
    setisAdmin(e.target.value)
  }

  return (
    <div class="flex justify-center">
    <form className="signup bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h3 className="block text-[#00df9a] text-sm font-bold mb-2 text-center">Create a New User</h3>
      <div class="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
       </div>
       <div class="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email address:</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      </div>
      <div class="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
      <input
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      </div>
      <div class="mb-5">
      <label className="block text-gray-700 text-sm font-bold mb-2">Admin:</label>
      <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      value={isAdmin} onChange={handleChange}>
        <option value ={true}>Tak</option>
        <option value ={false}>Nie</option>
        </select>
        </div>
        <div class="container min-w-full flex flex-col items-center">
      <button className=" bg-gray-500 hover:bg-[#00df9a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign up</button>
      </div>
    </form>
    </div>
  )
}

export default Signup