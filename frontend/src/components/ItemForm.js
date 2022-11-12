import { useState } from "react";

const ItemForm = () => {
    const [title, setTitle] = useState('')
    const [model, setModel] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [yearOfProduction, setYearOfProduction] = useState('')
    const [error, setError] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = {title, model, serialNumber, yearOfProduction}

        const response = await fetch ('/api/tools/items/add', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type':'application/json'
            }
        })
        // we get back response as json and storing it it json
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setModel('')
            setTitle('')
            setSerialNumber('')
            setYearOfProduction('')
            setError(null)
            console.log('new item added', json)
        }
    }


    return ( 
        <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h3 className="py-4">Add a new Item</h3>
            
            <label className="block text-gray-500 text-sm font-bold mb-2">Item title: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
             />

            <label className="block text-gray-500 text-sm font-bold mb-2">Model: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
             />

            <label className="block text-gray-500 text-sm font-bold mb-2">Serial number: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setSerialNumber(e.target.value)}
            value={serialNumber}
             />

            <label className="block text-gray-500 text-sm font-bold mb-2">Year of production: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setYearOfProduction(e.target.value)}
            value={yearOfProduction}
             />

             <button className="block bg-[#00df9a]  text-white font-bold py-2 px-4 rounded my-5"> Add Item</button>

        </form>
        </div>
     );
}
 
export default ItemForm;