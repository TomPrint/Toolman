import { useEffect, useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { format } from 'date-fns'

//components
import LoadingSpinner from "../components/LoadingSpinner"
import Modal from "../components/Modal"

const SingleItem = () => {
  
  const navigate = useNavigate()
  const { itemId } = useParams()  
  const [item, setItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  
  const handleDelete = async() =>{
    
      const response = await fetch (`/api/tools/items/${itemId}`, {
      method: 'DELETE',
      body: JSON.stringify(item),
      headers: {
          'Content-Type':'application/json'
      }})
        if (response.ok) {
          navigate('/items')
       }
      //  add error prevent and modal before deleting
  }
  

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/tools/items/${itemId}`)
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setItem(json)
      }
    }
    // fire a function 
    fetchItem()
  }, [itemId])
    
  if (!item) {
    return (<div className="flex justify-center items-center "><LoadingSpinner/></div>)
  }
  return (
    <div>
    <h1 className="flex justify-center py-4 text-xl font-bold">Szczegóły narzędzia: </h1>
    <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-2 text-white py-10">
          <div className="w-4/4 md:w-5/6">
            <h2 className="text-xl py-4 text-[#00df9a] font-bold">{item.title}</h2>
             <p>Producent: {item.producer}</p>
             <p>Model: {item.model}</p>
             <p>S/N: {item.serialNumber}</p>
             <p>Rok produkcji: {item.yearOfProduction}</p>
             <p>Sprzedawca: {item.seller}</p>
             <p>Data zakupu: <span className="text-[#00df9a] text-sm">{item.purchaseDate && format(new Date(item.purchaseDate),'dd/MM/yyyy')}</span></p>
             <p>Data gwarancji: <span className="text-[#00df9a] text-sm">{item.warrantyDate && format(new Date(item.warrantyDate),'dd/MM/yyyy')}</span></p>
             <p>U pracownika: {item.atEmployee && item.atEmployee.name}</p>
             <div className="flex justify-center">
             <button onClick={()=> {setOpenModal(true)}} className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-8">Usuń narzędzie</button>
             {openModal && <Modal handleDelete={handleDelete} setOpenModal={setOpenModal}/>}
            </div>
          </div> 
    </div>
    </div>
  )
}

 
export default SingleItem;