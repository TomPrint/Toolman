import { useState, useEffect } from "react";
import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from "react-router-dom"
import { format } from 'date-fns'

function ItemForm() {
    //useNavigate const
    const navigate = useNavigate()
    //useAuthContext const 
    const {user} = useAuthContext()
    //useParams const
    const { itemId } = useParams()
     //useState const
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
    const [employeeName, setEmployeeName] = useState(null)
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null)
    const [submit, setSubmit] = useState(null)
   
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

    //Use Effect to get a single Item by Id. The use data to fill in the form inputs.
    useEffect(() => {
        const fetchItem = async () => {
          const response = await fetch(`/api/tools/items/${itemId}`,{
            headers: {'Authorization': `Bearer ${user.token}`}
          })
          const json = await response.json()
          // to get an array of objet
          if (response.ok) {

            //Filing in the form with previous state GET from object ID
            setTitle(json.title)
            setProducer(json.producer)
            setModel(json.model)
            setSerialNumber(json.serialNumber)
            setPurchaseDate(json.purchaseDate === null ? "" : format(new Date(json.purchaseDate),'yyyy-MM-dd') )
            setWarrantyDate(json.warrantyDate === null ? "" : format(new Date(json.warrantyDate),'yyyy-MM-dd') )
            setYearOfProduction(json.yearOfProduction)
            setSeller(json.seller)
            if (json.atEmployee !== null) {
              setAtEmployee(json.atEmployee.id)
              setEmployeeName(json.atEmployee.name)
            }
          }
        }
        // fire a function 
        if (user) {
        fetchItem()
        }
      }, [itemId, user])
    
    // on select change we match value from event target to setAtEployee
    const handleChange = (event) => {
      if (event.target.value !== 'Bez przypisania') {  
        setAtEmployee(event.target.value);
      } else {
        setAtEmployee(null)
      }
    }

    //POST after submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        // data.append("image", image);
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
        
        const response = await fetch(`/api/tools/items/update/${itemId}`, {
          method: "PUT",
          body: JSON.stringify({title,model,producer,atEmployee,data, purchaseDate,warrantyDate,seller,yearOfProduction,serialNumber}),
          headers: {
            "Authorization": `Bearer ${user.token}`,
            'Content-Type':'application/json',
          },
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
          setSubmit(null);
        }
        if (response.ok) {
            navigate(`/items/${itemId}`)    
        //   console.log("Item updated", json);
        //   console.log(title)
        //   setSubmit(`Dodano narzędzie: ${title}`);
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
              <option>Bez przypisania</option>
              {/* we map on workersList to show the names and grab id as a value */}
              {workersList.map(worker => {
                return employeeName === worker.name ?
                  (<option selected key={worker._id} value={worker._id}>{worker.name}</option>)
                   : 
                   (<option key={worker._id} value={worker._id}>{worker.name}</option>)
              })}
            </select>

            <div className="flex justify-center items-center">
             <button className="  bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-2 my-8">Aktualizuj</button>
             <Link to='/items'><button className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-3 ">Wróć</button></Link> 
            </div>
            {error && <div className="error bg-[#960019] text-center">{error}</div>}
            {submit && <div className="bg-[#10742b] text-center">{submit}</div>}
        </form>
        </div>
     );
}
 
export default ItemForm;