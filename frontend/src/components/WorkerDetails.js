import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'
import { useIsAdmin } from '../hooks/useAdmin'
import { useAuthContext } from '../hooks/useAuthContext'


import Modal from "../components/Modal"


const WorkerDetails = ({worker, workersState}) => {
    const [openModal, setOpenModal] = useState(false)
    const { user } = useAuthContext();
    const isAdmin = useIsAdmin()
    
    const handleDelete = async() =>{
    
       let response = await fetch (`/api/employee/workers/${worker._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })
            response = await response.json();
            console.warn(response);
            getData();
        }
      
        async function getData() {
          // setLoading(true);
          let result = await fetch('/api/employee/workers',{
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          result = await result.json();
          workersState(result);
        }


    return ( 

        <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img className="w-full rounded" src="Worker_no_image.webp" alt="Mountain"></img>
        <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2"><span className="text-[#00df9a]">{worker.name}</span></div>
        <p className="text-xs mb-2">Stanowisko:<span className="text-[#00df9a] text-sm"> {worker.position}</span></p>
        <p className="text-xs mb-2">Utworzono: <span className="text-[#00df9a] text-sm">{format(new Date(worker.createdAt),'dd/MM/yyyy')}</span></p>
        
        {/* Link that show all items asign to a worker */}
        
        <Link to={`/workers/${worker._id}/items`}><p className='text-sm hover:text-[#00df9a] transition-all'>Zobacz Narzędzia</p></Link>
        
        <div className="flex justify-center">
        { isAdmin && user ? <button onClick={()=> {setOpenModal(true)}} 
                className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-3 ">
                  Usuń 
              </button> : <div></div>}
              {openModal && <Modal handleDelete={handleDelete} setOpenModal={setOpenModal} description="pracownika"/>}
            </div> 
        </div>
        </div>
     );
}
 
export default WorkerDetails;