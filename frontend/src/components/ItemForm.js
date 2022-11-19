import { useState } from "react";

const ItemForm = () => {
    const [title, setTitle] = useState('')
    const [model, setModel] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [yearOfProduction, setYearOfProduction] = useState('')
    const [error, setError] = useState(null)
    
    const handleChange = () => {

    }


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
        <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <form className="w-3/4 md:w-1/2 shadow-md rounded px-2 pt-6 pb-3 mb-4" onSubmit={handleSubmit}>
            <h3 className="py-4">Add a new Item</h3>
            
            <label className="block text-gray-500 text-sm py-2">Item title: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
             />

            <label className="block text-gray-500 text-sm py-2">Model: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
             />

            <label className="block text-gray-500 text-sm py-2">Serial number: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setSerialNumber(e.target.value)}
            value={serialNumber}
             />

            <label className="block text-gray-500 text-sm py-2">Year of production: </label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setYearOfProduction(e.target.value)}
            value={yearOfProduction}
             />

            <label className="block text-gray-500 text-sm py-2">At Employee: </label>
                <select className="text-black w-[100%]"
                value=''
                onChange={handleChange}
                > 
                    <option value=''>-- Choose --</option>
                    <option value=''>Worker 1</option>  
                    <option value=''>Worker 2</option>
             </select>

            <div class="flex justify-center">
             <button className="  bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-8"> Add Item</button>
            </div>
        </form>
        </div>
     );
}
 
export default ItemForm;