const ItemDetails = ({item}) => {
    return ( 

        <div class="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img class="w-full rounded" src="wkretarka.JPG" alt="Mountain"></img>
        <div class="px-3 py-2">
        <div class="font-bold text-xl mb-2">{item.title}</div>
        <p>Model : <span className="text-[#00df9a]">{item.model}</span></p>
        <p>Numer seryjny : <span className="text-[#00df9a]">{item.serialNumber}</span></p>
        <p>Rok produkcji : <span className="text-[#00df9a]">{item.yearOfProduction}</span></p>
        <p>Pracownik : <span className="text-[#00df9a]">{item.atEmployee}</span></p>
        </div>
        </div>
     );
}
 
export default ItemDetails;