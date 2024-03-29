import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

//components
import LoadingSpinner from "../components/LoadingSpinner"
import Modal from "../components/Modal"
import {useAuthContext} from '../hooks/useAuthContext'

const SingleItem = () => {
  
  const navigate = useNavigate()
  const { itemId } = useParams()  
  const [item, setItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const {user} = useAuthContext()
  const [showBigSize, setShowBigSize] = useState(false)

  
  const handleDelete = async() =>{
    
      const response = await fetch (`/api/tools/items/${itemId}`, {
      method: 'DELETE',
      body: JSON.stringify(item),
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.token}`
      }})
        if (response.ok) {
          navigate('/items')
       }
      //  add error prevent and modal before deleting
  }
  
  
  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/tools/items/${itemId}`,{
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setItem(json)
      }
    }
    // fire a function 
    if (user) {
    fetchItem()
    }
  }, [itemId, user])
    
  if (!item) {
    return (<div className="flex justify-center items-center "><LoadingSpinner/></div>)
  }


  return (
    <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div className="w-3/4 md:w-1/2 px-2 pt-6 pb-3 mb-4">
       <h1 className="flex justify-center py-4 text-xl font-bold">Szczegóły narzędzia: </h1>
            <h2 className="text-xl py-4 text-[#00df9a] font-bold">{item.title}</h2>
             <p>Producent: <span className="text-[#00df9a] text-sm">{item.producer}</span></p>
             <p>Model: <span className="text-[#00df9a] text-sm">{item.model}</span></p>
             <p>S/N: <span className="text-[#00df9a] text-sm">{item.serialNumber}</span></p>
             <p>Rok produkcji: <span className="text-[#00df9a] text-sm">{item.yearOfProduction}</span></p>
             <p>Sprzedawca: <span className="text-[#00df9a] text-sm">{item.seller}</span> </p>
             <p>Faktura zakupu: <span className="text-[#00df9a] text-sm">{item.invoice}</span> </p>
             <p>Cena: <span className="text-[#00df9a] text-sm">{item.price}</span> </p>
             <p>Data zakupu: <span className="text-[#00df9a] text-sm">
                {item.purchaseDate && format(new Date(item.purchaseDate),'dd/MM/yyyy')}
                </span></p>
             <p>Data gwarancji: <span className="text-[#00df9a] text-sm">
                {item.warrantyDate && format(new Date(item.warrantyDate),'dd/MM/yyyy')}
                </span></p>
             <p>U pracownika: <span className="text-[#00df9a] text-sm">{item.atEmployee && item.atEmployee.name}</span></p>
             <p>Przekazane: <span className="text-[#00df9a] text-sm">
                {item.transmissionDate && format(new Date(item.transmissionDate),'dd/MM/yyyy')}
                </span></p>
             <p>Uwagi: <span className="text-[#00df9a] text-sm">{item.comments}</span></p>


            {/* If no picture, don't show picture tag */}
             {item.image ?<p>Zdjęcie:<img src={item.image} alt="zdjęcie" 
           className="hover:opacity-75 cursor-pointer rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2 my-3"
           style={{ maxWidth: showBigSize ? '70%' : '20%', maxHeight: showBigSize ? '70%' : '20%' }}
           onClick={() => setShowBigSize(!showBigSize)}/></p>: null}
             <div className="flex justify-center items-center">
              <button onClick={()=> {setOpenModal(true)}} 
                className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-5 m-1 my-8 ">
                  Usuń
              </button>
              <Link to={`/items/update/${itemId}`}><button className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-1 ">Aktualizuj</button></Link> 
              <Link to='/items'><button className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-1 ">Wróć</button></Link> 

              {openModal && <Modal handleDelete={handleDelete} setOpenModal={setOpenModal} description="narzędzie"/>}
            </div> 
      </div>
    </div>
  )
}

 
export default SingleItem;