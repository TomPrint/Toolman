import { Link } from 'react-router-dom'

const Admin = () => {
    return(
        <div>
      <h2>Admin Page</h2>
      <br></br>
    
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"><Link to='/signup'>Register New User</Link></button>
      </div>
    );
  
  }
  
  export default Admin