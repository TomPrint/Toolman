import { Link } from 'react-router-dom'

const Admin = () => {
    return(
        <div>
     <h2 className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">Admin Page</h2>
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"><Link to='/signup'>Register New Users</Link></button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"><Link to='#'>Manage All Users</Link></button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"><Link to='#'>Users' Log</Link></button>
      
      
<br></br>
<div className="invisible md:visible mt-11" id="container">
  <div class="steam" id="steam1"> </div>
  <div class="steam" id="steam2"> </div>
  <div class="steam" id="steam3"> </div>
  <div class="steam" id="steam4"> </div>

  <div id="cup">
    <div id="cup-body">
      <div id="cup-shade"></div>
    </div>
    <div id="cup-handle"></div>
  </div>

  <div id="saucer"></div>

  <div id="shadow"></div>
</div>



      </div>
      </div>


      </div>
    );
  
  }
  
  export default Admin