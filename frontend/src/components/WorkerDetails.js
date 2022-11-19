import { Link } from 'react-router-dom'
import {format} from 'date-fns'


const WorkerDetails = ({worker}) => {
    return ( 

        <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img className="w-full rounded" src="Worker_no_image.webp" alt="Mountain"></img>
        <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{worker.name}</div>
        <p className="font-bold text-xs mb-2">Stanowisko: {worker.position}</p>
        <p className="font-bold text-xs mb-2">Utworzono: {format(new Date(worker.createdAt),'dd/MM/yyyy')}</p>
        
        {/* Link that show all items asign to a worker */}
        
        <Link to={`/workers/${worker._id}/items`}><p className='text-sm'>Narzędzia</p></Link>

        </div>
        </div>
     );
}
 
export default WorkerDetails;