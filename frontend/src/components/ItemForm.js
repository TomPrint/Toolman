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
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Item</h3>
            
            <label>Item title: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
             />

            <label>Model: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={model}
             />

            <label>Serial number: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setSerialNumber(e.target.value)}
            value={serialNumber}
             />

            <label>Year of production: </label>
            <input className="text-black"
            type="text"
            onChange={(e) => setYearOfProduction(e.target.value)}
            value={yearOfProduction}
             />

             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add Item</button>

        </form>
     );
}
 
export default ItemForm;