const ItemDetails = ({item}) => {
    return ( 

        <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img className="w-full rounded" src="Tool_no_image.png" alt="Mountain"></img>
        <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p>Model : <span className="text-[#00df9a]">{item.model}</span></p>
        <p>S/N : <span className="text-[#00df9a]">{item.serialNumber}</span></p>
        <p>Rok produkcji : <span className="text-[#00df9a]">{item.yearOfProduction}</span></p>
        {/* Use in backend .populate('atEmployee') to show item.atEmployee.name - realation between worker and employee */}
        <p>Pracownik : <span className="text-[#00df9a]">{item.atEmployee.name}</span></p>
        </div>
        </div>
     );
}
 
export default ItemDetails;