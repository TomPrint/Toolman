import { useEffect, useState } from "react"

// components
import ItemDetails from "../components/ItemDetails"

const Items = () => {
    const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/tools/items')
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setItems(json)
      }
    }
    // fire a function 
    fetchItems()
  }, [])

  return (
    <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any item and if so map them */}
        {/* using ItemDetails from components to show template */}
        {items && items.map(item => (
          <ItemDetails key={item._id} item={item}/>
        ))}
      </div>
    </div>
  )
}
 
export default Items;