import { useState, useEffect } from "react";

function ItemForm() {

    const [title, setTitle] = useState('')
    const [producer, setProducer] = useState('')
    const [seller, setSeller] = useState('')
    const [purchaseDate, setPurchaseDate] = useState('')
    const [warrantyDate, setWarrantyDate] = useState('')
    const [model, setModel] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [yearOfProduction, setYearOfProduction] = useState('')
    const [workersList, setWorkersList] = useState([])
    const [atEmployee, setAtEmployee] = useState(null)
    const [error, setError] = useState(null)
    const [submit, setSubmit] = useState(null)
    
    //Use effect to get worker data. We use workersList and setWorkersList to grab them
    useEffect(()=>{
        const fetchWorkers = async () =>{
            const response = await fetch('/api/employee/workers')
            const newData = response.json()
            //need add await otherwise we have pending and promise no array [] that we need to map
            setWorkersList(await newData)
    };
    fetchWorkers();
    },[])
    
    // on select change we match value from event target to setAtEployee
    const handleChange = (event) => {
        setAtEmployee(event.target.value);
    }

    //POST after submit button
    const handleSubmit = async (e) => {
        e.preventDefault()
        const item = {
            title,
            model,
            producer,
            serialNumber,
            yearOfProduction,
            atEmployee,
            seller,
            warrantyDate,
            purchaseDate,
        }
        const response = await fetch ('/api/tools/items/add', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type':'application/json'
            }
        })
        // we get back response as json and storing it in json
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setSubmit(null)
        }
        if (response.ok) {
            setProducer('')
            setSeller('')
            setWarrantyDate('')
            setPurchaseDate('')
            setModel('')
            setTitle('')
            setSerialNumber('')
            setYearOfProduction('')
            setError(null)
            setAtEmployee(null)
            console.log('new item added', json)
            setSubmit(`Pomyślnie dodano narzędzie ${item.title}`)
        }
    }


    return ( 
        <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <form className="w-3/4 md:w-1/2 shadow-md rounded px-2 pt-6 pb-3 mb-4" onSubmit={handleSubmit}>
            <h3 className="py-4 text-xl">Dodaj nowe narzędzie:</h3>
            
            <label className="block text-gray-500 text-sm py-2">Nazwa narzędzia:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
             />

            <label className="block text-gray-500 text-sm py-2">Producent: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setProducer(e.target.value)}
            value={producer}
             />

            <label className="block text-gray-500 text-sm py-2">Model: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
             />

            <label className="block text-gray-500 text-sm py-2">S/N:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setSerialNumber(e.target.value)}
            value={serialNumber}
             />

            <label className="block text-gray-500 text-sm py-2">Data zakupu:</label>
            <input className="text-black w-[100%]"
            type="date"
            onChange={(e) => setPurchaseDate(e.target.value)}
            value={purchaseDate}
             />

            <label className="block text-gray-500 text-sm py-2">Gwarancja do:</label>
            <input className="text-black w-[100%]"
            type="date"
            onChange={(e) => setWarrantyDate(e.target.value)}
            value={warrantyDate}
             />

            <label className="block text-gray-500 text-sm py-2">Sprzedawca:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setSeller(e.target.value)}
            value={seller}
             />

            <label className="block text-gray-500 text-sm py-2">Rok produkcji:</label>
            <input className="text-black w-[100%]"
            type="number"
            onChange={(e) => setYearOfProduction(e.target.value)}
            value={yearOfProduction}
             />

            <label className="block text-gray-500 text-sm py-2">Przypisz do pracownika: </label>
            <select className="text-black w-[100%]" onChange={handleChange}> 
            <option> - Wybierz pracownika - </option>
            {/* we map on workersList to show the names and grab id as a value */}
            {workersList.map(worker => (
                 <option key={worker._id} value={worker._id}>{worker.name}</option>
            ))
             }  
            </select>

            <div className="flex justify-center">
             <button className="  bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-8">Dodaj narzędzie</button>
            </div>
            {error && <div className="error bg-[#960019] text-center">{error}</div>}
            {submit && <div className="bg-[#10742b] text-center">{submit}</div>}
        </form>
        </div>
     );
}
 
export default ItemForm;