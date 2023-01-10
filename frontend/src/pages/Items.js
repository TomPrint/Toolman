
import { useState } from "react"
import {AiOutlineClose} from "react-icons/ai"

// components
import ItemDetails from "../components/ItemDetails"
import LoadingSpinner from "../components/LoadingSpinner"

//import useFetch hook to GET all items
import useFetch from "../hooks/useFetch";

const Items = () => {

  //use useFetch hook to GET all items
  const url = '/api/tools/items'
  const { loading, data } = useFetch(url);
  
  // useStete for setSearch and search
  const [search, setSearch] = useState("")
 
  // search updates with current value of input element
  const handleSearch = (event) => {
    setSearch(event.target.value) 
  }

  // clears searchbar input
  const clearSearch = () => {
    setSearch("") 
  }
  
  // returns filtered items
  const filteredItems = (data, search) => {
    search = search.toLowerCase()
    return data.filter((item) => item.title.toLowerCase().includes(search))
  }

  return (
    <div>

      <h1 className="flex justify-center py-4 text-xl font-bold">
        Wszystkie narzędzia na stanie:{" "}
      </h1>
      <div className="flex justify-center items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <input
        className='text-black'
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Wyszukaj narzędzie..."
        />
          {search !== "" && (<div className="ml-2 cursor-pointer" onClick={clearSearch}>
            <AiOutlineClose /> </div>)}
      </div>
      {loading ? (<div className="flex justify-center items-center "><LoadingSpinner /></div>) :
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  
            {/* use filteredItems function to display items that match search criteria */}
            {data ? (filteredItems(data, search).map((item) => (<ItemDetails key={item._id} item={item} />))) : <div></div>}
   
          </div>
        </div>
      }
    </div>
  )
}

export default Items