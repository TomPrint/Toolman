import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'


const WorkerDetails = ({worker}) => {
    return ( 

        <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img className="w-full rounded" src="Worker_no_image.webp" alt="Mountain"></img>
        <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2"><span className="text-[#00df9a]">{worker.name}</span></div>
        <p className="text-xs mb-2">Stanowisko:<span className="text-[#00df9a] text-sm"> {worker.position}</span></p>
        <p className="text-xs mb-2">Utworzono: <span className="text-[#00df9a] text-sm">{format(new Date(worker.createdAt),'dd/MM/yyyy')}</span></p>
        
        {/* Link that show all items asign to a worker */}
        
        <Link to={`/workers/${worker._id}/items`}><p className='text-sm hover:text-[#00df9a] transition-all'>Zobacz Narzędzia</p></Link>

        </div>
        </div>
     );
}
 
export default WorkerDetails;