import {format} from 'date-fns'
import { Link } from 'react-router-dom'
import { useIsAdmin } from '../hooks/useAdmin'
import { useAuthContext } from '../hooks/useAuthContext'

const ItemDetails = ({item}) => {
    const isAdmin = useIsAdmin()
    const { user } = useAuthContext()
    return ( 

        <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img className="w-full rounded" src="Tool_no_image.png" alt="Mountain"></img>
        <div className="px-3 py-2">
        <div className="text-[#00df9a] text-2xl font-bold">{item.title}</div>
        <p className="text-sm">Producent : <span className="text-[#00df9a] text-lg ">{item.producer}</span></p>
        <p className="text-sm">S/N : <span className="text-[#00df9a] text-lg">{item.serialNumber}</span></p>
        <p className="text-sm">Rok produkcji : <span className="text-[#00df9a] text-lg">{item.yearOfProduction}</span></p>
        {/* Use in backend .populate('atEmployee') to show item.atEmployee.name - realation between worker and employee */}
        {/* use logic to check if worker was added to an item */}
        {item.atEmployee && <p className="text-sm">Pracownik : <span className="text-[#00df9a] text-lg">{item.atEmployee.name}</span></p>}
        {!item.atEmployee && <p className="text-sm">Pracownik : <span className="text-[#AB1F1C] text-lg">BRAK</span></p>}
        <p className="text-xs mb-2">Utworzono: <span className="text-[#00df9a] text-sm">{format(new Date(item.createdAt),'dd/MM/yyyy')}</span></p>
        { isAdmin && user ?<Link to ={`/items/${item._id}`}><p>Pokaż szczegóły</p></Link> : <div></div> }
        </div>
        </div>
     );
}
 
export default ItemDetails;