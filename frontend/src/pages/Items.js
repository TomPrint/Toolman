import { useEffect, useState } from "react"



// components
import ItemDetails from "../components/ItemDetails"
import LoadingSpinner from "../components/LoadingSpinner"
import {useAuthContext} from '../hooks/useAuthContext'


const Items = () => {
    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const {user} = useAuthContext()

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch('/api/tools/items',{
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setItems(json)
        setLoading(false);
      }
    }
    // fire a function 
    if (user) {
    fetchItems()
  }
  }, [user])

  return (
    <div>
      <h1 className="flex justify-center py-4 text-xl font-bold">Wszystkie narzędzia na stanie: </h1>
      { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
        <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {/* chcecking are there any item and if so map them */}
          {/* using ItemDetails from components to show template */}
          {items && items.map(item => (<ItemDetails key={item._id} item={item}/>))}
          
        </div>
        </div> 
      }
    </div>
  )
}
 
export default Items;