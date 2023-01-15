import { useState, useEffect } from "react";
import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

function ItemForm() {

    const [title, setTitle] = useState('')
    const [producer, setProducer] = useState('')
    const [seller, setSeller] = useState('')
    const [purchaseDate, setPurchaseDate] = useState('')
    const [warrantyDate, setWarrantyDate] = useState('')
    const [transmissionDate, setTransmissionDate] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')
    const [comments, setComments] = useState('')
    const [invoice, setInvoice]= useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [yearOfProduction, setYearOfProduction] = useState('')
    const [workersList, setWorkersList] = useState([])
    const [atEmployee, setAtEmployee] = useState(null)
    const [image, setImage] = useState(null);
   
    const [error, setError] = useState(null)
    const [submit, setSubmit] = useState(null)
    const {user} = useAuthContext()
    
    
    //Use effect to get worker data. We use workersList and setWorkersList to grab them
    useEffect(()=>{
        const fetchWorkers = async () =>{
            const response = await fetch('/api/employee/workers',{
                headers: {'Authorization': `Bearer ${user.token}`}
              })
            const newData = response.json()
            //need add await otherwise we have pending and promise no array [] that we need to map
            setWorkersList(await newData)
    };

    if(user){
    fetchWorkers();
    }
    },[user])
    
    // on select change we match value from event target to setAtEployee
    const handleChange = (event) => {
      if (event.target.value !== 'Bez przypisania') {  
        setAtEmployee(event.target.value);
      } else {
        setAtEmployee(null)
      }
    }

    const handleUpload = (event) => {
      const file = event.target.files[0];
      if (file.size > 1048000) { // 1 megabyte
        setError("Plik jest za duży, użyj pliku o rozmiarze do 1MB");
      } else if (file.type !== "image/jpg" && file.type !== "image/png" && file.type !== "image/jpeg") {
        setError("Zły format pliku, użyj .jpeg, .jpg, .png");
      } else {
        setError(null);
      }
      setImage(file);
    };

    //POST after submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("invoice", invoice)
        data.append("price", price)
        data.append("transmissionDate", transmissionDate)
        data.append("comments", comments)
        data.append("image", image);
        data.append("title", title);
        data.append("model", model);
        data.append("producer", producer);
        data.append("serialNumber", serialNumber);
        data.append("yearOfProduction", yearOfProduction);
        if (atEmployee !== null) {
            data.append("atEmployee", atEmployee);
          }
        data.append("seller", seller);
        data.append("warrantyDate", warrantyDate);
        data.append("purchaseDate", purchaseDate);
        const response = await fetch("/api/tools/items/add", {
          method: "POST",
          body: data,
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error)
          setSubmit(null);
        }
        if (response.ok) {
          setTitle("");
          setModel("");
          setProducer("");
          setSerialNumber("");
          setYearOfProduction("");
          setAtEmployee(null);
          setSeller("");
          setWarrantyDate("");
          setPurchaseDate("");
          setTransmissionDate("");
          setInvoice("");
          setPrice("");
          setComments("");
          setError(null);
          console.log("new item added", json);
          setSubmit(`Dodano narzędzie: ${title}`);
        }
      };


    return ( 
        <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <form className="w-3/4 md:w-1/2 px-2 pt-6 pb-3 mb-4" onSubmit={handleSubmit}>
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

            <label className="block text-gray-500 text-sm py-2">Cena zakupu:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />

            <label className="block text-gray-500 text-sm py-2">Sprzedawca:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setSeller(e.target.value)}
            value={seller}
             />

            <label className="block text-gray-500 text-sm py-2">Numer faktury:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setInvoice(e.target.value)}
            value={invoice}
            />

            <label className="block text-gray-500 text-sm py-2">Rok produkcji:</label>
            <input className="text-black w-[100%]"
            type="number"
            onChange={(e) => setYearOfProduction(e.target.value)}
            value={yearOfProduction}
             />

            <label className="block text-gray-500 text-sm py-2">Przypisz do pracownika: </label>
            <select className="text-black w-[100%]" onChange={handleChange}> 
            <option>Bez przypisania</option>
            {/* we map on workersList to show the names and grab id as a value */}
            {workersList.map(worker => (
                 <option key={worker._id} value={worker._id}>{worker.name}</option>
            ))
             }  
            </select>
             
            <label className="block text-gray-500 text-sm py-2">Przekazne pracownikowi:</label>
            <input className="text-black w-[100%]"
            type="date"
            onChange={(e) => setTransmissionDate(e.target.value)}
            value={transmissionDate}
            />

            <label className="block text-gray-500 text-sm py-2">Uwagi:</label>
            <input className="text-black w-[100%]"
            type="text"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
            />

            <label className="block text-gray-500 text-sm py-2" htmlFor="image">
          Zdjęcie:
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept=".jpg,.jpeg,.png"
          onChange={handleUpload}
          className="mb-1 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
        />

            <div className="flex justify-center items-center">
             <button className="  bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-2 my-8">Dodaj narzędzie</button>
             <Link to='/items'><button className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-3 ">Wróć</button></Link> 
            </div>
            {error && <div className="error bg-[#960019] text-center">{error}</div>}
            {submit && <div className="bg-[#10742b] text-center">{submit}</div>}
        </form>
        </div>
     );
}
 
export default ItemForm;